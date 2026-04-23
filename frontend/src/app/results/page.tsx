import Link from 'next/link';
import { Fragment } from 'react';

const TEAM_COLORS: Record<string, string> = {
  "Mercedes": "#00D2BE",
  "Ferrari": "#E10600",
  "McLaren": "#FF8000",
  "Haas F1 Team": "#B6BABD",
  "Alpine": "#FF87BC",
  "Red Bull Racing": "#3671C6",
  "Racing Bulls": "#1534CC",
  "Audi": "#F30A2B",
  "Williams": "#005AFF",
  "Cadillac": "#8A8D8F",
  "Aston Martin": "#006F62"
};

const DRIVER_STANDINGS = [
  { pos: 1, driver: "Kimi Antonelli", nat: "ITA", team: "Mercedes", pts: 72 },
  { pos: 2, driver: "George Russell", nat: "GBR", team: "Mercedes", pts: 63 },
  { pos: 3, driver: "Charles Leclerc", nat: "MON", team: "Ferrari", pts: 49 },
  { pos: 4, driver: "Lewis Hamilton", nat: "GBR", team: "Ferrari", pts: 41 },
  { pos: 5, driver: "Lando Norris", nat: "GBR", team: "McLaren", pts: 25 },
  { pos: 6, driver: "Oscar Piastri", nat: "AUS", team: "McLaren", pts: 21 },
  { pos: 7, driver: "Oliver Bearman", nat: "GBR", team: "Haas F1 Team", pts: 17 },
  { pos: 8, driver: "Pierre Gasly", nat: "FRA", team: "Alpine", pts: 15 },
  { pos: 9, driver: "Max Verstappen", nat: "NED", team: "Red Bull Racing", pts: 12 },
  { pos: 10, driver: "Liam Lawson", nat: "NZL", team: "Racing Bulls", pts: 10 },
  { pos: 11, driver: "Arvid Lindblad", nat: "GBR", team: "Racing Bulls", pts: 4 },
  { pos: 12, driver: "Isack Hadjar", nat: "FRA", team: "Red Bull Racing", pts: 4 },
  { pos: 13, driver: "Gabriel Bortoleto", nat: "BRA", team: "Audi", pts: 2 },
  { pos: 14, driver: "Carlos Sainz", nat: "ESP", team: "Williams", pts: 2 },
  { pos: 15, driver: "Esteban Ocon", nat: "FRA", team: "Haas F1 Team", pts: 1 },
  { pos: 16, driver: "Franco Colapinto", nat: "ARG", team: "Alpine", pts: 1 },
  { pos: 17, driver: "Nico Hulkenberg", nat: "GER", team: "Audi", pts: 0 },
  { pos: 18, driver: "Alexander Albon", nat: "THA", team: "Williams", pts: 0 },
  { pos: 19, driver: "Valtteri Bottas", nat: "FIN", team: "Cadillac", pts: 0 },
  { pos: 20, driver: "Sergio Perez", nat: "MEX", team: "Cadillac", pts: 0 },
  { pos: 21, driver: "Fernando Alonso", nat: "ESP", team: "Aston Martin", pts: 0 },
  { pos: 22, driver: "Lance Stroll", nat: "CAN", team: "Aston Martin", pts: 0 }
];

const TEAM_STANDINGS = [
  { pos: 1, team: "Mercedes", pts: 135 },
  { pos: 2, team: "Ferrari", pts: 90 },
  { pos: 3, team: "McLaren", pts: 46 },
  { pos: 4, team: "Haas F1 Team", pts: 18 },
  { pos: 5, team: "Alpine", pts: 16 },
  { pos: 6, team: "Red Bull Racing", pts: 16 },
  { pos: 7, team: "Racing Bulls", pts: 14 },
  { pos: 8, team: "Audi", pts: 2 },
  { pos: 9, team: "Williams", pts: 2 },
  { pos: 10, team: "Cadillac", pts: 0 },
  { pos: 11, team: "Aston Martin", pts: 0 }
];

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-black pb-24 overflow-hidden relative isolate font-sans text-white">
      
      {/* Immersive glow */}
      <div className="absolute top-0 right-[25%] w-[30%] h-[30vh] bg-[#FF1E1E] opacity-10 blur-[120px] -z-10" />

      <nav className="w-full flex justify-end items-center py-8 px-8 md:px-12 lg:px-16 z-50 relative border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="hidden md:flex gap-10 text-xs font-bold text-[#A0A0A0] uppercase tracking-widest">
           <Link href="/" className="hover:text-white transition-colors">Home</Link>
           <Link href="/races" className="hover:text-white transition-colors">Races</Link>
           <Link href="/drivers" className="hover:text-white transition-colors">Drivers</Link>
           <Link href="/teams" className="hover:text-white transition-colors">Teams</Link>
           <Link href="/results" className="text-white border-b-2 border-[#FF1E1E] pb-1">Results</Link>
           <Link href="/about" className="hover:text-white transition-colors">About</Link>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-16 relative z-10">
        
        {/* Title Section */}
        <div className="mb-12 border-l-[3px] border-white pl-6">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-2">2026 Standings</h1>
          <p className="text-[#A0A0A0] font-medium tracking-wide uppercase text-sm">Official Championship Leaderboards</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Driver Standings */}
          <div className="flex-1 w-full">
            <h2 className="text-2xl font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Drivers Championship</h2>
            
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-12 gap-4 px-6 py-2 text-[10px] font-bold text-[#A0A0A0] uppercase tracking-widest">
                <div className="col-span-1">Pos</div>
                <div className="col-span-1">Nat</div>
                <div className="col-span-5">Driver</div>
                <div className="col-span-4">Team</div>
                <div className="col-span-1 text-right">Pts</div>
              </div>

              {DRIVER_STANDINGS.map((row) => (
                <div 
                  key={row.pos}
                  className="grid grid-cols-12 gap-4 px-6 py-4 rounded-lg bg-[#121212] border border-white/5 items-center hover:bg-[#1A1A1A] transition-colors relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 h-full w-[4px]" style={{ backgroundColor: TEAM_COLORS[row.team] || '#fff' }} />
                  
                  <div className="col-span-1 font-black text-xl italic text-white/80">{row.pos}</div>
                  <div className="col-span-1 font-black text-sm text-[#A0A0A0]">{row.nat}</div>
                  <div className="col-span-5 font-black uppercase tracking-tighter text-lg">{row.driver}</div>
                  <div className="col-span-4 text-xs font-bold uppercase tracking-widest text-[#A0A0A0] group-hover:text-white transition-colors">
                    {row.team}
                  </div>
                  <div className="col-span-1 font-black text-xl text-right">{row.pts}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Standings */}
          <div className="flex-1 w-full lg:max-w-md">
            <h2 className="text-2xl font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Constructors Championship</h2>
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-between px-6 py-2 text-[10px] font-bold text-[#A0A0A0] uppercase tracking-widest">
                <div className="flex gap-6">
                  <span>Pos</span>
                  <span>Team</span>
                </div>
                <span>Pts</span>
              </div>

              {TEAM_STANDINGS.map((row) => (
                <div 
                  key={row.pos}
                  className="flex justify-between px-6 py-5 rounded-lg bg-[#121212] border border-white/5 items-center hover:bg-[#1A1A1A] transition-colors relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 h-full w-[4px]" style={{ backgroundColor: TEAM_COLORS[row.team] || '#fff' }} />
                  
                  <div className="flex items-center gap-6">
                    <span className="font-black text-xl italic text-white/80">{row.pos}</span>
                    <div className="flex flex-col">
                      <span className="font-black uppercase tracking-tighter text-lg group-hover:text-white transition-colors">{row.team}</span>
                    </div>
                  </div>
                  <span className="font-black text-2xl" style={{ color: TEAM_COLORS[row.team] || '#fff' }}>{row.pts}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
