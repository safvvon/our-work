"use client";

import React, { useEffect, useRef } from "react";

export const RibbonBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const glCtx = gl as WebGLRenderingContext;

    const resizeCanvas = () => {
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        glCtx.viewport(0, 0, glCtx.canvas.width, glCtx.canvas.height);
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;

      // Simplex 2D noise
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = uv;
        p -= 0.5;
        p.x *= u_resolution.x / u_resolution.y;

        float t = u_time * 0.4;
        float intensity = 0.0;
        
        // Create an energetic ribbon consisting of multiple overlapping strands
        const int strands = 7;
        for(int i = 0; i < strands; i++) {
            float fi = float(i);
            float offset = fi * 0.12;
            
            // Meandering S-curves based on vertical position
            float meander = sin(p.y * 3.5 - t + offset) * 0.25;
            meander += cos(p.y * 1.8 + t * 0.6 + offset) * 0.15;
            
            // Organic noise displacement
            float noise = snoise(vec2(p.y * 1.2 - t * 0.4, t * 0.15 + fi)) * 0.25;
            
            // Distance from current strand (makes a vertical wave)
            float x = p.x - (meander + noise);
            
            float dist = abs(x);
            // Core brightness falloff
            intensity += 0.005 / (dist + 0.004);
        }

        // Color Palette matching the INTELLEX photo
        vec3 greenBase = vec3(0.1, 0.95, 0.2); // Vibrant neon green
        vec3 yellowHighlight = vec3(0.6, 1.0, 0.1); // Bright yellow-green core
        
        vec3 ribbonColor = mix(greenBase, yellowHighlight, sin(p.y * 2.0 + t) * 0.5 + 0.5);
        vec3 finalColor = ribbonColor * intensity;
        
        // Soft vignette to fade ribbon out at screen edges
        float vignette = 1.0 - smoothstep(0.1, 1.2, length(uv - 0.5) * 1.8);
        finalColor *= vignette;

        // Contrast boost for more neon pop
        finalColor = pow(finalColor, vec3(1.1));

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = glCtx.createShader(type);
      if (!shader) throw new Error("Failed to create shader");
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error(glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(glCtx.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(glCtx.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    const program = glCtx.createProgram();
    if (!program) return;
    
    glCtx.attachShader(program, vertexShader);
    glCtx.attachShader(program, fragmentShader);
    glCtx.linkProgram(program);

    if (!glCtx.getProgramParameter(program, glCtx.LINK_STATUS)) {
      console.error(glCtx.getProgramInfoLog(program));
      return;
    }

    glCtx.useProgram(program);

    const positionBuffer = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, positionBuffer);
    glCtx.bufferData(
      glCtx.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      glCtx.STATIC_DRAW
    );

    const positionLocation = glCtx.getAttribLocation(program, "a_position");
    glCtx.enableVertexAttribArray(positionLocation);
    glCtx.vertexAttribPointer(positionLocation, 2, glCtx.FLOAT, false, 0, 0);

    const resolutionLocation = glCtx.getUniformLocation(program, "u_resolution");
    const timeLocation = glCtx.getUniformLocation(program, "u_time");

    let animationFrameId: number;
    let startTime = Date.now();

    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000.0;

      glCtx.clearColor(0.0, 0.0, 0.0, 1.0);
      glCtx.clear(glCtx.COLOR_BUFFER_BIT);

      glCtx.uniform2f(resolutionLocation, canvas.width, canvas.height);
      glCtx.uniform1f(timeLocation, currentTime);

      glCtx.drawArrays(glCtx.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-80"
      style={{ display: "block" }}
    />
  );
};

export default RibbonBackground;
