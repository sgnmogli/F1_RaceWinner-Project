"use client";

import Link from 'next/link';
import Image from 'next/image';
import { TeamSelector } from '../components/TeamSelector';
import { useTeamTheme } from '../context/ThemeContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { activeTeam } = useTeamTheme();
  const router = useRouter();

  const pastRaces = [
    { round: 1, name: "Australia" },
    { round: 2, name: "China" },
    { round: 3, name: "Japan" },
  ];

  const upcomingRaces = [
    { round: 5, name: "Miami" },
    { round: 6, name: "Canada" },
    { round: 7, name: "Spain" }
  ];

  return (
    <main className="bg-black p-4 md:p-8 lg:p-12 relative isolate">
      
      {/* Main Content Area Container */}
      <div className="relative w-full min-h-[calc(100vh-6rem)] border border-white/10 rounded-sm overflow-hidden bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]">
        
        {/* Top Navigation Strip */}
        <nav className="absolute top-0 w-full flex items-center justify-between px-6 md:px-12 py-8 z-50">
          <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-[#A0A0A0]">
            <Link href="/" className="text-white hover:text-team-primary transition-colors duration-500">Home</Link>
            <Link href="/races" className="hover:text-white transition-colors">Races</Link>
            <Link href="/drivers" className="hover:text-white transition-colors">Drivers</Link>
            <Link href="/teams" className="hover:text-white transition-colors">Teams</Link>
            <Link href="/results" className="hover:text-white transition-colors">Results</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
          </div>
        </nav>

        {/* The Dynamic Central Spine */}
        <div 
          className="absolute top-0 right-[280px] md:right-[320px] w-[1px] h-full bg-team-primary z-20 pointer-events-none transition-colors duration-500"
          style={{ boxShadow: '0 0 20px var(--team-primary)' }}
        />

        {/* F1 Car Hero Image and Road Backdrop */}
        <div className="absolute inset-0 z-10 pointer-events-none flex">
           {/* Faded Fast Road Backdrop */}
           <div 
             className="absolute top-1/2 left-1/2 md:left-[60%] -translate-x-1/2 -translate-y-1/2 w-[40%] md:w-[20vw] h-[90vh] md:h-[100vh] opacity-20 blur-[60px] transition-all duration-700 mix-blend-screen"
             style={{ 
               background: 'linear-gradient(180deg, transparent 0%, var(--team-primary) 35%, var(--team-primary) 65%, transparent 100%)',
             }}
           ></div>

           {/* F1 Car Image */}
           <img 
             key={activeTeam.id}
             src={activeTeam.assets.carImage} 
             alt={`${activeTeam.name} F1 Car`} 
             className="absolute top-1/2 left-1/2 md:left-[60%] -translate-x-1/2 -translate-y-1/2 w-[180%] md:w-auto h-[80vh] md:h-[85vh] max-w-none object-contain mix-blend-screen transition-opacity duration-700 animate-in fade-in"
           />
        </div>

        {/* Main Img1 Content */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-12 z-20 max-w-xl">
          <div className="flex items-end gap-6 mb-6">
            <h2 className="text-5xl md:text-[5.5rem] leading-[0.9] font-black text-white italic tracking-tighter drop-shadow-xl">
              <span className="text-team-primary transition-colors duration-500">F1</span> PREDICTION <br/>
              ENGINE
            </h2>
          </div>
          <div className="pl-6 border-l-[3px] border-team-primary transition-colors duration-500">
            <p className="text-[#A0A0A0] text-sm md:text-base font-medium tracking-wide">
              Machine Learning logic simulating telemetry pacing, qualifying deltas, and compound data to forecast exact podium times.
            </p>
          </div>
        </div>
        
        {/* Simulator Dashboard Entry Points */}
        <div className="absolute top-32 right-8 md:right-16 flex flex-col z-20">
          <div className="flex flex-col gap-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A0A0A0] text-right">View Past Results</span>
            <select 
              className="bg-[#121212]/80 backdrop-blur-md text-white border border-white/10 px-4 py-3 text-[10px] md:text-xs uppercase tracking-widest font-bold outline-none w-[220px] transition-colors focus:border-team-primary cursor-pointer hover:bg-[#1A1A1A]"
              onChange={(e) => {
                if (e.target.value) {
                  router.push(`/race/${e.target.value}`);
                }
              }}
              defaultValue=""
            >
              <option value="" disabled>Select Trace...</option>
              {pastRaces.map(r => (
                <option key={r.round} value={r.round} className="bg-[#121212] text-white">Race {r.round} : {r.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A0A0A0] text-right">Simulate Upcoming</span>
            {upcomingRaces.map((race) => (
               <Link key={race.round} href={`/race/${race.round}`}>
                 <button className="bg-[#121212]/80 backdrop-blur-md hover:bg-team-primary text-white border border-white/10 px-6 py-4 text-[10px] md:text-xs uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-between gap-4 group w-[220px]">
                   <span>Race {race.round} : {race.name}</span>
                   <span className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                 </button>
               </Link>
            ))}
          </div>
        </div>

      </div>
      <TeamSelector />
    </main>
  );
}
