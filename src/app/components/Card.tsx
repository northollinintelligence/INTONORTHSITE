// components/Card.tsx - VERSIÓN ULTRA SIMPLE
"use client";

import { motion } from "framer-motion";

export default function Card() {
  // ¡Sin efectos, sin estados complicados, solo el texto fijo!
  
  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-20 flex items-center gap-4"
      >
        <div className="h-6 w-[2px] bg-white/40" />
        <span className="text-xs font-light tracking-[0.2em] text-white/50 uppercase">
          North Ollin
        </span>
      </motion.div>

      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-1"
      >
        <h1 className="text-5xl font-light leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
          <span className="block">Inteligencia</span>
          <span className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70">
            Nativa
          </span>
          <span className="block text-4xl font-light text-white/50 md:text-5xl lg:text-6xl">
            para empresas
          </span>
        </h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-[2px] bg-gradient-to-r from-white/40 to-transparent"
        />
      </motion.div>

      {/* Descripción - SIN EFECTO DE ESCRITURA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-8 max-w-xl"
      >
        <p className="text-lg font-light leading-relaxed text-white/80 md:text-xl">
          Transformamos procesos complejos en operaciones claras, medibles y listas para escalar.
        </p>
      </motion.div>

      {/* Segunda línea */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 md:text-base"
      >
        Diseñamos sistemas de IA, automatización y asistentes inteligentes para potenciar tu negocio.
      </motion.p>

      {/* Código */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="mt-8 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 w-fit backdrop-blur-sm"
      >
        <span className="text-xs font-mono text-white/30">$</span>
        <span className="text-xs font-mono text-white/50">north.ai.run</span>
        <span className="text-xs font-mono text-white/30">(</span>
        <span className="text-xs font-mono text-emerald-300/70">&quot;diagnóstico&quot;</span>
        <span className="text-xs font-mono text-white/30">)</span>
      </motion.div>

      {/* Botón */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-3 text-sm font-medium text-indigo-900 transition-all hover:shadow-xl hover:shadow-white/10"
      >
        <span>Iniciar contacto</span>
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-lg"
        >
          →
        </motion.span>
      </motion.button>

      {/* Elementos decorativos */}
      <div className="absolute top-20 right-20 hidden lg:block">
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-[10px] font-light tracking-[0.3em] text-white/20 uppercase">
            Innovación
          </span>
          <span className="text-[10px] font-light tracking-[0.3em] text-white/20 uppercase">
            Transformación
          </span>
        </div>
      </div>
    </div>
  );
}