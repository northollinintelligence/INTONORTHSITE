// components/ServicesSection.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const services = [
    {
      title: "Estrategia de IA",
      description: "Mapeamos oportunidades, priorizamos impacto y definimos una hoja de ruta clara para alcanzar el objetivo."
    },
    {
      title: "Automatización operativa",
      description: "Diseñamos flujos que reducen áreas repetitivas, conectan herramientas y mantienen control humano."
    },
    {
      title: "Chatbots inteligentes",
      description: "Creamos asistentes para atención, ventas y conocimiento interno con tono, contexto y objetivos claros."
    }
  ];

  return (
    <section ref={ref} className="min-h-screen flex items-center px-6 py-20 md:px-12">
      <div className="mx-auto w-full max-w-5xl">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-6 w-[2px] bg-white/40" />
            <span className="text-xs font-light tracking-[0.2em] text-white/40 uppercase">
              Lo que hacemos
            </span>
          </div>
          
          <h2 className="text-4xl font-light leading-tight text-white md:text-5xl lg:text-6xl">
            Inteligencia que entiende
            <br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70">
              operación, estrategia y crecimiento.
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            Creamos soluciones que conectan datos, personas y procesos para tomar mejores decisiones 
            sin aumentar la complejidad del equipo.
          </p>
        </motion.div>

        {/* Servicios */}
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              {/* Línea decorativa */}
              <div className="mb-4 h-[2px] w-12 bg-white/20 transition-all duration-300 group-hover:w-16 group-hover:bg-white/60" />
              
              <h3 className="mb-3 text-lg font-medium text-white">
                {service.title}
              </h3>
              
              <p className="text-sm leading-relaxed text-white/50">
                {service.description}
              </p>

              {/* Efecto hover */}
              <div className="absolute -inset-4 -z-10 rounded-2xl bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        {/* Línea decorativa inferior */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={isInView ? { opacity: 1, width: 120 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 h-[2px] bg-gradient-to-r from-white/40 to-transparent"
        />
      </div>
    </section>
  );
}