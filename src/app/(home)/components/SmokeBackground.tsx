"use client";

import React, { useEffect, useRef } from "react";

export const SmokeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions relative to offset size
    const resizeCanvas = () => {
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        initFramebuffers();
      }
    };

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const config = {
      TEXTURE_DOWNSAMPLE: 1,
      DENSITY_DISSIPATION: 0.98,
      VELOCITY_DISSIPATION: 0.98,
      PRESSURE_DISSIPATION: 0.8,
      PRESSURE_ITERATIONS: 20,
      CURL: 30,
      SPLAT_RADIUS: 0.0015,
    };

    const pointers: any[] = [];
    const splatStack: number[] = [];

    // Pointer class
    function PointerPrototype(this: any) {
      this.id = -1;
      this.x = 0;
      this.y = 0;
      this.dx = 0;
      this.dy = 0;
      this.down = false;
      this.moved = false;
      this.color = [0, 1, 0.5];
    }

    pointers.push(new (PointerPrototype as any)());

    // Get WebGL Context
    const params = {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
    };

    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = canvas.getContext("webgl2", params) as any;
    const isWebGL2 = !!gl;

    if (!gl) {
      gl = (canvas.getContext("webgl", params) || canvas.getContext("experimental-webgl", params)) as any;
    }

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const halfFloat = gl.getExtension("OES_texture_half_float");
    let support_linear_float = gl.getExtension("OES_texture_half_float_linear");

    if (isWebGL2) {
      gl.getExtension("EXT_color_buffer_float");
      support_linear_float = gl.getExtension("OES_texture_float_linear");
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    const internalFormat = isWebGL2 ? (gl as any).RGBA16F : gl.RGBA;
    const internalFormatRG = isWebGL2 ? (gl as any).RG16F : gl.RGBA;
    const formatRG = isWebGL2 ? (gl as any).RG : gl.RGBA;
    const texType = isWebGL2 ? (gl as any).HALF_FLOAT : ((halfFloat as any)?.HALF_FLOAT_OES || 0x8D61);

    const ext = {
      internalFormat,
      internalFormatRG,
      formatRG,
      texType,
    };

    // Helper functions for shaders & program compiles
    function compileShader(type: number, source: string) {
      const shader = gl!.createShader(type);
      if (!shader) throw new Error("Failed to create shader");

      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);

      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        throw new Error(gl!.getShaderInfoLog(shader) || "Shader compile error");
      }

      return shader;
    }

    class GLProgram {
      program: WebGLProgram;
      uniforms: Record<string, WebGLUniformLocation | null> = {};

      constructor(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        const program = gl!.createProgram();
        if (!program) throw new Error("Failed to create program");
        this.program = program;

        gl!.attachShader(this.program, vertexShader);
        gl!.attachShader(this.program, fragmentShader);
        gl!.linkProgram(this.program);

        if (!gl!.getProgramParameter(this.program, gl!.LINK_STATUS)) {
          throw new Error(gl!.getProgramInfoLog(this.program) || "Link error");
        }

        const uniformCount = gl!.getProgramParameter(this.program, gl!.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
          const info = gl!.getActiveUniform(this.program, i);
          if (info) {
            this.uniforms[info.name] = gl!.getUniformLocation(this.program, info.name);
          }
        }
      }

      bind() {
        gl!.useProgram(this.program);
      }
    }

    // Compile GL Shaders
    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `precision highp float;
       attribute vec2 aPosition;
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform vec2 texelSize;
       void main () {
           vUv = aPosition * 0.5 + 0.5;
           vL = vUv - vec2(texelSize.x, 0.0);
           vR = vUv + vec2(texelSize.x, 0.0);
           vT = vUv + vec2(0.0, texelSize.y);
           vB = vUv - vec2(0.0, texelSize.y);
           gl_Position = vec4(aPosition, 0.0, 1.0);
       }`
    );

    const clearShader = compileShader(
      gl.FRAGMENT_SHADER,
      `precision highp float;
       varying vec2 vUv;
       uniform sampler2D uTexture;
       uniform float value;
       void main () {
           gl_FragColor = value * texture2D(uTexture, vUv);
       }`
    );

    const displayShader = compileShader(
      gl.FRAGMENT_SHADER,
      `precision highp float;
       varying vec2 vUv;
       uniform sampler2D uTexture;
       void main () {
           gl_FragColor = texture2D(uTexture, vUv);
       }`
    );

    const splatShader = compileShader(
      gl.FRAGMENT_SHADER,
      `precision highp float;
       varying vec2 vUv;
       uniform sampler2D uTarget;
       uniform float aspectRatio;
       uniform vec3 color;
       uniform vec2 point;
       uniform float radius;
       void main () {
           vec2 p = vUv - point.xy;
           p.x *= aspectRatio;
           vec3 splat = exp(-dot(p, p) / radius) * color;
           vec3 base = texture2D(uTarget, vUv).xyz;
           gl_FragColor = vec4(base + splat, 1.0);
       }`
    );

    const advectionManualFilteringShader = compileShader(
      gl.FRAGMENT_SHADER,
      `precision highp float;
       varying vec2 vUv;
       uniform sampler2D uVelocity;
       uniform sampler2D uSource;
       uniform vec2 texelSize;
       uniform float dt;
       uniform float dissipation;
       vec4 bilerp (in sampler2D sam, in vec2 p) {
           vec4 st;
           st.xy = floor(p - 0.5) + 0.5;
           st.zw = st.xy + 1.0;
           vec4 uv = st.xyxy * texelSize.xyxy;
           vec4 a = texture2D(sam, uv.xy);
           vec4 b = texture2D(sam, uv.zy);
           vec4 c = texture2D(sam, uv.xw);
           vec4 d = texture2D(sam, uv.zw);
           vec2 f = p - st.xy;
           return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
       }
       void main () {
           vec2 coord = gl_FragCoord.xy - dt * texture2D(uVelocity, vUv).xy;
           gl_FragColor = dissipation * bilerp(uSource, coord);
           gl_FragColor.a = 1.0;
       }`
    );

    const advectionShader = compileShader(
      gl.FRAGMENT_SHADER,
      `precision highp float;
       varying vec2 vUv;
       uniform sampler2D uVelocity;
       uniform sampler2D uSource;
       uniform vec2 texelSize;
       uniform float dt;
       uniform float dissipation;
       void main () {
           vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
           gl_FragColor = dissipation * texture2D(uSource, coord);
       }`
    );

    const divergenceShader = compileShader(
      gl.FRAGMENT_SHADER,
      `precision highp float;
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform sampler2D uVelocity;
       vec2 sampleVelocity (in vec2 uv) {
           vec2 multiplier = vec2(1.0, 1.0);
           if (uv.x < 0.0) { uv.x = 0.0; multiplier.x = -1.0; }
           if (uv.x > 1.0) { uv.x = 1.0; multiplier.x = -1.0; }
           if (uv.y < 0.0) { uv.y = 0.0; multiplier.y = -1.0; }
           if (uv.y > 1.0) { uv.y = 1.0; multiplier.y = -1.0; }
           return multiplier * texture2D(uVelocity, uv).xy;
       }
       void main () {
           float L = sampleVelocity(vL).x;
           float R = sampleVelocity(vR).x;
           float T = sampleVelocity(vT).y;
           float B = sampleVelocity(vB).y;
           float div = 0.5 * (R - L + T - B);
           gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
       }`
    );

    const curlShader = compileShader(
      gl.FRAGMENT_SHADER,
      `precision highp float;
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform sampler2D uVelocity;
       void main () {
           float L = texture2D(uVelocity, vL).y;
           float R = texture2D(uVelocity, vR).y;
           float T = texture2D(uVelocity, vT).x;
           float B = texture2D(uVelocity, vB).x;
           float vorticity = R - L - T + B;
           gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0);
       }`
    );

    const vorticityShader = compileShader(
      gl.FRAGMENT_SHADER,
      `precision highp float;
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform sampler2D uVelocity;
       uniform sampler2D uCurl;
       uniform float curl;
       uniform float dt;
       void main () {
           float L = texture2D(uCurl, vL).y;
           float R = texture2D(uCurl, vR).y;
           float T = texture2D(uCurl, vT).x;
           float B = texture2D(uCurl, vB).x;
           float C = texture2D(uCurl, vUv).x;
           vec2 force = vec2(abs(T) - abs(B), abs(R) - abs(L));
           force *= 1.0 / length(force + 0.00001) * curl * C;
           vec2 vel = texture2D(uVelocity, vUv).xy;
           gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
       }`
    );

    const pressureShader = compileShader(
      gl.FRAGMENT_SHADER,
      `precision highp float;
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform sampler2D uPressure;
       uniform sampler2D uDivergence;
       vec2 boundary (in vec2 uv) {
           return min(max(uv, 0.0), 1.0);
       }
       void main () {
           float L = texture2D(uPressure, boundary(vL)).x;
           float R = texture2D(uPressure, boundary(vR)).x;
           float T = texture2D(uPressure, boundary(vT)).x;
           float B = texture2D(uPressure, boundary(vB)).x;
           float divergence = texture2D(uDivergence, vUv).x;
           float pressure = (L + R + B + T - divergence) * 0.25;
           gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
       }`
    );

    const gradientSubtractShader = compileShader(
      gl.FRAGMENT_SHADER,
      `precision highp float;
       varying vec2 vUv;
       varying vec2 vL;
       varying vec2 vR;
       varying vec2 vT;
       varying vec2 vB;
       uniform sampler2D uPressure;
       uniform sampler2D uVelocity;
       vec2 boundary (in vec2 uv) {
           return min(max(uv, 0.0), 1.0);
       }
       void main () {
           float L = texture2D(uPressure, boundary(vL)).x;
           float R = texture2D(uPressure, boundary(vR)).x;
           float T = texture2D(uPressure, boundary(vT)).x;
           float B = texture2D(uPressure, boundary(vB)).x;
           vec2 velocity = texture2D(uVelocity, vUv).xy;
           velocity.xy -= vec2(R - L, T - B);
           gl_FragColor = vec4(velocity, 0.0, 1.0);
       }`
    );

    // Framebuffer variables
    let textureWidth = 0;
    let textureHeight = 0;
    let density: any = null;
    let velocity: any = null;
    let divergence: any = null;
    let curl: any = null;
    let pressure: any = null;

    // Programs
    const clearProgram = new GLProgram(baseVertexShader, clearShader);
    const displayProgram = new GLProgram(baseVertexShader, displayShader);
    const splatProgram = new GLProgram(baseVertexShader, splatShader);
    const advectionProgram = new GLProgram(
      baseVertexShader,
      support_linear_float ? advectionShader : advectionManualFilteringShader
    );
    const divergenceProgram = new GLProgram(baseVertexShader, divergenceShader);
    const curlProgram = new GLProgram(baseVertexShader, curlShader);
    const vorticityProgram = new GLProgram(baseVertexShader, vorticityShader);
    const pressureProgram = new GLProgram(baseVertexShader, pressureShader);
    const gradienSubtractProgram = new GLProgram(baseVertexShader, gradientSubtractShader);

    function createFBO(texId: number, w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      gl!.activeTexture(gl!.TEXTURE0 + texId);
      const texture = gl!.createTexture();
      gl!.bindTexture(gl!.TEXTURE_2D, texture);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, param);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, param);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      const fbo = gl!.createFramebuffer();
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, texture, 0);
      gl!.viewport(0, 0, w, h);
      gl!.clear(gl!.COLOR_BUFFER_BIT);

      return [texture, fbo, texId];
    }

    function createDoubleFBO(texId: number, w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      let fbo1 = createFBO(texId, w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(texId + 1, w, h, internalFormat, format, type, param);

      return {
        get first() { return fbo1; },
        get second() { return fbo2; },
        swap() {
          const temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    function initFramebuffers() {
      textureWidth = gl!.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE;
      textureHeight = gl!.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE;

      const iFormat = ext.internalFormat;
      const iFormatRG = ext.internalFormatRG;
      const formatRG = ext.formatRG;
      const tType = ext.texType;

      const filter = support_linear_float ? gl!.LINEAR : gl!.NEAREST;

      density = createDoubleFBO(0, textureWidth, textureHeight, iFormat, gl!.RGBA, tType, filter);
      velocity = createDoubleFBO(2, textureWidth, textureHeight, iFormatRG, formatRG, tType, filter);
      divergence = createFBO(4, textureWidth, textureHeight, iFormatRG, formatRG, tType, gl!.NEAREST);
      curl = createFBO(5, textureWidth, textureHeight, iFormatRG, formatRG, tType, gl!.NEAREST);
      pressure = createDoubleFBO(6, textureWidth, textureHeight, iFormatRG, formatRG, tType, gl!.NEAREST);
    }

    initFramebuffers();

    // Blit drawing wrapper
    const blit = (() => {
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      
      const elementBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
      
      return (destination: WebGLFramebuffer | null) => {
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, destination);
        gl!.vertexAttribPointer(0, 2, gl!.FLOAT, false, 0, 0);
        gl!.enableVertexAttribArray(0);
        gl!.drawElements(gl!.TRIANGLES, 6, gl!.UNSIGNED_SHORT, 0);
      };
    })();

    // Splat paint operation
    function splat(x: number, y: number, dx: number, dy: number, color: number[]) {
      splatProgram.bind();
      gl!.uniform1i(splatProgram.uniforms.uTarget, velocity.first[2]);
      gl!.uniform1f(splatProgram.uniforms.aspectRatio, canvas!.width / canvas!.height);
      gl!.uniform2f(splatProgram.uniforms.point, x / canvas!.width, 1.0 - y / canvas!.height);
      gl!.uniform3f(splatProgram.uniforms.color, dx, -dy, 1.0);
      gl!.uniform1f(splatProgram.uniforms.radius, config.SPLAT_RADIUS);
      blit(velocity.second[1]);
      velocity.swap();

      gl!.uniform1i(splatProgram.uniforms.uTarget, density.first[2]);
      gl!.uniform3f(
        splatProgram.uniforms.color,
        color[0] * 0.35,
        color[1] * 0.35,
        color[2] * 0.35
      );
      blit(density.second[1]);
      density.swap();
    }

    // Curated high quality green, cyan, and teal neon colors
    function getRandomColor(): number[] {
      const isCyan = Math.random() > 0.45;
      if (isCyan) {
        return [
          Math.random() * 0.15,               // Low Red
          Math.random() * 0.3 + 0.7,          // High Green
          Math.random() * 0.2 + 0.8           // High Blue (Electric Cyan/Teal)
        ];
      } else {
        return [
          Math.random() * 0.1,                // Low Red
          Math.random() * 0.4 + 0.7,          // High Green (Bright Neon Green)
          Math.random() * 0.25 + 0.1          // Low Blue
        ];
      }
    }

    let lastTime = Date.now();
    let count = 0;
    let colorArr = getRandomColor();

    let animationFrameId = 0;

    // Fluid dynamics computation loop
    const updateLoop = () => {
      resizeCanvas();

      const dt = Math.min((Date.now() - lastTime) / 1000, 0.016);
      lastTime = Date.now();

      gl!.viewport(0, 0, textureWidth, textureHeight);

      // Periodic ambient float-up splats from the center logo area
      if (Math.random() < 0.04) {
        const x = canvas.width / 2 + (Math.random() - 0.5) * 150;
        const y = canvas.height * 0.55 + (Math.random() - 0.5) * 60;
        const dx = (Math.random() - 0.5) * 350;
        const dy = (Math.random() - 0.85) * 400; // Force upwards
        const color = getRandomColor();
        splat(x, y, dx, dy, color);
      }

      advectionProgram.bind();
      gl!.uniform2f(advectionProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl!.uniform1i(advectionProgram.uniforms.uVelocity, velocity.first[2]);
      gl!.uniform1i(advectionProgram.uniforms.uSource, velocity.first[2]);
      gl!.uniform1f(advectionProgram.uniforms.dt, dt);
      gl!.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.second[1]);
      velocity.swap();

      gl!.uniform1i(advectionProgram.uniforms.uVelocity, velocity.first[2]);
      gl!.uniform1i(advectionProgram.uniforms.uSource, density.first[2]);
      gl!.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(density.second[1]);
      density.swap();

      for (let i = 0; i < pointers.length; i++) {
        const pointer = pointers[i];
        if (pointer.moved) {
          splat(pointer.x, pointer.y, pointer.dx, pointer.dy, pointer.color);
          pointer.moved = false;
        }
      }

      curlProgram.bind();
      gl!.uniform2f(curlProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl!.uniform1i(curlProgram.uniforms.uVelocity, velocity.first[2]);
      blit(curl[1]);

      vorticityProgram.bind();
      gl!.uniform2f(vorticityProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl!.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.first[2]);
      gl!.uniform1i(vorticityProgram.uniforms.uCurl, curl[2]);
      gl!.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl!.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.second[1]);
      velocity.swap();

      divergenceProgram.bind();
      gl!.uniform2f(divergenceProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl!.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.first[2]);
      blit(divergence[1]);

      clearProgram.bind();
      let pressureTexId = pressure.first[2];
      gl!.activeTexture(gl!.TEXTURE0 + pressureTexId);
      gl!.bindTexture(gl!.TEXTURE_2D, pressure.first[0]);
      gl!.uniform1i(clearProgram.uniforms.uTexture, pressureTexId);
      gl!.uniform1f(clearProgram.uniforms.value, config.PRESSURE_DISSIPATION);
      blit(pressure.second[1]);
      pressure.swap();

      pressureProgram.bind();
      gl!.uniform2f(pressureProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl!.uniform1i(pressureProgram.uniforms.uDivergence, divergence[2]);
      pressureTexId = pressure.first[2];
      gl!.activeTexture(gl!.TEXTURE0 + pressureTexId);

      for (let _i = 0; _i < config.PRESSURE_ITERATIONS; _i++) {
        gl!.bindTexture(gl!.TEXTURE_2D, pressure.first[0]);
        gl!.uniform1i(pressureProgram.uniforms.uPressure, pressureTexId);
        blit(pressure.second[1]);
        pressure.swap();
      }

      gradienSubtractProgram.bind();
      gl!.uniform2f(gradienSubtractProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
      gl!.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.first[2]);
      gl!.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.first[2]);
      blit(velocity.second[1]);
      velocity.swap();

      gl!.viewport(0, 0, gl!.drawingBufferWidth, gl!.drawingBufferHeight);
      displayProgram.bind();
      gl!.uniform1i(displayProgram.uniforms.uTexture, density.first[2]);
      blit(null);

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    updateLoop();

    // Mouse interactive handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      count++;
      if (count > 25) {
        colorArr = getRandomColor();
        count = 0;
      }

      pointers[0].down = true;
      pointers[0].color = colorArr;
      pointers[0].moved = pointers[0].down;
      pointers[0].dx = (x - pointers[0].x) * 10.0;
      pointers[0].dy = (y - pointers[0].y) * 10.0;
      pointers[0].x = x;
      pointers[0].y = y;
    };

    // Touch interactive handlers
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touches = e.targetTouches;

      count++;
      if (count > 25) {
        colorArr = getRandomColor();
        count = 0;
      }

      for (let i = 0; i < touches.length; i++) {
        if (i >= pointers.length) pointers.push(new (PointerPrototype as any)());

        const touchX = touches[i].clientX - rect.left;
        const touchY = touches[i].clientY - rect.top;

        pointers[i].id = touches[i].identifier;
        pointers[i].down = true;
        pointers[i].color = colorArr;
        pointers[i].moved = pointers[i].down;
        pointers[i].dx = (touchX - pointers[i].x) * 10.0;
        pointers[i].dy = (touchY - pointers[i].y) * 10.0;
        pointers[i].x = touchX;
        pointers[i].y = touchY;
      }
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("touchmove", handleTouchMove, { passive: true });
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70 mix-blend-screen"
      style={{ display: "block" }}
    />
  );
};

export default SmokeBackground;
