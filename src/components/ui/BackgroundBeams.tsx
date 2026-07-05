"use client";
import React from "react";

export const BackgroundBeams = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] animate-spin-slow opacity-20">
        <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#10b981_100%)]"></div>
      </div>
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzl9yxixg/image/upload/v1714558603/noise_s9a2eb.png')] opacity-[0.03] mix-blend-overlay"></div>
    </div>
  );
};
