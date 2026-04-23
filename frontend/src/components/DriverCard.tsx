import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface DriverProps {
  name: string;
  code: string;
  team: string;
  headshotUrl?: string;
  teamColor?: string;
}

export function DriverCard({ driver }: { driver: DriverProps }) {
  return (
    <Card 
      className="flex flex-col items-center p-6 border border-white/5 overflow-hidden relative bg-[#121212] rounded-xl shadow-lg transition-all" 
      style={{ 
        borderTopColor: driver.teamColor || "red", borderTopWidth: "4px",
        background: driver.teamColor ? `linear-gradient(180deg, ${driver.teamColor}25 0%, #121212 100%)` : '#121212'
      }}
    >
      <div 
        className="absolute inset-0 w-full h-full blur-[70px] opacity-20 -z-10" 
        style={{ backgroundColor: driver.teamColor || "red" }} 
      />
      
      <Avatar className="h-28 w-28 mb-4 border-[2px] shadow-lg bg-black" style={{ borderColor: driver.teamColor || "gray" }}>
        <AvatarImage src={driver.headshotUrl} alt={driver.name} className="object-cover" />
        <AvatarFallback className="text-xl font-bold uppercase text-white">{driver.code}</AvatarFallback>
      </Avatar>
      
      <h3 className="font-black text-xl uppercase tracking-tighter text-white mt-2">{driver.name}</h3>
      <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">{driver.team}</p>
      
      <Badge variant="secondary" className="absolute top-3 right-3 rounded-md text-[10px] tracking-widest bg-black/40 text-white border border-white/10 px-2 py-0.5">
        {driver.code}
      </Badge>
    </Card>
  );
}
