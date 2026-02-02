import { motion } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  Building,
  DollarSign,
  AlertTriangle,
  Target,
  Zap,
  TrendingUp,
  Package,
  Truck,
  FileCheck,
  Warehouse,
  Download,
  Share2,
} from "lucide-react";
import {
  useLeadMagnet,
  nichosOptions,
  facturacionOptions,
  problematicasOptions,
} from "@/contexts/LeadMagnetContext";

// Mapeo de problemáticas a soluciones
const solucionesPorProblematica: Record<string, { titulo: string; descripcion: string; icono: React.ReactNode }> = {
  "costos-altos": {
    titulo: "Optimización de Costos",
    descripcion: "Consolidación de carga, rutas optimizadas y negociación con carriers para reducir hasta 30% tus costos logísticos.",
    icono: <DollarSign className="w-5 h-5" />,
  },
  "tiempos-entrega": {
    titulo: "Tiempos Predecibles",
    descripcion: "Sistema de tracking en tiempo real + coordinación proactiva para cumplir plazos de entrega.",
    icono: <TrendingUp className="w-5 h-5" />,
  },
  "falta-visibilidad": {
    titulo: "Visibilidad Total",
    descripcion: "Dashboard personalizado con tracking de cada envío, alertas automáticas y reportes en tiempo real.",
    icono: <Target className="w-5 h-5" />,
  },
  "problemas-aduana": {
    titulo: "Despacho Express",
    descripcion: "Equipo especializado en aduana con promedio de despacho de 48hs. Documentación pre-clasificada.",
    icono: <FileCheck className="w-5 h-5" />,
  },
  "operador-actual": {
    titulo: "Transición Sin Fricciones",
    descripcion: "Proceso de onboarding en 72hs. Tomamos tu operación actual y la mejoramos sin interrupciones.",
    icono: <Zap className="w-5 h-5" />,
  },
  "escalar-operacion": {
    titulo: "Escalabilidad Garantizada",
    descripcion: "Infraestructura flexible que crece con vos. Desde 1 pallet hasta containers completos.",
    icono: <TrendingUp className="w-5 h-5" />,
  },
  "primera-importacion": {
    titulo: "Guía Completa Primera Importación",
    descripcion: "Te acompañamos paso a paso en tu primera operación. Asesoramiento en documentación, clasificación y costos.",
    icono: <Package className="w-5 h-5" />,
  },
  "almacenamiento": {
    titulo: "Fulfillment Integral",
    descripcion: "Almacenamiento, picking, packing y distribución desde nuestro centro logístico en AMBA.",
    icono: <Warehouse className="w-5 h-5" />,
  },
};

// Servicios recomendados según problemáticas
const serviciosRecomendados = [
  {
    id: "forwarding",
    titulo: "Forwarding Internacional",
    descripcion: "Coordinamos el transporte de tu mercadería desde cualquier origen mundial.",
    icono: <Package className="w-6 h-6" />,
  },
  {
    id: "aduana",
    titulo: "Despacho de Aduana",
    descripcion: "Gestión completa del proceso aduanero con tiempos optimizados.",
    icono: <FileCheck className="w-6 h-6" />,
  },
  {
    id: "transporte",
    titulo: "Transporte Nacional",
    descripcion: "Flota propia con cobertura en todo el país. Entregas en AMBA en 24-48hs.",
    icono: <Truck className="w-6 h-6" />,
  },
  {
    id: "fulfillment",
    titulo: "Fulfillment B2B",
    descripcion: "Almacenamiento, preparación de pedidos y distribución a tus clientes.",
    icono: <Warehouse className="w-6 h-6" />,
  },
];

export const ActionPlanSection = () => {
  const { formData, currentStep, setCurrentStep } = useLeadMagnet();

  const nichoLabel = nichosOptions.find((n) => n.id === formData.nicho)?.label || "Tu industria";
  const factLabel = facturacionOptions.find((f) => f.id === formData.facturacion)?.label || "";

  // Obtener soluciones personalizadas basadas en las problemáticas seleccionadas
  const solucionesPersonalizadas = formData.problematicas
    .map((prob) => solucionesPorProblematica[prob])
    .filter(Boolean);

  const handleAgendarLlamada = () => {
    setCurrentStep("calendar");
    setTimeout(() => {
      document.getElementById("calendar-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (currentStep !== "action_plan" && currentStep !== "calendar") {
    return null;
  }

  return (
    <section id="action-plan-section" className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
            <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
            Plan Generado
          </div>
          <h2 className="text-2xl md:text-5xl font-black tracking-tight mb-3 md:mb-4">
            Tu Plan de Acción Personalizado
          </h2>
          <p className="text-base md:text-xl text-muted-foreground">
            Preparado exclusivamente para{" "}
            <span className="text-primary font-semibold">
              {formData.empresa || formData.nombre}
            </span>
          </p>
        </motion.div>

        {/* Resumen del perfil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-12"
        >
          <div className="bg-card p-4 md:p-6 rounded-lg md:rounded-xl border border-zinc-800">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">Industria</span>
            </div>
            <p className="text-base md:text-lg font-semibold">{nichoLabel}</p>
          </div>
          <div className="bg-card p-4 md:p-6 rounded-lg md:rounded-xl border border-zinc-800">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">Facturación</span>
            </div>
            <p className="text-base md:text-lg font-semibold">{factLabel}</p>
          </div>
          <div className="bg-card p-4 md:p-6 rounded-lg md:rounded-xl border border-zinc-800">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <span className="text-xs md:text-sm text-muted-foreground">Desafíos identificados</span>
            </div>
            <p className="text-base md:text-lg font-semibold">{formData.problematicas.length} áreas de mejora</p>
          </div>
        </motion.div>

        {/* Soluciones personalizadas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            Soluciones para tus Desafíos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {solucionesPersonalizadas.map((solucion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-card p-4 md:p-6 rounded-lg md:rounded-xl border border-zinc-800 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center text-primary shrink-0">
                    {solucion.icono}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-sm md:text-base">{solucion.titulo}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">{solucion.descripcion}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Servicios recomendados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 md:mb-12"
        >
          <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
            <Package className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            Servicios Recomendados
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
            {serviciosRecomendados.map((servicio, index) => (
              <motion.div
                key={servicio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-3 md:p-5 rounded-lg md:rounded-xl border border-zinc-700 hover:border-primary/50 transition-all group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center text-primary mb-3 md:mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  {servicio.icono}
                </div>
                <h4 className="font-bold mb-1 md:mb-2 text-sm md:text-base">{servicio.titulo}</h4>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-3">{servicio.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resumen de lo que contaste */}
        {(formData.descripcionOperacion || formData.desafiosPrincipales || formData.objetivos) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-secondary/50 p-4 md:p-6 rounded-lg md:rounded-xl border border-zinc-800 mb-8 md:mb-12"
          >
            <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">Lo que nos contaste</h3>
            <div className="space-y-3 md:space-y-4 text-xs md:text-sm">
              {formData.descripcionOperacion && (
                <div>
                  <p className="text-muted-foreground mb-1">Tu operación:</p>
                  <p className="italic">"{formData.descripcionOperacion}"</p>
                </div>
              )}
              {formData.desafiosPrincipales && (
                <div>
                  <p className="text-muted-foreground mb-1">Tu mayor desafío:</p>
                  <p className="italic">"{formData.desafiosPrincipales}"</p>
                </div>
              )}
              {formData.objetivos && (
                <div>
                  <p className="text-muted-foreground mb-1">Tus objetivos:</p>
                  <p className="italic">"{formData.objetivos}"</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
        >
          <button
            onClick={handleAgendarLlamada}
            className="w-full sm:w-auto bg-primary text-primary-foreground px-6 md:px-10 py-4 md:py-5 rounded-xl text-base md:text-lg font-bold hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-2 md:gap-3 group"
          >
            Agendar Llamada Estratégica
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto bg-card border border-zinc-700 hover:border-zinc-500 px-4 md:px-8 py-3 md:py-5 rounded-xl text-sm md:text-lg font-bold transition-all flex items-center justify-center gap-2">
            <Download className="w-4 h-4 md:w-5 md:h-5" />
            Descargar PDF
          </button>
          <button className="w-full sm:w-auto bg-card border border-zinc-700 hover:border-zinc-500 px-4 md:px-8 py-3 md:py-5 rounded-xl text-sm md:text-lg font-bold transition-all flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4 md:w-5 md:h-5" />
            Compartir
          </button>
        </motion.div>
      </div>
    </section>
  );
};
