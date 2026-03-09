import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  PerfilType,
  LeadFormData,
  submitLead,
} from "@/contexts/LeadMagnetContext";

const Formulario = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const perfil = (searchParams.get("perfil") || "") as PerfilType;
  const necesidad = searchParams.get("necesidad") || "";
  const inversion = searchParams.get("inversion") || "";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    whatsapp: "",
    email: "",
    empresa: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim() || formData.nombre.trim().length < 2) {
      newErrors.nombre = "Ingresá tu nombre";
    }
    const phoneRegex = /^[\d\s\-+()]{8,}$/;
    if (!formData.whatsapp.trim() || !phoneRegex.test(formData.whatsapp)) {
      newErrors.whatsapp = "Ingresá un número válido";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const leadData: LeadFormData = { perfil, necesidad, inversion, ...formData };
    await submitLead(leadData);
    setIsSubmitting(false);

    // Navigate to whatsapp page with all data
    const params = new URLSearchParams();
    if (perfil) params.set("perfil", perfil);
    if (necesidad) params.set("necesidad", necesidad);
    if (inversion) params.set("inversion", inversion);
    params.set("nombre", formData.nombre);
    params.set("whatsapp", formData.whatsapp);
    if (formData.email) params.set("email", formData.email);
    if (formData.empresa) params.set("empresa", formData.empresa);
    if (formData.mensaje) params.set("mensaje", formData.mensaje);
    navigate(`/whatsapp?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-black text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 md:gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm">Volver</span>
          </button>
          <div className="text-sm md:text-base font-bold text-white">ADUANEX</div>
        </div>
      </header>

      <main className="pt-14 md:pt-20">
        <section className="py-12 md:py-20 px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 md:p-10">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 text-center">Dejanos tus datos</h2>
              <p className="text-zinc-400 text-sm md:text-base text-center mb-8">Te contactamos para ayudarte con tu importación</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Nombre completo *</label>
                  <input type="text" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className={`w-full bg-zinc-800 border ${errors.nombre ? "border-red-500" : "border-zinc-700"} rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors`} placeholder="Tu nombre" />
                  {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">WhatsApp *</label>
                  <input type="tel" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} className={`w-full bg-zinc-800 border ${errors.whatsapp ? "border-red-500" : "border-zinc-700"} rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors`} placeholder="+54 9 11 1234-5678" />
                  {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Email <span className="text-zinc-500 font-normal">(opcional)</span></label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`w-full bg-zinc-800 border ${errors.email ? "border-red-500" : "border-zinc-700"} rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors`} placeholder="tu@email.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">Empresa <span className="text-zinc-500 font-normal">(opcional)</span></label>
                  <input type="text" value={formData.empresa} onChange={(e) => setFormData({ ...formData, empresa: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors" placeholder="Nombre de tu empresa" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">¿Qué necesitás?</label>
                  <textarea value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} rows={3} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Contanos brevemente qué estás buscando..." />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-base md:text-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl shadow-primary/20">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Quiero que me contacten
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-6 md:py-8 px-4 md:px-6 border-t border-zinc-800 text-center text-xs md:text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} ADUANEX. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Formulario;
