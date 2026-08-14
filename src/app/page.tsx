// app/page.tsx
import Card from "./components/Card";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center px-6 py-12 md:px-12">
      {/* Fondo degradado - Asegúrate de que esté DETRÁS del contenido */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 -z-10" />
      
      {/* Elementos decorativos de fondo - También DETRÁS */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-60 -right-60 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[100px]" />
        <div className="absolute -bottom-60 -left-60 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-pink-500/10 blur-[100px]" />
      </div>

      {/* El contenido - Asegúrate de que esté ENCIMA */}
      <div className="relative z-10 w-full">
        <Card />
      </div>
    </div>
  );
}