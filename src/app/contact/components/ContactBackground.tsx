"use client";

import React from "react";

export const ContactBackground: React.FC = () => {
  return (
    <>
      {/* Subtle ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-neonGreen/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neonGreen/[0.02] rounded-full blur-[150px]" />
      </div>
    </>
  );
};

export default ContactBackground;
