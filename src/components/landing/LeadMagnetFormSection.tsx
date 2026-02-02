import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Clock, Lock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useLeadMagnet,
  nichosOptions,
  facturacionOptions,
  problematicasOptions,
} from "@/contexts/LeadMagnetContext";

export const LeadMagnetFormSection = () => {
  const { formData, updateFormData, setCurrentStep, getTotalVideoDuration } = useLeadMagnet();

  const handleProblematicaChange = (problematicaId: string, checked: boolean) => {
    const newProblematicas = checked
      ? [...formData.problematicas, problematicaId]
      : formData.problematicas.filter((p) => p !== problematicaId);
    updateFormData({ problematicas: newProblematicas });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validación básica
    if (!formData.nombre || !formData.email || !formData.nicho || !formData.facturacion || formData.problematicas.length === 0) {
      alert("Por favor completá todos los campos");
      return;
    }
    // Avanzar al VSL
    setCurrentStep("vsl");
    // Scroll suave hacia la sección del video
    setTimeout(() => {
      document.getElementById("vsl-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const estimatedMinutes = Math.ceil(getTotalVideoDuration() / 60);

  return (
    <section id="lead-magnet-form" className="py-20 px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Video Personalizado para Vos
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Contanos sobre tu operación
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            En base a tus respuestas, te preparamos un video de{" "}
            <span className="text-primary font-semibold">{estimatedMinutes} minutos</span> con soluciones
            específicas para tu negocio.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid lg:grid-cols-5 gap-8"
        >
          {/* Left - Video Preview */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-secondary aspect-video group">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4"
                >
                  <Play className="w-6 h-6 text-primary ml-1" />
                </motion.div>
                <p className="text-center text-zinc-400 text-sm">
                  Tu video personalizado se<br />
                  desbloqueará al completar el formulario
                </p>
              </div>
              {/* Overlay blur */}
              <div className="absolute inset-0 backdrop-blur-sm bg-black/30" />
            </div>

            {/* Video contents preview */}
            <div className="mt-6 p-4 bg-secondary/50 rounded-xl border border-zinc-800">
              <p className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Tu video incluirá:
              </p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Soluciones para tu industria
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Plan según tu facturación
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Respuestas a tus problemáticas
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Caso de éxito relevante
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Plan de acción personalizado
                </li>
              </ul>
            </div>
          </div>

          {/* Right - Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-2xl border border-zinc-800 space-y-6">
              {/* Datos básicos */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Nombre *
                  </Label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={(e) => updateFormData({ nombre: e.target.value })}
                    className="w-full border-0 border-b-2 border-border focus:border-primary py-3 text-lg placeholder:text-muted-foreground/50 transition-all outline-none bg-transparent"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Empresa
                  </Label>
                  <input
                    type="text"
                    placeholder="Nombre de la empresa"
                    value={formData.empresa}
                    onChange={(e) => updateFormData({ empresa: e.target.value })}
                    className="w-full border-0 border-b-2 border-border focus:border-primary py-3 text-lg placeholder:text-muted-foreground/50 transition-all outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Email *
                  </Label>
                  <input
                    type="email"
                    placeholder="tu@empresa.com"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    className="w-full border-0 border-b-2 border-border focus:border-primary py-3 text-lg placeholder:text-muted-foreground/50 transition-all outline-none bg-transparent"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    WhatsApp
                  </Label>
                  <input
                    type="tel"
                    placeholder="+54 9 11 ..."
                    value={formData.whatsapp}
                    onChange={(e) => updateFormData({ whatsapp: e.target.value })}
                    className="w-full border-0 border-b-2 border-border focus:border-primary py-3 text-lg placeholder:text-muted-foreground/50 transition-all outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Nicho */}
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  ¿En qué industria opera tu empresa? *
                </Label>
                <RadioGroup
                  value={formData.nicho}
                  onValueChange={(value) => updateFormData({ nicho: value })}
                  className="grid grid-cols-2 md:grid-cols-3 gap-2"
                >
                  {nichosOptions.map((nicho) => (
                    <div key={nicho.id} className="flex items-center">
                      <RadioGroupItem value={nicho.id} id={`nicho-${nicho.id}`} className="peer sr-only" />
                      <Label
                        htmlFor={`nicho-${nicho.id}`}
                        className="flex-1 px-3 py-2.5 text-sm border border-zinc-700 rounded-lg cursor-pointer transition-all hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                      >
                        {nicho.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Facturación */}
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Facturación mensual aproximada *
                </Label>
                <RadioGroup
                  value={formData.facturacion}
                  onValueChange={(value) => updateFormData({ facturacion: value })}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2"
                >
                  {facturacionOptions.map((fact) => (
                    <div key={fact.id} className="flex items-center">
                      <RadioGroupItem value={fact.id} id={`fact-${fact.id}`} className="peer sr-only" />
                      <Label
                        htmlFor={`fact-${fact.id}`}
                        className="flex-1 px-3 py-2.5 text-sm border border-zinc-700 rounded-lg cursor-pointer transition-all hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                      >
                        {fact.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Problemáticas */}
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  ¿Cuáles son tus principales desafíos? * (seleccioná hasta 3)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {problematicasOptions.map((prob) => (
                    <div
                      key={prob.id}
                      className={`flex items-center space-x-3 px-3 py-2.5 border rounded-lg cursor-pointer transition-all ${
                        formData.problematicas.includes(prob.id)
                          ? "border-primary bg-primary/10"
                          : "border-zinc-700 hover:border-primary/50"
                      }`}
                      onClick={() => {
                        if (formData.problematicas.includes(prob.id)) {
                          handleProblematicaChange(prob.id, false);
                        } else if (formData.problematicas.length < 3) {
                          handleProblematicaChange(prob.id, true);
                        }
                      }}
                    >
                      <Checkbox
                        id={prob.id}
                        checked={formData.problematicas.includes(prob.id)}
                        onCheckedChange={(checked) => {
                          if (checked && formData.problematicas.length >= 3) return;
                          handleProblematicaChange(prob.id, checked as boolean);
                        }}
                      />
                      <Label htmlFor={prob.id} className="text-sm font-normal cursor-pointer flex-1">
                        {prob.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-8 py-5 rounded-xl text-lg font-bold hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 group"
              >
                <Play className="w-5 h-5" />
                Ver mi Video Personalizado
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                <Lock className="w-3 h-3" />
                Tus datos están seguros. No compartimos tu información.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
