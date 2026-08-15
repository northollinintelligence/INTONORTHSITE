// components/ContactSection.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", formData);
    alert("¡Mensaje enviado! Te contactaremos pronto.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="min-h-screen flex items-center px-6 py-20 md:px-12 bg-slate-900">
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
              Contacto
            </span>
          </div>
          
          <h2 className="text-3xl font-light text-white md:text-4xl lg:text-5xl">
            Iniciemos un diagnóstico de IA
            <br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70">
              para tu empresa.
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            Cuéntanos qué proceso quieres mejorar. Te responderemos con una primera ruta de 
            oportunidades, automatización y asistentes inteligentes.
          </p>

          {/* Contacto directo */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/40">
            <span className="flex items-center gap-2">
              <span className="text-white/20">✉</span>
              northollinintelligence@gmail.com
            </span>
            <span className="hidden text-white/10 md:inline">|</span>
            <span className="flex items-center gap-2">
              <span className="text-white/20">@</span>
              Instagram - @northollin
            </span>
          </div>
        </motion.div>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo: Nombre */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/30">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
                className="w-full border-b border-white/10 bg-transparent px-0 py-2 text-sm text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors"
              />
            </div>

            {/* Campo: Email */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/30">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
                className="w-full border-b border-white/10 bg-transparent px-0 py-2 text-sm text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors"
              />
            </div>

            {/* Campo: Mensaje */}
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/30">
                Mensaje
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Cuéntanos qué quieres automatizar..."
                rows={3}
                required
                className="w-full border-b border-white/10 bg-transparent px-0 py-2 text-sm text-white placeholder:text-white/20 focus:border-white/40 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Botón */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 rounded-full bg-white px-8 py-3 text-sm font-medium text-indigo-900 transition-all hover:shadow-xl hover:shadow-white/10"
            >
              Enviar mensaje
            </motion.button>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/5"
        >
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div>
              <p className="text-xs font-light tracking-[0.2em] text-white/30 uppercase">
                North Ollin
              </p>
              <p className="mt-1 text-xs text-white/20">
                IA, automatización y claridad operativa.
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-xs text-white/20">
              <span>2026</span>
              <span className="text-white/10">|</span>
              <span>Todos los derechos reservados</span>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}