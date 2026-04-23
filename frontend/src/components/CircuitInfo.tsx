import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface CircuitProps {
  name: string;
  location: string;
  lengthKm: number;
  fastestLap?: string;
  weather?: string;
}

export function CircuitInfo({ circuit }: { circuit: CircuitProps }) {
  return (
    <Card className="bg-[#121212] border border-white/10 rounded-xl shadow-none w-full relative overflow-hidden flex-1 h-full flex flex-col">
      <CardHeader className="pb-4 py-6 border-b border-white/10 bg-white/5">
        <div className="flex flex-col justify-center items-start gap-4">
          <Badge className="bg-[#FF1E1E] text-white rounded-md px-4 py-1.5 tracking-widest uppercase text-[10px] font-black border-none shadow-md">
            LOCATION: {circuit.location}
          </Badge>
          <CardTitle className="text-xl uppercase tracking-tighter font-black text-white">{circuit.name}</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 pb-6 flex-1">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Track Length</span>
            <span className="font-mono text-xl font-black text-white">{circuit.lengthKm} <span className="text-xs text-[#FF1E1E] ml-1">km</span></span>
          </div>
          
          {circuit.fastestLap && (
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Fastest Lap</span>
              <span className="font-mono text-xl font-black text-[#00D2BE] drop-shadow-[0_0_5px_rgba(0,210,190,0.5)]">{circuit.fastestLap}</span>
            </div>
          )}

          {circuit.weather && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Weather</span>
              <span className="font-mono text-lg font-black text-white">{circuit.weather}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
