import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Races() {
  const races2026 = [
    { 
      round: 1, name: "Australian Grand Prix", location: "Melbourne", length: "5.278 km", date: "Mar 08 2026", 
      pastWinner: "LEC (2025)", isOver: true, winner2026: "RUS (Mercedes)", winnerColor: "#00D2BE" 
    },
    { 
      round: 2, name: "Chinese Grand Prix", location: "Shanghai", length: "5.451 km", date: "Mar 15 2026", 
      pastWinner: "VER (2025)", isOver: true, winner2026: "ANT (Mercedes)", winnerColor: "#00D2BE" 
    },
    { 
      round: 3, name: "Japanese Grand Prix", location: "Suzuka", length: "5.807 km", date: "Mar 29 2026", 
      pastWinner: "VER (2025)", isOver: true, winner2026: "ANT (Mercedes)", winnerColor: "#00D2BE" 
    },
    { 
      round: 4, name: "Bahrain Grand Prix", location: "Sakhir", length: "5.412 km", date: "Apr 12 2026", 
      pastWinner: "VER (2025)", isOver: false, isCancelled: true
    },
    { 
      round: 5, name: "Saudi Arabian Grand Prix", location: "Jeddah", length: "6.174 km", date: "Apr 26 2026", 
      pastWinner: "PER (2025)", isOver: false, isCancelled: true
    },
    { 
      round: 6, name: "Miami Grand Prix", location: "Miami", length: "5.412 km", date: "May 03 2026", 
      pastWinner: "NOR (2025)", isOver: false 
    },
  ];

  return (
    <main className="min-h-screen bg-black pb-24 relative isolate font-sans">
      
      {/* Subtle Background Lines */}
      <div className="absolute top-0 left-[15%] w-[8px] h-[50vh] bg-white/5 rotate-[35deg] -translate-x-1/2 -z-10" />

      <nav className="w-full flex justify-end items-center py-8 px-8 md:px-12 lg:px-16 z-50 relative border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="hidden md:flex gap-10 text-xs font-bold text-[#A0A0A0] uppercase tracking-widest">
             <Link href="/" className="hover:text-white transition-colors">Home</Link>
             <Link href="/races" className="text-white">Races</Link>
             <Link href="/drivers" className="hover:text-white transition-colors">Drivers</Link>
             <Link href="/teams" className="hover:text-white transition-colors">Teams</Link>
             <Link href="/results" className="hover:text-white transition-colors">Results</Link>
             <Link href="/about" className="hover:text-white transition-colors">About</Link>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mt-4 mb-16 relative z-10">
        <h1 className="text-5xl md:text-6xl font-black text-white italic tracking-tighter leading-[0.9] uppercase mb-12">
          2026 <span className="text-[#FF1E1E]">CALENDAR</span>
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {races2026.map(race => (
            <Card key={race.round} className="bg-[#121212] border border-white/10 rounded-xl shadow-2xl relative overflow-hidden transition-all duration-500 hover:bg-[#1A1A1A] hover:border-white/30 hover:-translate-y-1 group">
              
              {/* Highlight Background Glow if Race is Over */}
              {race.isOver && (
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[150%] opacity-20 blur-[50px] transition-all duration-700 mix-blend-screen pointer-events-none group-hover:opacity-40"
                  style={{ 
                    background: `linear-gradient(180deg, transparent 0%, ${race.winnerColor} 35%, ${race.winnerColor} 65%, transparent 100%)`
                  }}
                />
              )}

              <CardHeader className="pb-4 border-b border-white/5 relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <Badge 
                    className="text-white rounded-md px-3 py-1 text-[10px] font-black border-none"
                    style={{ backgroundColor: race.isOver ? race.winnerColor : (race.isCancelled ? '#555' : '#333') }}
                  >
                    ROUND {race.round}
                  </Badge>
                  <span className="text-xs text-gray-400 font-mono tracking-wider">{race.date}</span>
                </div>
                <CardTitle className="text-2xl uppercase tracking-tighter font-black text-white leading-none">
                  {race.name}
                </CardTitle>
                <div className="text-[11px] uppercase font-bold tracking-[0.2em] mt-2" style={{ color: race.isOver ? race.winnerColor : (race.isCancelled ? '#666' : '#A0A0A0') }}>
                  {race.location}
                </div>
              </CardHeader>
              <CardContent className="pt-6 relative z-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">Track Length</span>
                    <span className="font-mono text-sm text-white font-bold">{race.length}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">
                      {race.isCancelled ? "Status" : (race.isOver ? "2026 Winner" : "Past Winner")}
                    </span>
                    <span 
                      className={`font-mono text-sm font-bold tracking-wide transition-all duration-500`} 
                      style={{ 
                        color: race.isCancelled ? '#FF4444' : 'white',
                        textShadow: race.isOver ? `0 0 15px ${race.winnerColor}, 0 0 5px ${race.winnerColor}` : 'none'
                      }}
                    >
                      {race.isCancelled ? "CANCELLED" : (race.isOver ? race.winner2026 : race.pastWinner)}
                    </span>
                  </div>
                </div>
                
                <Link href={race.isCancelled ? "#" : `/race/${race.round}`}>
                  <button 
                    disabled={race.isCancelled}
                    className="w-full mt-8 border border-white/10 text-white text-xs font-bold uppercase tracking-widest py-4 rounded-md transition-all duration-300 shadow-inner group-hover:border-white/30 backdrop-blur-md disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ 
                      backgroundColor: race.isOver ? `${race.winnerColor}20` : 'rgba(255,255,255,0.03)',
                    }}
                  >
                    {race.isCancelled ? "Event Cancelled" : "Simulate Trace"}
                  </button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
