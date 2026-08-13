// components/Card.tsx
export default function Card() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 text-left">
      {/* Marca / Logo */}
      <div className="mb-6 text-xs font-medium tracking-wider text-white/50">
        NORTH OLLIN
      </div>

      {/* Título principal */}
      <div className="relative">
        <div className="absolute -left-6 top-0 h-14 w-0.5 bg-white/30" />
        <h1 className="text-4xl font-light leading-tight tracking-tight text-white md:text-5xl">
          INTELIGENCIA
          <br />
          <span className="font-medium">NATIVA</span>
          <br />
          <span className="font-medium">PARA EMPRESAS</span>
        </h1>
      </div>

      {/* Subtítulo */}
      <p className="mt-4 text-base font-light text-white/80 md:text-lg">
        Bosque, datos y decisiones en una sola inteligencia.
      </p>

      {/* Descripción */}
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
        NORTH OLLIN diseña sistemas de IA, automatización y asistentes inteligentes 
        para convertir procesos complejos en operaciones claras, medibles y listas 
        para escalar.
      </p>

      {/* Terminal / Línea de código con fondo */}
      <div className="mt-4 rounded-md bg-black/30 px-3 py-2 font-mono text-xs text-white/50 backdrop-blur-sm w-fit">
        <span className="text-white/30">&gt;</span>
        <span className="text-white/40">north.ai.run</span>
        <span className="text-white/30">(</span>
        <span className="text-green-300/60">&quot;diagnóstico&quot;</span>
        <span className="text-white/30">)</span>
      </div>

      {/* Botón de acción */}
      <button className="group mt-5 flex items-center gap-2 rounded-full border border-white/20 px-5 py-1.5 text-xs font-medium text-white transition-all hover:bg-white hover:text-indigo-900">
        Iniciar contacto
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </button>
    </div>
  );
}