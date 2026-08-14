// app/page.tsx
"use client";

import Card from "./components/Card";
import ServicesSection from "./components/ServicesSection";
import ChatSection from "./components/ChatSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      {/* Primera sección - Hero */}
      <section className="relative flex min-h-screen items-center px-6 py-12 md:px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 -z-10" />
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-60 -right-60 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[100px]" />
          <div className="absolute -bottom-60 -left-60 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-pink-500/10 blur-[100px]" />
        </div>
        <div className="relative z-10 w-full">
          <Card />
        </div>
      </section>

      {/* Segunda sección - Servicios */}
      <section className="relative bg-slate-900">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-60 -right-60 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[100px]" />
          <div className="absolute -bottom-60 -left-60 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px]" />
        </div>
        <ServicesSection />
      </section>

      {/* Tercera sección - Chat */}
      <section id="chat" className="relative">
        <ChatSection />
      </section>

      {/* Cuarta sección - Contacto + Footer */}
      <ContactSection />
    </>
  );
}