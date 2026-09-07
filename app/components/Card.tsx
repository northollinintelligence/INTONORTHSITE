// components/Card.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Card() {
  const scrollToContact = () => {
    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToChat = () => {
    const chat = document.getElementById("chat");
    if (chat) {
      chat.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Estado para la animación de escritura del código
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  const fullCode = 'north.ai.run("diagnóstico")';

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeText = () => {
      if (currentIndex <= fullCode.length) {
        setDisplayText(fullCode.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(typeText, 50);
      } else {
        setIsTypingComplete(true);
      }
    };

    const startDelay = setTimeout(() => {
      typeText();
    }, 1000);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl px-6 pt-16 md:pt-20 lg:pt-24">
      {/* Card con glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-10 lg:p-12 shadow-2xl"
      >
        {/* Efecto de difuminado de fondo */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-xl -z-10" />
        
        {/* Contenido del card */}
        <div className="relative z-10">
          {/* Header con NORTH OLLIN e Instagram */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-white/30">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 7.057a4.943 4.943 0 00-4.943 4.943 4.943 4.943 0 009.886 0A4.943 4.943 0 0012 7.057zm0 8.15a3.207 3.207 0 110-6.414 3.207 3.207 0 010 6.414zm6.147-8.03a1.156 1.156 0 10-2.312 0 1.156 1.156 0 002.312 0z"/>
                </svg>
                <span>Instagram</span>
              </div>
              
            </div>
          </div>

          {/* Badge - INTELIGENCIA NATIVA PARA EMPRESAS */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="text-[10px] font-medium tracking-[0.2em] text-white/50 uppercase">
              Inteligencia Nativa para empresas
            </span>
          </motion.div>

          {/* Título principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-1"
          >
            <h1 className="text-3xl font-light leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="block">Bosque, datos y</span>
              <span className="block font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                decisiones en una
              </span>
              <span className="block font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                sola inteligencia.
              </span>
            </h1>
          </motion.div>

          {/* Línea decorativa */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-4 h-[1px] bg-gradient-to-r from-white/30 to-transparent"
          />

          {/* Descripción */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 max-w-2xl"
          >
            <p className="text-xs leading-relaxed text-white/50 sm:text-sm md:text-base">
              NORTH OLLIN diseña sistemas de IA, automatización y asistentes inteligentes para
              convertir procesos complejos en operaciones claras, medibles y listas para escalar.
            </p>
          </motion.div>

          {/* Código con animación de escritura */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-6 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 w-fit backdrop-blur-sm"
          >
            <span className="text-xs font-mono text-white/30">$</span>
            <span className="text-xs font-mono text-emerald-400/80 sm:text-sm">
              {displayText}
            </span>
            {!isTypingComplete && displayText && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-0.5 h-3.5 w-[2px] bg-emerald-400/60"
              />
            )}
            {isTypingComplete && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-0.5 h-3.5 w-[2px] bg-emerald-400/40"
              />
            )}
          </motion.div>

          {/* Botones */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-medium text-slate-900 transition-all hover:shadow-xl hover:shadow-white/10 sm:px-6 sm:py-2.5"
            >
              <span>Iniciar contacto</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-sm"
              >
                →
              </motion.span>
            </motion.button>

            <motion.button
              onClick={scrollToChat}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/60 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 hover:text-white sm:px-5 sm:py-2.5"
            >
              <svg 
                className="h-3 w-3 text-emerald-400/60 group-hover:text-emerald-400 transition-colors sm:h-3.5 sm:w-3.5" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Ver AI chatbot</span>
            </motion.button>
          </motion.div>

          {/* Footer del card - system.north.ollin.si // escuchando */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between"
          >
            <span className="text-[10px] font-mono text-white/20">
              system.north.ollin.si // escuchando
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}