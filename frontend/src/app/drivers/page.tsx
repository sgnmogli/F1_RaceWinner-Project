"use client";

import Link from 'next/link';

const DRIVERS = [
  { first: "Alexander", last: "ALBON", team: "Williams", color: "#005AFF", image: "https://www.formula1.com/content/dam/fom-website/drivers/A/ALEALB01_Alexander_Albon/alealb01.png.transform/2col/image.png" },
  { first: "Fernando", last: "ALONSO", team: "Aston Martin", color: "#006F62", image: "https://www.formula1.com/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col/image.png" },
  { first: "Kimi", last: "ANTONELLI", team: "Mercedes", color: "#00D2BE", image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ANDANT01_Andrea%20Kimi_Antonelli/andant01.png.transform/2col/image.png" },
  { first: "Oliver", last: "BEARMAN", team: "Haas F1 Team", color: "#B6BABD", image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OLIBEA01_Oliver_Bearman/olibea01.png.transform/2col/image.png" },
  { first: "Gabriel", last: "BORTOLETO", team: "Audi", color: "#F30A2B", image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GABBOR01_Gabriel_Bortoleto/gabbor01.png.transform/2col/image.png" },
  { first: "Valtteri", last: "BOTTAS", team: "Cadillac", color: "#8A8D8F", image: "https://www.formula1.com/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png.transform/2col/image.png" },
  { first: "Franco", last: "COLAPINTO", team: "Alpine", color: "#FF87BC", image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FRACOL01_Franco_Colapinto/fracol01.png.transform/2col/image.png" },
  { first: "Pierre", last: "GASLY", team: "Alpine", color: "#FF87BC", image: "https://www.formula1.com/content/dam/fom-website/drivers/P/PIEGAS01_Pierre_Gasly/piegas01.png.transform/2col/image.png" },
  { first: "Isack", last: "HADJAR", team: "Red Bull Racing", color: "#3671C6", image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/I/ISAHAD01_Isack_Hadjar/isahad01.png.transform/2col/image.png" },
  { first: "Lewis", last: "HAMILTON", team: "Ferrari", color: "#E10600", image: "https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png" },
  { first: "Nico", last: "HULKENBERG", team: "Audi", color: "#F30A2B", image: "https://www.formula1.com/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png.transform/2col/image.png" },
  { first: "Liam", last: "LAWSON", team: "Racing Bulls", color: "#1534CC", image: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png.transform/2col/image.png" },
  { first: "Charles", last: "LECLERC", team: "Ferrari", color: "#E10600", image: "https://www.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png" },
  { first: "Arvid", last: "LINDBLAD", team: "Racing Bulls", color: "#1534CC", image: "https://media.formula1.com/image/upload/c_fill,w_720/q_auto/v1740000001/common/f1/2026/racingbulls/arvlin01/2026racingbullsarvlin01right.webp", customClass: "h-full w-full object-cover object-top absolute top-0 right-0 drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-110" },
  { first: "Lando", last: "NORRIS", team: "McLaren", color: "#FF8000", image: "https://www.formula1.com/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col/image.png" },
  { first: "Esteban", last: "OCON", team: "Haas F1 Team", color: "#B6BABD", image: "https://www.formula1.com/content/dam/fom-website/drivers/E/ESTOCO01_Esteban_Ocon/estoco01.png.transform/2col/image.png" },
  { first: "Sergio", last: "PEREZ", team: "Cadillac", color: "#8A8D8F", image: "https://www.formula1.com/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/2col/image.png" },
  { first: "Oscar", last: "PIASTRI", team: "McLaren", color: "#FF8000", image: "https://www.formula1.com/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col/image.png" },
  { first: "George", last: "RUSSELL", team: "Mercedes", color: "#00D2BE", image: "https://www.formula1.com/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col/image.png" },
  { first: "Carlos", last: "SAINZ", team: "Williams", color: "#005AFF", image: "https://www.formula1.com/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col/image.png" },
  { first: "Lance", last: "STROLL", team: "Aston Martin", color: "#006F62", image: "https://www.formula1.com/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/2col/image.png" },
  { first: "Max", last: "VERSTAPPEN", team: "Red Bull Racing", color: "#3671C6", image: "https://www.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png" },
];

export default function DriversPage() {
  return (
    <main className="min-h-screen bg-black pb-24 overflow-hidden relative isolate font-sans text-white">
      
      {/* Decorative background slice */}
      <div className="absolute top-0 right-0 w-[40%] h-[30vh] bg-gradient-to-bl from-[#2A2A2A] to-transparent opacity-20 -z-10 blur-[80px]" />

      <nav className="w-full flex justify-end items-center py-8 px-8 md:px-12 lg:px-16 z-50 relative border-b border-white/5 bg-black/80 backdrop-blur-md">
        <div className="hidden md:flex gap-10 text-xs font-bold text-[#A0A0A0] uppercase tracking-widest">
           <Link href="/" className="hover:text-white transition-colors">Home</Link>
           <Link href="/races" className="hover:text-white transition-colors">Races</Link>
           <Link href="/drivers" className="text-white">Drivers</Link>
           <Link href="/teams" className="hover:text-white transition-colors">Teams</Link>
           <Link href="/results" className="hover:text-white transition-colors">Results</Link>
           <Link href="/about" className="hover:text-white transition-colors">About</Link>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-16 relative z-10">
        
        {/* Title Section */}
        <div className="mb-12 border-l-[3px] border-white pl-6">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-2">2026 Drivers</h1>
          <p className="text-[#A0A0A0] font-medium tracking-wide uppercase text-sm">The 22 elite racers lining up on the grid this season</p>
        </div>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {DRIVERS.map((driver, idx) => {
            const initials = `${driver.first.charAt(0)}${driver.last.charAt(0)}`;

            return (
              <div 
                key={idx} 
                className="group relative h-[140px] border border-white/10 rounded-xl overflow-hidden bg-[#121212] transition-all hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.8)] cursor-pointer"
              >
                {/* Dynamic Background Glow representing team color */}
                <div 
                  className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-30 mix-blend-screen" 
                  style={{ background: `linear-gradient(135deg, transparent 40%, ${driver.color} 100%)` }}
                />

                <div className="absolute top-0 right-0 w-full h-[4px]" style={{ backgroundColor: driver.color }} />

                <div className="flex items-center justify-between h-full px-6 z-10 relative">
                  {/* Driver Info */}
                  <div className="flex flex-col z-20 w-[60%]">
                    <span className="text-sm font-bold text-gray-400 capitalize">{driver.first}</span>
                    <span className="text-3xl font-black uppercase tracking-tighter leading-none mb-1 drop-shadow-md">{driver.last}</span>
                    <span className="text-xs font-bold tracking-widest uppercase mt-2 opacity-90" style={{ color: driver.color }}>{driver.team}</span>
                  </div>

                  {/* Driver Headshot Cut-out */}
                  <div className="absolute bottom-0 right-0 w-[45%] h-full z-10 pointer-events-none flex justify-end items-end">
                     {/* Number Accent Background */}
                     <div className="absolute right-4 top-4 text-7xl font-black italic opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.08]" style={{ color: driver.color, WebkitTextStroke: `1px ${driver.color}` }}>
                       {initials}
                     </div>
                     <img 
                       src={driver.image} 
                       alt={driver.last} 
                       onError={(e) => { e.currentTarget.src = '/driver.png'; }}
                       className={driver.customClass || `h-[120%] w-auto object-contain ${driver.positionClass || 'object-right-bottom'} absolute bottom-0 right-[-10px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-110 group-hover:translate-x-[-10px]`} 
                     />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
