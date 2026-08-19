// components/ChatSection.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ChatSection() {
  const [isTyping, setIsTyping] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleStartDiagnostic = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setShowCode(true);
    }, 2000);
  };

  return (
    <section className="min-h-screen flex items-center px-6 py-20 md:px-12 bg-slate-900">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-60 -right-60 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute -bottom-60 -left-60 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="mx-auto w-full max-w-4xl">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-6 w-[2px] bg-white/40" />
            <span className="text-xs font-light tracking-[0.2em] text-white/40 uppercase">
              Asistente IA
            </span>
          </div>
          
          <h2 className="text-3xl font-light text-white md:text-4xl lg:text-5xl">
            Chatbot AI NORTH
          </h2>
          <p className="mt-2 text-sm text-white/40">
            Disponible para iniciar conversación
          </p>
        </motion.div>

        {/* Chat Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8"
        >
          {/* Mensaje del bot */}
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-xs font-medium text-indigo-300">
              AI
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">NORTH Assistant</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Hola, soy el asistente de NORTH OLLIN. Puedo ayudarte a identificar 
                dónde aplicar IA en tu empresa.
              </p>
            </div>
          </div>

          {/* Mensaje del usuario (opcional) */}
          <div className="mt-6 flex items-start gap-4">
            <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white/50">
              U
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white/50">Tú</p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Quiero automatizar ventas, soporte y reportes.
              </p>
            </div>
          </div>

          {/* Input / Acción */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-6 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
          >
            <span className="text-xs text-white/30">✎</span>
            <span className="flex-1 text-sm text-white/40">
              {isTyping ? "Escribiendo..." : "Escribe: Iniciar diagnóstico AI..."}
            </span>
            <button
              onClick={handleStartDiagnostic}
              className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white/60 transition-all hover:bg-white/20 hover:text-white"
            >
              Enviar
            </button>
          </motion.div>

          {/* Código que aparece después del diagnóstico */}
          {showCode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-6 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4 font-mono text-xs"
            >
              <div className="flex items-center gap-2 text-indigo-300/60">
                <span className="text-indigo-300/40">$</span>
                <span>north_ollin.agent</span>
              </div>
              <div className="mt-3 space-y-1.5 text-white/50">
                <div>
                  <span className="text-indigo-300/50">const</span>
                  <span className="text-white/70"> northollin </span>
                  <span className="text-indigo-300/50">=</span>
                  <span className="text-white/70"> intelligence</span>
                  <span className="text-indigo-300/50">({"{"}</span>
                </div>
                <div className="pl-4">
                  <span className="text-white/40">contexto:</span>
                  <span className="text-emerald-300/60"> "operación + datos + equipo"</span>
                  <span className="text-white/40">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-white/40">acciones:</span>
                  <span className="text-emerald-300/60"> ["automatizar", "responder", "decidir"]</span>
                  <span className="text-white/40">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-white/40">output:</span>
                  <span className="text-emerald-300/60"> "claridad medible"</span>
                </div>
                <div>
                  <span className="text-indigo-300/50">{"}"}</span>
                  <span className="text-white/40">;</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-white/30">
                <span className="text-emerald-300/40">◆</span>
                <span>diagnóstico en progreso...</span>
                <span className="ml-1 inline-block h-3 w-[2px] bg-emerald-300/40 animate-pulse" />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Línea decorativa */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: 120 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 h-[2px] bg-gradient-to-r from-white/40 to-transparent"
        />
      </div>
    </section>
  );
}