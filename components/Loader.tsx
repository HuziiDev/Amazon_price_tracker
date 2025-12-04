// components/Loader.tsx
'use client'

import React, { memo } from 'react';

const Loader = memo(() => {
  // Pre-calculate random positions to avoid recalculating on every render
  const dots = React.useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4
    }))
  , []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-950 to-black overflow-hidden">
      {/* Animated Background Waves */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>
      </div>

      {/* Floating Dots Background */}
      <div className="absolute inset-0">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="dot"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              animationDelay: `${dot.delay}s`,
              animationDuration: `${dot.duration}s`
            }}
          />
        ))}
      </div>

      {/* Main Loader Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Spinning Ring Loader */}
        <div className="relative w-32 h-32">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-red-500/20"></div>
          
          {/* Spinning Ring 1 */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-500 animate-spin"></div>
          
          {/* Spinning Ring 2 - Opposite Direction */}
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-red-400 animate-spin-reverse"></div>
          
          {/* Spinning Ring 3 */}
          <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-red-300 animate-spin-slow"></div>
          
          {/* Center Pulse */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 animate-pulse-scale shadow-lg shadow-red-500/50"></div>
          
          {/* Inner Glow */}
          <div className="absolute inset-10 rounded-full bg-red-400 animate-pulse blur-sm"></div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-2xl font-bold text-white tracking-wider animate-pulse-slow">
            Loading
            <span className="inline-flex ml-1">
              <span className="animate-bounce-dot animation-delay-0">.</span>
              <span className="animate-bounce-dot animation-delay-200">.</span>
              <span className="animate-bounce-dot animation-delay-400">.</span>
            </span>
          </h2>
          
          {/* Progress Bar */}
          <div className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400 animate-progress"></div>
          </div>
          
          <p className="text-red-300/70 text-sm font-medium animate-pulse">
            Please wait while we fetch your data
          </p>
        </div>

        {/* Orbiting Dots */}
        <div className="relative w-48 h-48 -mt-24">
          <div className="orbit-dot orbit-dot-1"></div>
          <div className="orbit-dot orbit-dot-2"></div>
          <div className="orbit-dot orbit-dot-3"></div>
          <div className="orbit-dot orbit-dot-4"></div>
        </div>
      </div>

      <style jsx>{`
        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 200%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(220, 38, 38, 0.1), transparent);
          animation: wave-animation 8s linear infinite;
        }

        .wave1 {
          animation-duration: 8s;
          opacity: 0.5;
        }

        .wave2 {
          animation-duration: 12s;
          opacity: 0.3;
          animation-delay: -2s;
        }

        .wave3 {
          animation-duration: 16s;
          opacity: 0.2;
          animation-delay: -4s;
        }

        @keyframes wave-animation {
          0% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-25%) translateY(-20px); }
          100% { transform: translateX(0) translateY(0); }
        }

        .dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.8), transparent);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.5); opacity: 0.8; }
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }

        .animate-spin-slow {
          animation: spin 2s linear infinite;
        }

        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        .animate-pulse-scale {
          animation: pulse-scale 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes bounce-dot {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
        }

        .animate-bounce-dot {
          display: inline-block;
          animation: bounce-dot 1.4s infinite;
        }

        .animation-delay-0 { animation-delay: 0s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }

        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }

        .orbit-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #ef4444, #dc2626);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);
        }

        .orbit-dot-1 {
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          animation: orbit 3s linear infinite;
        }

        .orbit-dot-2 {
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          animation: orbit 3s linear infinite;
          animation-delay: -0.75s;
        }

        .orbit-dot-3 {
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          animation: orbit 3s linear infinite;
          animation-delay: -1.5s;
        }

        .orbit-dot-4 {
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          animation: orbit 3s linear infinite;
          animation-delay: -2.25s;
        }

        @keyframes orbit {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
});

Loader.displayName = 'Loader';

export default Loader;