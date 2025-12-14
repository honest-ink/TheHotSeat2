import React, { useEffect, useState } from "react";

interface Studio3DProps {
  isTalking: boolean;
  sentiment: "positive" | "negative" | "neutral";
}

const ANCHOR_IMG =
  "https://raw.githubusercontent.com/honest-ink/HotSeat/d4f5bc49014f4d62e1185acb37ee314311af3e3b/NewsAnchor2.png";

const Studio3D: React.FC<Studio3DProps> = ({ isTalking, sentiment }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const lightColor = sentiment === "negative" ? "bg-red-600" : "bg-blue-600";
  const ambientColor = sentiment === "negative" ? "from-red-900/40" : "from-blue-900/40";

  return (
    <div className="absolute inset-0 overflow-hidden [perspective:1000px] bg-[#050510]">
      {/* (2) Make the anchor image the actual background */}
      <img
        src={ANCHOR_IMG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
        style={{
          objectPosition: "35% center", // <-- one-line fix: shift crop so her face sits closer to center
          filter: isTalking ? "brightness(1.02) contrast(1.05)" : "brightness(0.98) contrast(1.0)",
          transform: `scale(${isTalking ? 1.01 : 1})`,
          transformOrigin: "center bottom",
        }}
      />

      {/* 3D Container - parallax content above the background */}
      <div
        className="w-full h-full relative transform-style-3d transition-transform duration-200 ease-out z-10"
        style={{
          transform: `rotateY(${mousePos.x * 1}deg) rotateX(${-mousePos.y * 1}deg) translateZ(0px)`,
        }}
      >
        {/* Studio Atmosphere Gradient (kept, but controlled so it doesn't bury the image) */}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${ambientColor} via-transparent to-black/70 transition-colors duration-1000 z-10 pointer-events-none`}
        />

        {/* Left Screen */}
        <div className="absolute top-[20%] left-[10%] w-[250px] h-[150px] bg-black/80 border border-white/10 backdrop-blur-sm transform rotate-y-12 translate-z-[-200px] flex flex-col items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(0,100,255,0.1)] rounded-xl hidden md:flex z-20">
          <div className="w-full bg-red-600/80 text-white text-[10px] font-bold px-3 py-1 tracking-widest flex justify-between">
            <span>LIVE FEED</span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
          <div className="flex-1 w-full relative group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=400')] bg-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500" />
          </div>
        </div>

        {/* Right Screen (GNN Logo) */}
        <div className="absolute top-[15%] right-[15%] w-[350px] h-[200px] bg-black/60 border border-blue-500/20 backdrop-blur-md transform -rotate-y-12 translate-z-[-250px] rounded-lg overflow-hidden flex items-center justify-center hidden md:flex z-20">
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(0deg,transparent_24%,rgba(37,99,235,0.5)_25%,rgba(37,99,235,0.5)_26%,transparent_27%,transparent_74%,rgba(37,99,235,0.5)_75%,rgba(37,99,235,0.5)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(37,99,235,0.5)_25%,rgba(37,99,235,0.5)_26%,transparent_27%,transparent_74%,rgba(37,99,235,0.5)_75%,rgba(37,99,235,0.5)_76%,transparent_77%,transparent)] bg-[length:30px_30px]" />
          <div className="text-blue-400/80 font-black text-6xl tracking-tighter italic z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            GNN
          </div>
        </div>

        {/* Main "HOT SEAT" Text Background */}
        <div className="absolute top-[5%] left-0 right-0 flex justify-center transform translate-z-[-300px] z-10 pointer-events-none">
          <h1
            className="text-[15vw] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-white/5 to-transparent tracking-tighter select-none opacity-50"
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.05)" }}
          >
            HOT SEAT
          </h1>
        </div>

        {/* Dynamic Studio Lights (Beams) */}
        <div
          className={`absolute top-[-50%] left-[10%] w-[200px] h-[200%] ${lightColor} blur-[120px] opacity-25 transform -rotate-[20deg] pointer-events-none transition-colors duration-1000 mix-blend-screen z-20`}
        />
        <div
          className={`absolute top-[-50%] right-[10%] w-[200px] h-[200%] ${lightColor} blur-[120px] opacity-25 transform rotate-[20deg] pointer-events-none transition-colors duration-1000 mix-blend-screen z-20`}
        />

        {/* Desk (Foreground) */}
        <div className="absolute bottom-[-100px] md:bottom-[-120px] left-[-10%] right-[-10%] h-[250px] md:h-[300px] transform translate-z-[100px] z-40">
          <div className="w-full h-full bg-gradient-to-b from-blue-900/40 to-black/95 backdrop-blur-md border-t border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.7)] rounded-[100%_100%_0_0/20%] overflow-hidden relative">
            <div className="absolute top-10 left-1/4 w-32 h-20 bg-blue-500/20 blur-xl rounded-full opacity-50" />
            <div className="absolute top-10 right-1/4 w-32 h-20 bg-red-500/10 blur-xl rounded-full opacity-50" />
          </div>
          <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-blue-300/60 to-transparent shadow-[0_0_15px_rgba(147,197,253,0.5)]" />
        </div>
      </div>

      {/* (3) Overlays, but tuned so they don't bury the background image */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.18)_100%)] pointer-events-none z-20" />

      {/* keep dust subtle + behind main UI */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-screen animate-pulse" />
    </div>
  );
};

export default Studio3D;
