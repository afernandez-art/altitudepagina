import { motion } from "framer-motion";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row border-t border-zinc-900" id="contacto">
      {/* Left side - Blue */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:w-1/2 bg-primary p-12 md:p-24 flex flex-col justify-center relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-primary-foreground tracking-tighter leading-[0.9] mb-12">
            Escalá tu comercio exterior hoy.
          </h2>
          
          <div className="space-y-8 text-primary-foreground/90">
            <p className="text-xl md:text-2xl font-medium">
              Agendá una llamada de 15 minutos para diagnosticar tus flujos internacionales.
            </p>
            
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex items-center gap-4">
                <span className="p-3 bg-primary-foreground/10 rounded-full">
                  <Phone className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary-foreground/60">Atención Directa</p>
                  <p className="font-bold text-xl">+54 11 5555 0123</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="p-3 bg-primary-foreground/10 rounded-full">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary-foreground/60">Email Corporativo</p>
                  <p className="font-bold text-xl">vsl@altitude.com.ar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative blur */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
      </motion.div>
      
      {/* Right side - White form */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:w-1/2 bg-foreground p-12 md:p-24 flex flex-col justify-center"
      >
        <div className="max-w-md mx-auto w-full">
          <div className="mb-12">
            <h3 className="text-3xl font-black text-background tracking-tight">Solicitar Diagnóstico</h3>
            <p className="text-zinc-500 mt-2">Completa tus datos y nos pondremos en contacto en menos de 2 horas hábiles.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Nombre Completo</label>
              <input 
                type="text"
                placeholder="Juan Pérez"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-0 border-b-2 border-zinc-200 focus:border-primary focus:ring-0 py-3 text-lg text-background placeholder:text-zinc-300 transition-all outline-none bg-transparent"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Email Corporativo</label>
              <input 
                type="email"
                placeholder="juan@empresa.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-0 border-b-2 border-zinc-200 focus:border-primary focus:ring-0 py-3 text-lg text-background placeholder:text-zinc-300 transition-all outline-none bg-transparent"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">WhatsApp / Teléfono</label>
              <input 
                type="tel"
                placeholder="+54 9 11 ..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border-0 border-b-2 border-zinc-200 focus:border-primary focus:ring-0 py-3 text-lg text-background placeholder:text-zinc-300 transition-all outline-none bg-transparent"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Motivo de la llamada</label>
              <textarea 
                placeholder="Ej: Reducción de costos en flete aéreo desde Europa"
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border-0 border-b-2 border-zinc-200 focus:border-primary focus:ring-0 py-3 text-lg text-background placeholder:text-zinc-300 transition-all outline-none bg-transparent resize-none"
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-primary text-primary-foreground px-8 py-5 rounded-xl text-lg font-bold hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-2"
            >
              Agendar Diagnóstico <ArrowRight className="w-5 h-5" />
            </button>
            
            <p className="text-center text-xs text-zinc-400 italic">
              No compartiremos sus datos con terceros. Política de privacidad garantizada.
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  );
};
