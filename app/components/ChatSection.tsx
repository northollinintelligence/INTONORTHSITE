// components/ChatSection.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ChatSection() {
  const [isTyping, setIsTyping] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const fullCode = 'north_ollin.agent';

  // Animación de escritura para el código
  useEffect(() => {
    if (showCode) {
      let currentIndex = 0;
      let timeoutId: NodeJS.Timeout;

      const typeText = () => {
        if (currentIndex <= fullCode.length) {
          setDisplayText(fullCode.slice(0, currentIndex));
          currentIndex++;
          timeoutId = setTimeout(typeText, 80);
        } else {
          setIsTypingComplete(true);
        }
      };

      const startDelay = setTimeout(() => {
        typeText();
      }, 300);

      return () => {
        clearTimeout(startDelay);
        clearTimeout(timeoutId);
      };
    }
  }, [showCode]);

  const handleStartDiagnostic = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setShowCode(true);
    }, 1500);
  };

  return (
    <section className="min-h-screen flex items-center px-6 py-20 md:px-12 bg-slate-900">
      {/* Fondo con difuminado mejorado */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-60 -right-60 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute -bottom-60 -left-60 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-pink-500/5 blur-[100px]" />
        <div className="absolute top-1/4 right-1/4 h-[200px] w-[200px] rounded-full bg-cyan-500/5 blur-[80px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        {/* Encabezado mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-6 w-[2px] bg-gradient-to-b from-indigo-400 to-purple-400" />
            <span className="text-[10px] font-medium tracking-[0.25em] text-white/40 uppercase">
              Asistente IA
            </span>
          </div>
          
          <h2 className="text-4xl font-light text-white md:text-5xl lg:text-6xl">
            Chatbot AI NORTH
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <p className="text-sm text-white/40">
              Disponible para iniciar conversación
            </p>
          </div>
        </motion.div>

        {/* Layout de dos columnas mejorado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna izquierda - Chat mejorado */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl p-6 md:p-8 shadow-2xl hover:border-white/20 transition-all duration-300"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-xl -z-10" />
            
            {/* Badge decorativo */}
            <div className="absolute top-4 right-4">
              <span className="text-[8px] font-medium tracking-[0.2em] text-white/20 uppercase">
                Chat en vivo
              </span>
            </div>

            <div className="relative z-10 space-y-6">
              {/* Mensaje del bot con diseño mejorado */}
              <div className="flex items-start gap-4 group">
                <div className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 text-xs font-medium text-indigo-300 border border-indigo-500/20 backdrop-blur-sm">
                  AI
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-white">NORTH Assistant</p>
                    <span className="text-[8px] text-white/20">•</span>
                    <span className="text-[8px] text-white/20">ahora</span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/70">
                    Hola, soy el asistente de NORTH OLLIN. Puedo ayudarte a identificar 
                    dónde aplicar IA en tu empresa.
                  </p>
                </div>
              </div>

              {/* Mensaje del usuario con diseño mejorado */}
              <div className="flex items-start gap-4 group">
                <div className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/5 text-xs font-medium text-white/50 border border-white/10 backdrop-blur-sm">
                  U
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-white/50">Tú</p>
                    <span className="text-[8px] text-white/20">•</span>
                    <span className="text-[8px] text-white/20">hace 2 min</span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/60">
                    Quiero automatizar ventas, soporte y reportes.
                  </p>
                </div>
              </div>

              {/* Input mejorado */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm hover:border-white/20 transition-all duration-300 focus-within:border-indigo-500/30"
              >
                <span className="text-xs text-white/30">✎</span>
                <span className="flex-1 text-sm text-white/40">
                  {isTyping ? (
                    <span className="flex items-center gap-2">
                      <span>Escribiendo</span>
                      <span className="flex gap-1">
                        <span className="h-1 w-1 animate-bounce rounded-full bg-white/20" style={{ animationDelay: '0s' }} />
                        <span className="h-1 w-1 animate-bounce rounded-full bg-white/20" style={{ animationDelay: '0.2s' }} />
                        <span className="h-1 w-1 animate-bounce rounded-full bg-white/20" style={{ animationDelay: '0.4s' }} />
                      </span>
                    </span>
                  ) : (
                    "Escribe: Iniciar diagnóstico AI..."
                  )}
                </span>
                <button
                  onClick={handleStartDiagnostic}
                  className="rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-4 py-1.5 text-xs font-medium text-white/70 transition-all hover:from-indigo-500/30 hover:to-purple-500/30 hover:text-white hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  Enviar
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Columna derecha - Código rediseñado */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl p-6 md:p-8 shadow-2xl hover:border-white/20 transition-all duration-300"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-xl -z-10" />

            <div className="relative z-10">
              {/* Header del código */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                  </div>
                  <span className="ml-2 text-[8px] font-medium text-white/20 uppercase tracking-wider">
                    Terminal
                  </span>
                </div>
                <span className="text-[8px] text-white/20">● active</span>
              </div>

              {/* Título del código mejorado */}
              <div className="flex items-center gap-2 text-indigo-300/60 mb-4 bg-indigo-500/5 rounded-lg px-3 py-2 border border-indigo-500/10">
                <span className="text-indigo-300/40">$</span>
                <span className="text-emerald-400/80 font-mono text-sm">
                  {displayText || fullCode}
                </span>
                {!isTypingComplete && displayText && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="ml-0.5 h-4 w-[2px] bg-emerald-400/60"
                  />
                )}
                {isTypingComplete && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-0.5 h-4 w-[2px] bg-emerald-400/40"
                  />
                )}
              </div>

              {/* Código con mejor diseño */}
              <div className="space-y-2 text-white/50 font-mono text-xs bg-black/20 rounded-lg p-4 border border-white/5">
                <div className="flex items-center gap-2 text-indigo-300/50">
                  <span className="text-white/30">1</span>
                  <span>const</span>
                  <span className="text-white/70"> northOllin </span>
                  <span>=</span>
                  <span className="text-white/70"> intelligence</span>
                  <span>({"{"}</span>
                </div>
                <div className="flex items-center gap-2 pl-8">
                  <span className="text-white/30">2</span>
                  <span className="text-white/40">context:</span>
                  <span className="text-emerald-300/60"> "operación + datos + equipo"</span>
                  <span className="text-white/40">,</span>
                </div>
                <div className="flex items-center gap-2 pl-8">
                  <span className="text-white/30">3</span>
                  <span className="text-white/40">acciones:</span>
                  <span className="text-emerald-300/60"> ["automatizar", "responder", "decidir"]</span>
                  <span className="text-white/40">,</span>
                </div>
                <div className="flex items-center gap-2 pl-8">
                  <span className="text-white/30">4</span>
                  <span className="text-white/40">output:</span>
                  <span className="text-emerald-300/60"> "claridad medible"</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/30">5</span>
                  <span className="text-indigo-300/50">{"}"}</span>
                  <span className="text-white/40">;</span>
                </div>
              </div>

              {/* Estado del diagnóstico mejorado */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-3 text-white/30">
                <span className="flex h-2 w-2">
                  <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-medium">diagnóstico en progreso...</span>
                <span className="ml-auto text-[8px] text-white/20">PID: 4231</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Línea decorativa inferior mejorada */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 flex items-center gap-6"
        >
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-light tracking-[0.3em] text-white/20 uppercase">
              IA conversacional
            </span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/10 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}