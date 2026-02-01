import React from 'react';

interface VisualizerProps {
  inputVolume: number;
  outputVolume: number;
  isActive: boolean;
}

export const Visualizer: React.FC<VisualizerProps> = ({ inputVolume, outputVolume, isActive }) => {
  // We'll simulate a multi-bar visualizer using the single volume value
  const bars = 5;
  
  return (
    <div className="flex items-center justify-center gap-2 h-24">
      {/* Output Visualizer (Left) */}
       <div className="flex gap-1 items-end h-full">
         {Array.from({ length: bars }).map((_, i) => {
            const height = isActive ? Math.max(10, outputVolume * 100 * (1 + Math.sin(i * 10)) ) : 4;
            return (
              <div 
                key={`out-${i}`}
                className="w-3 bg-cyan-400 rounded-full transition-all duration-75 ease-in-out"
                style={{ height: `${height}%`, opacity: isActive ? 1 : 0.3 }}
              />
            )
         })}
       </div>

      {/* Central Hub */}
      <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${isActive ? 'border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.5)]' : 'border-slate-600'}`}>
         <div className={`w-10 h-10 rounded-full ${isActive ? 'bg-cyan-500 animate-pulse' : 'bg-slate-700'}`}></div>
      </div>

       {/* Input Visualizer (Right) */}
       <div className="flex gap-1 items-end h-full">
         {Array.from({ length: bars }).map((_, i) => {
            const height = isActive ? Math.max(10, inputVolume * 300 * (1 + Math.cos(i * 10))) : 4;
            return (
              <div 
                key={`in-${i}`}
                className="w-3 bg-emerald-400 rounded-full transition-all duration-75 ease-in-out"
                style={{ height: `${height}%`, opacity: isActive ? 1 : 0.3 }}
              />
            )
         })}
       </div>
    </div>
  );
};