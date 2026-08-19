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
    }, 1800);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pt-16 md:pt-20 lg:pt-24">
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

      {/* Descripción */}
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

      {/* Código con animación de escritura */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="mt-8 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 w-fit backdrop-blur-sm hover:border-white/20 transition-colors"
      >
        <span className="text-xs font-mono text-white/30">$</span>
        <span className="text-xs font-mono text-white/50">
          {displayText || fullCode}
        </span>
        {!isTypingComplete && displayText && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="ml-0.5 h-4 w-[2px] bg-white/40"
          />
        )}
        {isTypingComplete && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="ml-0.5 h-4 w-[2px] bg-white/30"
          />
        )}
      </motion.div>

      {/* Botón */}
      <motion.button
        onClick={scrollToContact}
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
      <div className="absolute top-32 right-16 hidden lg:block">
        <div className="flex flex-col items-end gap-2 text-right">
          <span className="text-[10px] font-light tracking-[0.3em] text-white/15 uppercase">
            Innovación
          </span>
          <div className="h-px w-8 bg-white/10" />
          <span className="text-[10px] font-light tracking-[0.3em] text-white/15 uppercase">
            Transformación
          </span>
          <div className="h-px w-8 bg-white/10" />
          <span className="text-[10px] font-light tracking-[0.3em] text-white/15 uppercase">
            Escalabilidad
          </span>
        </div>
      </div>
    </div>
  );
}