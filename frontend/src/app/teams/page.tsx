"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const TEAMS = [
  { name: "Alpine", color: "#FF87BC", abbreviation: "ALP", id: "alpine" },
  { name: "Aston Martin", color: "#006F62", abbreviation: "AST", id: "aston-martin" },
  { name: "Audi", color: "#F30A2B", abbreviation: "AUD", id: "audi" },
  { name: "Cadillac", color: "#8A8D8F", abbreviation: "CAD", id: "cadillac" },
  { name: "Ferrari", color: "#E10600", abbreviation: "FER", id: "ferrari" },
  { name: "Haas F1 Team", color: "#B6BABD", abbreviation: "HAA", id: "haas" },
  { name: "McLaren", color: "#FF8000", abbreviation: "MCL", id: "mclaren" },
  { name: "Mercedes", color: "#00D2BE", abbreviation: "MER", id: "mercedes" },
  { name: "Racing Bulls", color: "#1534CC", abbreviation: "VRB", id: "racing-bulls" },
  { name: "Red Bull Racing", color: "#3671C6", abbreviation: "RBR", id: "red-bull-racing" },
  { name: "Williams", color: "#005AFF", abbreviation: "WIL", id: "williams" }
];

export default function TeamsPage() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <main className="min-h-screen bg-black pb-24 overflow-hidden relative isolate font-sans text-white">
      
      <div className="absolute top-0 right-0 w-[40%] h-[50vh] bg-gradient-to-bl from-[#2A2A2A] to-transparent opacity-30 -z-10 blur-[100px]" />

      <nav className="w-full flex justify-end items-center py-8 px-8 md:px-12 lg:px-16 z-50 relative border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="hidden md:flex gap-10 text-xs font-bold text-[#A0A0A0] uppercase tracking-widest">
           <Link href="/" className="hover:text-white transition-colors">Home</Link>
           <Link href="/races" className="hover:text-white transition-colors">Races</Link>
           <Link href="/drivers" className="hover:text-white transition-colors">Drivers</Link>
           <Link href="/teams" className="text-white">Teams</Link>
           <Link href="/results" className="hover:text-white transition-colors">Results</Link>
           <Link href="/about" className="hover:text-white transition-colors">About</Link>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-16 relative z-10">
        
        {/* Title Section */}
        <div className="mb-12 border-l-[3px] border-white pl-6">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-2">2026 Teams</h1>
          <p className="text-[#A0A0A0] font-medium tracking-wide uppercase text-sm">The 11 constructors fighting for championship glory</p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TEAMS.map((team, idx) => {
            return (
              <div 
                key={idx} 
                className="group relative h-[250px] border border-white/10 rounded-2xl overflow-hidden bg-[#121212] transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.8)] cursor-pointer flex flex-col justify-between"
              >
                {/* Immersive Background Glow */}
                <div 
                  className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-40 mix-blend-screen" 
                  style={{ background: `linear-gradient(135deg, ${team.color}90 0%, transparent 60%)` }}
                />

                <div className="absolute top-0 right-0 w-full h-[6px]" style={{ backgroundColor: team.color }} />

                {/* Team Header */}
                <div className="pt-6 px-6 z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div 
                       className="w-4 h-8 rounded-sm" 
                       style={{ backgroundColor: team.color }}
                     />
                     <h2 className="text-2xl font-black uppercase tracking-tighter drop-shadow-md">{team.name}</h2>
                  </div>
                </div>

                {/* Car Visualization */}
                <div className="relative w-full h-[180px] mt-auto flex items-end justify-center transition-transform duration-500 group-hover:scale-105">
                  {/* Background Text Accent */}
                  <div className="text-8xl font-black tracking-tighter italic absolute top-1 -right-2 pointer-events-none opacity-[0.03] z-0 transition-opacity duration-300 group-hover:opacity-[0.08]" style={{ color: team.color, WebkitTextStroke: `1px ${team.color}` }}>
                    {team.abbreviation}
                  </div>
                  
                  {/* Dynamic Color Tint overlaying the pure white car generated image ONLY if the local asset is missing */}
                  {failedImages[team.id] && (
                    <div className="absolute inset-x-0 bottom-0 top-[20%] mix-blend-multiply z-20 transition-colors duration-500" style={{ backgroundColor: team.color }} />
                  )}

                  {/* Local asset / dynamic F1 image mapping */}
                  <img 
                    src={`/assets/cars/${team.id === 'red-bull-racing' ? 'redbull' : team.id}.png`} 
                    alt={`${team.name} Car`} 
                    onError={(e) => { 
                      e.currentTarget.src = '/car.png'; 
                      setFailedImages(prev => ({...prev, [team.id]: true}));
                    }}
                    className="w-[95%] object-contain absolute bottom-0 z-10 pointer-events-none drop-shadow-2xl brightness-110" 
                  />
                </div>
                
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
