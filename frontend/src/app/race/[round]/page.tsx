import Link from 'next/link';
import { CircuitInfo } from '@/components/CircuitInfo';
import { PodiumSection } from '@/components/PodiumSection';
import { TelemetryVisualizer } from '@/components/TelemetryVisualizer';

export default function RacePrediction({ params }: { params: { round: string } }) {
  // Common driver data
  const drivers = {
    ver: { name: "Max Verstappen", code: "VER", team: "Red Bull", teamColor: "#3671C6" },
    lec: { name: "Charles Leclerc", code: "LEC", team: "Ferrari", teamColor: "#E10600" },
    nor: { name: "Lando Norris", code: "NOR", team: "McLaren", teamColor: "#FF8000" },
    rus: { name: "George Russell", code: "RUS", team: "Mercedes", teamColor: "#00D2BE" },
    ant: { name: "Kimi Antonelli", code: "ANT", team: "Mercedes", teamColor: "#00D2BE" },
    per: { name: "Sergio Perez", code: "PER", team: "Red Bull", teamColor: "#3671C6" },
    ham: { name: "Lewis Hamilton", code: "HAM", team: "Ferrari", teamColor: "#E10600" },
    pia: { name: "Oscar Piastri", code: "PIA", team: "McLaren", teamColor: "#FF8000" },
  };

  const getTraceData = (offset: number, speedBound: number) => 
    Array.from({length: 150}, (_, i) => [i * 54.12, Math.max(80, speedBound + (Math.sin(i * 0.1 - offset) * 115))] as [number, number]);

  let raceData;
  switch (params.round) {
    case "1":
      raceData = {
        name: "Australian Grand Prix", location: "Melbourne", lengthKm: 5.278, laps: 58, drsZones: 4, fastestLap: "1:19.815", weather: "Clear / 22°C",
        isOver: true,
        podium: [drivers.rus, drivers.ant, drivers.lec],
        telemetry: [
          { ...drivers.rus, data: getTraceData(0, 205) },
          { ...drivers.ant, data: getTraceData(0.2, 200) },
          { ...drivers.lec, data: getTraceData(0.4, 198) }
        ]
      };
      break;
    case "2":
      raceData = {
        name: "Chinese Grand Prix", location: "Shanghai", lengthKm: 5.451, laps: 56, drsZones: 2, fastestLap: "1:35.105", weather: "Cloudy / 19°C",
        isOver: true,
        podium: [drivers.ant, drivers.rus, drivers.ham],
        telemetry: [
           { ...drivers.ant, data: getTraceData(0.1, 210) },
           { ...drivers.rus, data: getTraceData(0.3, 205) },
           { ...drivers.ham, data: getTraceData(0.5, 202) }
        ]
      };
      break;
    case "3":
      raceData = {
        name: "Japanese Grand Prix", location: "Suzuka", lengthKm: 5.807, laps: 53, drsZones: 1, fastestLap: "1:30.983", weather: "Rain / 17°C",
        isOver: true,
        podium: [drivers.ant, drivers.pia, drivers.lec],
        telemetry: [
           { ...drivers.ant, data: getTraceData(0, 195) },
           { ...drivers.pia, data: getTraceData(0.3, 190) },
           { ...drivers.lec, data: getTraceData(0.5, 188) }
        ]
      };
      break;
    case "4": // Bahrain Cancelled
      raceData = {
        name: "Bahrain Grand Prix (CANCELLED)", location: "Sakhir", lengthKm: 5.412, laps: 57, drsZones: 3, fastestLap: "N/A", weather: "N/A",
        isOver: false, isCancelled: true,
        podium: [drivers.ver, drivers.lec, drivers.nor],
        telemetry: []
      };
      break;
    case "5": 
      raceData = {
        name: "Miami Grand Prix", location: "Miami", lengthKm: 5.412, laps: 57, drsZones: 3, fastestLap: "TBD", weather: "TBD",
        isOver: false,
        podium: [drivers.nor, drivers.ver, drivers.lec], // predicted
        telemetry: [
           { ...drivers.nor, data: getTraceData(0.1, 205) },
           { ...drivers.ver, data: getTraceData(0.3, 200) },
           { ...drivers.lec, data: getTraceData(0.4, 198) }
        ]
      };
      break;
    case "6":
      raceData = {
        name: "Canadian Grand Prix", location: "Montreal", lengthKm: 4.361, laps: 70, drsZones: 2, fastestLap: "TBD", weather: "TBD",
        isOver: false,
        podium: [drivers.ver, drivers.nor, drivers.rus], // predicted
        telemetry: [
           { ...drivers.ver, data: getTraceData(0.1, 210) },
           { ...drivers.nor, data: getTraceData(0.3, 205) },
           { ...drivers.rus, data: getTraceData(0.4, 201) }
        ]
      };
      break;
    case "7":
      raceData = {
        name: "Spanish Grand Prix", location: "Barcelona", lengthKm: 4.657, laps: 66, drsZones: 2, fastestLap: "TBD", weather: "TBD",
        isOver: false,
        podium: [drivers.ver, drivers.nor, drivers.ham], // predicted
        telemetry: [
           { ...drivers.ver, data: getTraceData(0.1, 215) },
           { ...drivers.nor, data: getTraceData(0.3, 210) },
           { ...drivers.ham, data: getTraceData(0.4, 205) }
        ]
      };
      break;
    default:
      raceData = {
        name: `Upcoming Race Round ${params.round}`, location: "TBA", lengthKm: 5.0, laps: 50, drsZones: 2, fastestLap: "TBD", weather: "TBD",
        isOver: false,
        podium: [drivers.nor, drivers.ver, drivers.lec], // predicted
        telemetry: [
           { ...drivers.nor, data: getTraceData(0.1, 205) },
           { ...drivers.ver, data: getTraceData(0.3, 200) },
           { ...drivers.lec, data: getTraceData(0.4, 198) }
        ]
      };
  }

  return (
    <main className="min-h-screen bg-black pb-24 overflow-hidden relative isolate font-sans text-white">
      
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-[15%] w-[8px] h-screen bg-[#FF1E1E]/20 rotate-[35deg] translate-x-1/2 -z-10 shadow-[0_0_30px_#FF1E1E]" />
      
      <nav className="w-full flex justify-end items-center py-8 px-8 md:px-16 z-50 relative border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="hidden md:flex gap-10 text-xs font-bold text-gray-400 uppercase tracking-widest">
           <Link href="/" className="hover:text-white transition-colors">Home</Link>
           <Link href="/races" className="hover:text-white transition-colors">Races</Link>
           <Link href="/drivers" className="hover:text-white transition-colors">Drivers</Link>
           <Link href="/teams" className="hover:text-white transition-colors">Teams</Link>
           <Link href="/results" className="hover:text-white transition-colors">Results</Link>
           <Link href="/about" className="hover:text-white transition-colors">About</Link>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-12 mb-16 relative z-10">
         
         <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Card 1: Circuit Info */}
            <div className="col-span-1 border border-white/5 rounded-2xl bg-[#121212] p-6 shadow-2xl flex flex-col gap-6 relative overflow-hidden transition-all duration-300 hover:border-white/20">
              <div className="flex justify-between items-center">
                 <h3 className="text-white text-md uppercase font-black tracking-widest">
                   {raceData.isCancelled ? "Event Cancelled" : "Circuit Specifications"}
                 </h3>
                 <span className="bg-white/10 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Round {params.round}</span>
              </div>
              <CircuitInfo circuit={raceData} />
            </div>

            {/* Card 2: Telemetry */}
            <div className="col-span-1 lg:col-span-2 border border-white/5 rounded-2xl bg-[#121212] p-6 shadow-2xl flex flex-col gap-6 relative overflow-hidden transition-all duration-300 hover:border-white/20">
              <div className="flex justify-between items-center z-10">
                 <h3 className="text-white text-md uppercase font-black tracking-widest">
                   {raceData.isCancelled ? "Event Cancelled" : (raceData.isOver ? "Live Telemetry" : "Predicted Telemetry")}
                 </h3>
                 <span className="bg-[#FF1E1E]/20 text-[#FF1E1E] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(255,30,30,0.4)]">HighCharts</span>
              </div>
              {raceData.isCancelled ? (
                 <div className="w-full flex-1 flex items-center justify-center min-h-[300px] border border-white/5 rounded-xl bg-black/40">
                   <span className="text-gray-500 font-bold tracking-widest uppercase">No Telemetry Available</span>
                 </div>
              ) : (
                <TelemetryVisualizer drivers={raceData.telemetry} isPredicted={!raceData.isOver} />
              )}
            </div>

            {/* Card 3: Podium */}
            <div className="col-span-1 lg:col-span-3 border border-white/5 rounded-2xl bg-[#121212] p-8 shadow-2xl mt-4 relative overflow-hidden transition-all duration-300 hover:border-white/20">
              <h3 className="text-white text-xl uppercase font-black tracking-widest border-b border-white/10 pb-4 mb-2 relative z-10">
                {raceData.isCancelled ? "Calculated Podium (N/A)" : (raceData.isOver ? "Actual Podium Results" : "Predicted Podium Outlook")}
              </h3>
              {!raceData.isCancelled ? (
                 <PodiumSection first={raceData.podium[0]} second={raceData.podium[1]} third={raceData.podium[2]} />
              ) : (
                 <div className="w-full flex-1 flex items-center justify-center min-h-[200px]">
                   <span className="text-[#FF4444] font-bold tracking-widest uppercase text-xl text-center">RACE CANCELLED</span>
                 </div>
              )}
            </div>

         </div>
      </div>
    </main>
  );
}
