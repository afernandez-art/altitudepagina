import { createContext, useContext, useState, ReactNode } from "react";
import { saveLead, isSupabaseConfigured } from "@/lib/supabase";

// ==========================================
// FORM 1 - CALIFICACIÓN INICIAL
// ==========================================

// Paso 1: Nicho - ¿Qué tipo de productos importas/vendes?
export const nichoOptions = [
  { id: "textil", label: "Textil y confección (ropa, calzado, accesorios)" },
  { id: "electronica", label: "Electrónica y tecnología" },
  { id: "alimentos", label: "Alimentos y bebidas" },
  { id: "belleza", label: "Belleza y cuidado personal" },
  { id: "hogar", label: "Hogar y decoración" },
  { id: "juguetes", label: "Juguetes y artículos infantiles" },
  { id: "deportes", label: "Deportes y fitness" },
  { id: "maquinaria", label: "Maquinaria y equipamiento industrial" },
  { id: "insumos", label: "Insumos para la industria" },
  { id: "repuestos", label: "Repuestos y autopartes" },
  { id: "otro", label: "Otro" },
];

// Paso 2: Situación actual
export type SituacionType = "mejorar-costos" | "contenedor-compartido" | "deposito-fulfillment" | "escalar-negocio";

export const situacionOptions: { id: SituacionType; titulo: string; descripcion: string }[] = [
  {
    id: "mejorar-costos",
    titulo: "Necesito mejorar costos/servicios de importación",
    descripcion: "Buscas reducir costos sin comprometer la calidad de tu operación de importación",
  },
  {
    id: "contenedor-compartido",
    titulo: "Tengo capital para importar en un contenedor compartido",
    descripcion: "Tienes capital disponible y quieres maximizarlo importando en un contenedor compartido (LCL)",
  },
  {
    id: "deposito-fulfillment",
    titulo: "Necesito un depósito/fulfillment",
    descripcion: "Necesitas un espacio de almacenamiento y gestión logística para tus productos",
  },
  {
    id: "escalar-negocio",
    titulo: "Necesito escalar mi negocio",
    descripcion: "Necesito escalar mi negocio con una solución integral que maneje tanto la importación (comex) como toda la logística",
  },
];

// Paso 3: Problemáticas específicas (dinámicas según situación)
export const problematicasPorSituacion: Record<SituacionType, { id: string; label: string }[]> = {
  "mejorar-costos": [
    { id: "costos-altos", label: "Mis costos actuales son muy altos y afectan mi margen de ganancia" },
    { id: "servicio-lento", label: "El servicio actual es lento o poco confiable" },
    { id: "sin-visibilidad", label: "No tengo visibilidad/control sobre el proceso de importación" },
    { id: "sin-personalizacion", label: "Mi proveedor actual no me ofrece soluciones personalizadas" },
  ],
  "contenedor-compartido": [
    { id: "primera-importacion", label: "Es mi primera importación y no sé por dónde empezar" },
    { id: "validar-mercado", label: "Quiero validar el mercado antes de invertir en un contenedor completo" },
    { id: "varias-referencias", label: "Necesito importar varias referencias pero no llego al volumen de un contenedor" },
    { id: "minimizar-riesgos", label: "Busco minimizar riesgos importando cantidades más pequeñas" },
  ],
  "deposito-fulfillment": [
    { id: "almacenar-preparar", label: "Necesito almacenar y preparar pedidos para mis canales de distribución" },
    { id: "entregas-rapidas", label: "Mis clientes mayoristas exigen entregas más rápidas y profesionales" },
    { id: "pickeo-packing", label: "Necesito capacidad de pickeo y packing para pedidos corporativos/mayoristas" },
    { id: "sin-capacidad", label: "Mi operación actual no tiene capacidad para manejar más volumen" },
  ],
  "escalar-negocio": [
    { id: "mucho-tiempo", label: "Paso demasiado tiempo gestionando importaciones y logística" },
    { id: "expandir-canales", label: "Quiero expandirme a nuevos canales pero no tengo capacidad operativa" },
    { id: "profesionalizar", label: "Necesito profesionalizar mi operación para competir mejor" },
    { id: "socio-estrategico", label: "Busco un socio estratégico que entienda mi negocio de punta a punta" },
  ],
};

// Paso 4: Facturación mensual
export const facturacionOptions = [
  { id: "menos-15k", label: "Menos de $15.000 USD" },
  { id: "15-50k", label: "$15.000 - $50.000 USD" },
  { id: "50-100k", label: "$50.000 - $100.000 USD" },
  { id: "mas-100k", label: "Más de $100.000 USD" },
];

// ==========================================
// FORM 2 - PROFUNDIZACIÓN (según situación)
// ==========================================

// Experiencia importando (para mejorar-costos y escalar-negocio)
export const experienciaOptions = [
  { id: "primera-vez", label: "Es mi primera vez importando" },
  { id: "ocasionalmente", label: "Importo ocasionalmente (1-2 veces al año)" },
  { id: "regularmente", label: "Importo regularmente (3-6 veces al año)" },
  { id: "frecuentemente", label: "Importo frecuentemente (más de 6 veces al año)" },
];

// Origen de importación (para mejorar-costos, contenedor-compartido, escalar-negocio)
export const origenOptions = [
  { id: "china", label: "China" },
  { id: "usa", label: "USA" },
  { id: "europa", label: "Europa" },
  { id: "otros-asia", label: "Otros países asiáticos" },
  { id: "multiples", label: "Múltiples orígenes" },
];

// Qué mejorar (para mejorar-costos) - checkbox
export const mejorarOptions = [
  { id: "reducir-costos", label: "Reducir costos de importación" },
  { id: "agilizar-tiempos", label: "Agilizar tiempos de despacho" },
  { id: "mejor-comunicacion", label: "Tener mejor comunicación y seguimiento" },
  { id: "mejores-tarifas", label: "Acceder a mejores tarifas de flete" },
];

// Volumen (para contenedor-compartido)
export const volumenOptions = [
  { id: "menos-5m3", label: "Menos de 5 m³" },
  { id: "5-10m3", label: "5 - 10 m³" },
  { id: "10-15m3", label: "10 - 15 m³" },
  { id: "mas-15m3", label: "Más de 15 m³" },
];

// Etapa de importación (para contenedor-compartido)
export const etapaOptions = [
  { id: "proveedor-confirmado", label: "Ya tengo proveedor confirmado y cotización" },
  { id: "negociando", label: "Estoy negociando con proveedores" },
  { id: "buscando", label: "Recién empezando a buscar proveedores" },
  { id: "necesito-ayuda", label: "Necesito ayuda para encontrar proveedores" },
];

// Espacio necesario (para deposito-fulfillment)
export const espacioOptions = [
  { id: "hasta-10-pallets", label: "Hasta 10 pallets (pequeño)" },
  { id: "10-30-pallets", label: "10 - 30 pallets (mediano)" },
  { id: "30-60-pallets", label: "30 - 60 pallets (grande)" },
  { id: "mas-60-pallets", label: "Más de 60 pallets (muy grande)" },
];

// Servicios adicionales (para deposito-fulfillment) - checkbox
export const serviciosAdicionalesOptions = [
  { id: "etiquetado", label: "Etiquetado/re-etiquetado de productos" },
  { id: "reempaque", label: "Reempaque" },
  { id: "personalizacion", label: "Personalización de pedidos" },
  { id: "solo-estandar", label: "No, solo almacenamiento y despacho estándar" },
];

// Frecuencia de despachos (para deposito-fulfillment)
export const frecuenciaOptions = [
  { id: "diario", label: "Diario" },
  { id: "semanal", label: "Semanal" },
  { id: "quincenal", label: "Quincenal" },
  { id: "mensual", label: "Mensual" },
];

// Servicios a tercerizar (para escalar-negocio) - checkbox
export const tercerizarOptions = [
  { id: "gestion-importacion", label: "Gestión de importación (comex completo)" },
  { id: "almacenamiento", label: "Almacenamiento y preparación de pedidos" },
  { id: "distribucion", label: "Distribución a clientes" },
  { id: "todo", label: "Todo el proceso de punta a punta" },
];

// Urgencia (para todos)
export const urgenciaOptions = [
  { id: "inmediatamente", label: "Inmediatamente" },
  { id: "2-4-semanas", label: "En las próximas 2-4 semanas" },
  { id: "1-2-meses", label: "En 1-2 meses" },
  { id: "explorando", label: "Solo estoy explorando opciones por ahora" },
];

// ==========================================
// TIPOS DE DATOS
// ==========================================

export interface LeadMagnetFormData {
  // FORM 1 - Calificación inicial
  nicho: string;
  nichoOtro: string; // Si eligió "otro"
  situacion: SituacionType | "";
  problematica: string;
  facturacion: string;

  // FORM 2 - Profundización (según situación)
  // Para mejorar-costos y escalar-negocio
  experiencia: string;
  // Para mejorar-costos, contenedor-compartido, escalar-negocio
  origen: string;
  // Para mejorar-costos (single select - principal mejora)
  mejoraPrincipal: string;
  mejoras: string[]; // legacy - mantener para compatibilidad
  // Para contenedor-compartido
  volumen: string;
  etapa: string;
  // Para deposito-fulfillment
  espacio: string;
  servicioAdicionalPrincipal: string; // single select
  serviciosAdicionales: string[]; // legacy
  frecuencia: string;
  // Para escalar-negocio (single select - principal servicio a tercerizar)
  tercerizarPrincipal: string;
  tercerizar: string[]; // legacy

  // Preguntas finales (para todos)
  urgencia: string;
  nombre: string;
  email: string;
  whatsapp: string;
  empresa: string; // opcional
}

// Helper para obtener labels
export const getLabel = (options: { id: string; label: string }[], id: string): string => {
  return options.find(opt => opt.id === id)?.label || id;
};

export const getLabels = (options: { id: string; label: string }[], ids: string[]): string[] => {
  return ids.map(id => getLabel(options, id));
};

export const getSituacionTitulo = (id: SituacionType | ""): string => {
  if (!id) return "";
  return situacionOptions.find(opt => opt.id === id)?.titulo || id;
};

// Estados del flujo
export type LeadMagnetStep = "form1" | "vsl" | "form2" | "whatsapp_redirect";

interface LeadMagnetContextType {
  // Estado actual del flujo
  currentStep: LeadMagnetStep;
  setCurrentStep: (step: LeadMagnetStep) => void;

  // Datos del formulario
  formData: LeadMagnetFormData;
  updateFormData: (data: Partial<LeadMagnetFormData>) => void;

  // Helpers
  resetFlow: () => void;
  saveToStorage: () => void;
  loadFromStorage: () => void;

  // Submit to webhook
  submitToWebhook: () => Promise<boolean>;

  // Generar link de WhatsApp
  generateWhatsAppLink: () => string;
}

const initialFormData: LeadMagnetFormData = {
  nicho: "",
  nichoOtro: "",
  situacion: "",
  problematica: "",
  facturacion: "",
  experiencia: "",
  origen: "",
  mejoraPrincipal: "",
  mejoras: [],
  volumen: "",
  etapa: "",
  espacio: "",
  servicioAdicionalPrincipal: "",
  serviciosAdicionales: [],
  frecuencia: "",
  tercerizarPrincipal: "",
  tercerizar: [],
  urgencia: "",
  nombre: "",
  email: "",
  whatsapp: "",
  empresa: "",
};

const LeadMagnetContext = createContext<LeadMagnetContextType | undefined>(undefined);

// Número de WhatsApp de Altitude
const WHATSAPP_NUMBER = "5492257617922";

export function LeadMagnetProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<LeadMagnetStep>("form1");
  const [formData, setFormData] = useState<LeadMagnetFormData>(initialFormData);

  const updateFormData = (data: Partial<LeadMagnetFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const resetFlow = () => {
    setCurrentStep("form1");
    setFormData(initialFormData);
    localStorage.removeItem("altitude_lead_data");
  };

  // Save form data to localStorage
  const saveToStorage = () => {
    const dataToSave = {
      formData,
      timestamp: Date.now(),
    };
    localStorage.setItem("altitude_lead_data", JSON.stringify(dataToSave));
  };

  // Load form data from localStorage
  const loadFromStorage = () => {
    try {
      const saved = localStorage.getItem("altitude_lead_data");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Check if data is less than 1 hour old
        if (parsed.timestamp && Date.now() - parsed.timestamp < 3600000) {
          setFormData(parsed.formData);
        }
      }
    } catch (error) {
      console.error("Error loading from storage:", error);
    }
  };

  // Generar mensaje de WhatsApp
  const generateWhatsAppMessage = (): string => {
    const nichoLabel = formData.nicho === "otro" && formData.nichoOtro
      ? formData.nichoOtro
      : getLabel(nichoOptions, formData.nicho);

    const situacionTitulo = getSituacionTitulo(formData.situacion);
    const problematicaOptions = formData.situacion ? problematicasPorSituacion[formData.situacion] : [];
    const problematicaLabel = getLabel(problematicaOptions, formData.problematica);
    const facturacionLabel = getLabel(facturacionOptions, formData.facturacion);
    const urgenciaLabel = getLabel(urgenciaOptions, formData.urgencia);

    let mensaje = `Hola! Completé el formulario en la web.

📋 *Mis datos:*
Nombre: ${formData.nombre}`;

    if (formData.empresa) {
      mensaje += `\nEmpresa: ${formData.empresa}`;
    }

    mensaje += `
Productos: ${nichoLabel}
Facturación: ${facturacionLabel}

🎯 *Mi situación:*
${situacionTitulo}

⚠️ *Mi principal problemática:*
${problematicaLabel}

📦 *Detalles adicionales:*`;

    // Agregar detalles según situación
    if (formData.situacion === "mejorar-costos") {
      mensaje += `
- Experiencia: ${getLabel(experienciaOptions, formData.experiencia)}
- Origen: ${getLabel(origenOptions, formData.origen)}
- Quiero mejorar: ${formData.mejoras.map(m => getLabel(mejorarOptions, m)).join(", ")}`;
    } else if (formData.situacion === "contenedor-compartido") {
      mensaje += `
- Origen: ${getLabel(origenOptions, formData.origen)}
- Volumen: ${getLabel(volumenOptions, formData.volumen)}
- Etapa: ${getLabel(etapaOptions, formData.etapa)}`;
    } else if (formData.situacion === "deposito-fulfillment") {
      mensaje += `
- Espacio necesario: ${getLabel(espacioOptions, formData.espacio)}
- Servicios adicionales: ${formData.serviciosAdicionales.map(s => getLabel(serviciosAdicionalesOptions, s)).join(", ")}
- Frecuencia de despachos: ${getLabel(frecuenciaOptions, formData.frecuencia)}`;
    } else if (formData.situacion === "escalar-negocio") {
      mensaje += `
- Experiencia: ${getLabel(experienciaOptions, formData.experiencia)}
- Origen: ${getLabel(origenOptions, formData.origen)}
- Quiero tercerizar: ${formData.tercerizar.map(t => getLabel(tercerizarOptions, t)).join(", ")}`;
    }

    mensaje += `

⏰ *Cuándo necesito esto:*
${urgenciaLabel}`;

    return mensaje;
  };

  // Generar link de WhatsApp
  const generateWhatsAppLink = (): string => {
    const mensaje = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(mensaje);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  };

  // Submit all data to webhook and Supabase
  const submitToWebhook = async (): Promise<boolean> => {
    const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;

    // Prepare lead data for Supabase
    const leadData = {
      // Datos de contacto
      nombre: formData.nombre,
      email: formData.email,
      whatsapp: formData.whatsapp,
      empresa: formData.empresa || null,

      // Form 1
      nicho: formData.nicho,
      nicho_label: formData.nicho === "otro" ? formData.nichoOtro : getLabel(nichoOptions, formData.nicho),
      situacion: formData.situacion,
      situacion_label: getSituacionTitulo(formData.situacion),
      problematica: formData.problematica,
      problematica_label: formData.situacion
        ? getLabel(problematicasPorSituacion[formData.situacion], formData.problematica)
        : "",
      facturacion: formData.facturacion,
      facturacion_label: getLabel(facturacionOptions, formData.facturacion),

      // Form 2 (según situación)
      experiencia: formData.experiencia || null,
      experiencia_label: formData.experiencia ? getLabel(experienciaOptions, formData.experiencia) : null,
      origen: formData.origen || null,
      origen_label: formData.origen ? getLabel(origenOptions, formData.origen) : null,
      mejoras: formData.mejoras.length > 0 ? formData.mejoras : null,
      mejoras_labels: formData.mejoras.length > 0 ? getLabels(mejorarOptions, formData.mejoras) : null,
      volumen: formData.volumen || null,
      volumen_label: formData.volumen ? getLabel(volumenOptions, formData.volumen) : null,
      etapa: formData.etapa || null,
      etapa_label: formData.etapa ? getLabel(etapaOptions, formData.etapa) : null,
      espacio: formData.espacio || null,
      espacio_label: formData.espacio ? getLabel(espacioOptions, formData.espacio) : null,
      servicios_adicionales: formData.serviciosAdicionales.length > 0 ? formData.serviciosAdicionales : null,
      servicios_adicionales_labels: formData.serviciosAdicionales.length > 0
        ? getLabels(serviciosAdicionalesOptions, formData.serviciosAdicionales)
        : null,
      frecuencia: formData.frecuencia || null,
      frecuencia_label: formData.frecuencia ? getLabel(frecuenciaOptions, formData.frecuencia) : null,
      tercerizar: formData.tercerizar.length > 0 ? formData.tercerizar : null,
      tercerizar_labels: formData.tercerizar.length > 0 ? getLabels(tercerizarOptions, formData.tercerizar) : null,

      // Urgencia
      urgencia: formData.urgencia,
      urgencia_label: getLabel(urgenciaOptions, formData.urgencia),

      // Estado
      estado: "nuevo",
      contactado_whatsapp: false,
      notas: null,
    };

    // Save to Supabase if configured
    if (isSupabaseConfigured()) {
      const { error: supabaseError } = await saveLead(leadData);
      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
      }
    }

    // Also send to webhook if configured
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...leadData,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          console.error("Webhook error:", response.status);
        }
      } catch (error) {
        console.error("Webhook error:", error);
      }
    }

    return true; // Always continue flow
  };

  return (
    <LeadMagnetContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        formData,
        updateFormData,
        resetFlow,
        saveToStorage,
        loadFromStorage,
        submitToWebhook,
        generateWhatsAppLink,
      }}
    >
      {children}
    </LeadMagnetContext.Provider>
  );
}

export function useLeadMagnet() {
  const context = useContext(LeadMagnetContext);
  if (context === undefined) {
    throw new Error("useLeadMagnet must be used within a LeadMagnetProvider");
  }
  return context;
}
