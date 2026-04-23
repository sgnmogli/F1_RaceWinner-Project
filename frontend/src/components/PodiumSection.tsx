"use client";

import { motion } from "framer-motion";
import { DriverCard, DriverProps } from "./DriverCard";

export interface PodiumProps {
  first: DriverProps;
  second: DriverProps;
  third: DriverProps;
}

export function PodiumSection({ first, second, third }: PodiumProps) {
  return (
    <div className="flex flex-col items-center justify-end h-[400px] w-full max-w-4xl mx-auto mt-12 gap-4 md:flex-row md:items-end">
      {/* 2nd Place */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.3 }}
        className="w-full md:w-1/3 flex flex-col items-center"
      >
        <div className="text-4xl font-black italic mb-2" style={{ color: second.teamColor, textShadow: `0 0 15px ${second.teamColor}` }}>P2</div>
        <DriverCard driver={second} />
        <div className="w-full h-12 bg-[#121212] border-t-[3px] mt-4 rounded-xl flex items-center justify-center shadow-inner" style={{ borderColor: second.teamColor }}>
        </div>
      </motion.div>

      {/* 1st Place */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.5 }}
        className="w-full md:w-1/3 flex flex-col items-center z-10"
      >
        <div className="text-5xl font-black italic mb-4" style={{ color: first.teamColor, textShadow: `0 0 20px ${first.teamColor}` }}>P1</div>
        <div className="transform scale-110 z-10 w-full px-2">
          <DriverCard driver={first} />
        </div>
        <div className="w-full h-20 bg-[#121212] border-t-[4px] mt-4 rounded-xl flex items-center justify-center shadow-inner" style={{ borderColor: first.teamColor }}>
        </div>
      </motion.div>

      {/* 3rd Place */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.1 }}
        className="w-full md:w-1/3 flex flex-col items-center"
      >
        <div className="text-3xl font-black italic mb-4" style={{ color: third.teamColor, textShadow: `0 0 10px ${third.teamColor}` }}>P3</div>
        <div className="w-full px-4"><DriverCard driver={third} /></div>
        <div className="w-full h-8 bg-[#121212] border-t-[3px] mt-4 rounded-xl flex items-center justify-center shadow-inner" style={{ borderColor: third.teamColor }}>
        </div>
      </motion.div>
    </div>
  );
}
