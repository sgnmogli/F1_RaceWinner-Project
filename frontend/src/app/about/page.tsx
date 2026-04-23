import Link from 'next/link';

export default function About() {
  return (
    <main className="min-h-screen bg-[#121212] p-4 md:p-8 lg:p-12 relative overflow-hidden isolate">
      <div className="relative w-full min-h-[calc(100vh-6rem)] border border-white/10 rounded-sm overflow-hidden bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px] p-12">
        
        <nav className="absolute top-0 left-0 w-full flex items-center justify-start px-12 py-8 z-50">
          <Link href="/" className="text-white hover:text-[#E10600] transition-colors text-xs font-bold uppercase tracking-widest">
            ← Back to Engine
          </Link>
        </nav>

        <div className="absolute top-0 right-[25%] w-[1px] h-full bg-[#E10600] z-0 shadow-[0_0_20px_#E10600]" />

        <div className="relative z-10 max-w-3xl mt-24">
          <h1 className="text-5xl md:text-7xl font-black italic text-white tracking-tighter mb-8 uppercase">
            About <br/> <span className="text-[#E10600]">The Project</span>
          </h1>
          
          <div className="space-y-6 text-[#A0A0A0] text-lg font-medium leading-relaxed border-l-[3px] border-[#E10600] pl-8">
            <p>
              The F1 Prediction Engine is a full-stack Machine Learning application designed to forecast exact racing podium times and circuit performance.
            </p>
            <p>
              By heavily analyzing historical telemetry grids, driver qualification deltas, compound degradation rates, and weather models, the backend neural networks simulate lap-by-lap race construction.
            </p>
            <p>
              We process millions of granular data points from officially documented track topologies and match them against vehicle performance envelopes to predict real-world Formula 1 results before the lights go out.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
