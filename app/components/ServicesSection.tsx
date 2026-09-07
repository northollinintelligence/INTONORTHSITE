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
      description: "Mapeamos oportunidades, priorizamos impacto y definimos una hoja de ruta clara para alcanzar el objetivo final."
    },
    {
      title: "Automatización operativa",
      description: "Diseñamos flujos que reducen horas de trabajo repetitivas, conectan más clientes y mantienen control humano."
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
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-5 w-[2px] bg-white/30" />
            <span className="text-[10px] font-light tracking-[0.25em] text-white/40 uppercase">
              LO QUE HACE NORTH OLLIN
            </span>
          </div>
          
          <h2 className="text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl">
            Inteligencia que entiende
            <br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70">
              operación, estrategia y crecimiento.
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50 md:text-base">
            Creamos soluciones que conectan datos, personas y procesos para tomar mejores decisiones 
            sin aumentar la complejidad del equipo.
          </p>
        </motion.div>

        {/* Servicios - Cards con glassmorphism */}
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              {/* Card con glassmorphism */}
              <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:shadow-indigo-500/5">
                {/* Efecto de difuminado de fondo */}
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Línea decorativa superior */}
                <div className="mb-4 h-[2px] w-10 bg-white/20 transition-all duration-300 group-hover:w-14 group-hover:bg-white/50" />
                
                {/* Título con número */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-medium text-white md:text-lg">
                    {service.title}
                  </h3>
                  <span className="text-xs font-light text-white/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                
                {/* Descripción */}
                <p className="text-sm leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/60">
                  {service.description}
                </p>

                {/* Línea decorativa inferior (hover) */}
                <div className="absolute bottom-4 right-6 h-[1px] w-0 bg-gradient-to-l from-white/20 to-transparent transition-all duration-500 group-hover:w-12" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Línea decorativa inferior con separador */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-14 flex items-center gap-6"
        >
          <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          <span className="text-[10px] font-light tracking-[0.3em] text-white/20 uppercase">
            Innovación continua
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-white/10 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}