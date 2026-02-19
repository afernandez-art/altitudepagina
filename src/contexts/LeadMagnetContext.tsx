import { saveLead, isSupabaseConfigured } from "@/lib/supabase";

// ==========================================
// NUEVO FUNNEL DE 2 ETAPAS
// ==========================================

// Tipos de perfil
export type PerfilType = "A" | "B" | "C" | "";

// Paso 1: ¿Qué estás buscando?
export const perfilOptions: { id: PerfilType; titulo: string; descripcion: string; bajada?: string }[] = [
  {
    id: "A",
    titulo: "Ya importo y quiero mejorar",
    descripcion: "Tengo proveedor o ya estoy operando. Busco mejorar costos, tiempos o cambiar de despachante.",
  },
  {
    id: "B",
    titulo: "Quiero empezar a importar",
    descripcion: "Quiero traer productos desde China desde USD 1.000. Ideal para primeras importaciones o compras chicas en consolidado.",
    bajada: "Operamos con B2BOX",
  },
  {
    id: "C",
    titulo: "Quiero desarrollar mi producto o marca",
    descripcion: "Busco un proveedor, quiero crear mi propia línea de productos, o necesito packaging y branding desde China.",
  },
];

// Paso 2: Preguntas condicionales por perfil
export const preguntasPorPerfil: Record<Exclude<PerfilType, "">, { pregunta: string; opciones: string[] }> = {
  A: {
    pregunta: "¿Qué necesitás mejorar?",
    opciones: ["Costos de operación", "Tiempos de entrega", "Servicio y atención del despachante", "Todo lo anterior"],
  },
  B: {
    pregunta: "¿Qué tipo de producto querés traer?",
    opciones: ["Electrónica / Tech", "Indumentaria / Textil", "Accesorios / Bazar", "Otro"],
  },
  C: {
    pregunta: "¿En qué etapa estás?",
    opciones: ["Tengo la idea pero no el proveedor", "Ya tengo proveedor pero necesito desarrollo", "Necesito todo: proveedor, diseño y producción"],
  },
};

// Paso 3: Inversión (igual para todos)
export const inversionOptions = [
  { id: "menos-1k", label: "Menos de USD 1.000" },
  { id: "1k-5k", label: "USD 1.000 a 5.000" },
  { id: "5k-20k", label: "USD 5.000 a 20.000" },
  { id: "mas-20k", label: "Más de USD 20.000" },
];

// ==========================================
// TIPOS DE DATOS
// ==========================================

export interface LeadFormData {
  // Del quiz
  perfil: PerfilType;
  necesidad: string;
  inversion: string;

  // Del form en /video
  nombre: string;
  whatsapp: string;
  email: string;
  empresa: string;
  mensaje: string;
}

// ==========================================
// HELPERS
// ==========================================

export const getPerfilLabel = (perfil: PerfilType): string => {
  if (!perfil) return "";
  return perfilOptions.find(p => p.id === perfil)?.titulo || perfil;
};

export const getNecesidadLabel = (perfil: PerfilType, necesidad: string): string => {
  if (!perfil || !necesidad) return necesidad;
  return necesidad;
};

export const getInversionLabel = (inversion: string): string => {
  return inversionOptions.find(i => i.id === inversion)?.label || inversion;
};

// Número de WhatsApp de ADUANEX
const WHATSAPP_NUMBER = "5492257617922";

// Generar mensaje de WhatsApp
export const generateWhatsAppMessage = (data: LeadFormData): string => {
  const perfilLabel = getPerfilLabel(data.perfil);
  const inversionLabel = getInversionLabel(data.inversion);

  let mensaje = `Hola! Completé el formulario en la web.

📋 *Mis datos:*
Nombre: ${data.nombre}
WhatsApp: ${data.whatsapp}`;

  if (data.empresa) {
    mensaje += `\nEmpresa: ${data.empresa}`;
  }

  mensaje += `

🎯 *Perfil:* ${perfilLabel}
💰 *Inversión estimada:* ${inversionLabel}`;

  if (data.necesidad) {
    mensaje += `\n📦 *Necesidad:* ${data.necesidad}`;
  }

  mensaje += `

📝 *Lo que necesito:*
${data.mensaje || "No especificado"}`;

  return mensaje;
};

// Generar link de WhatsApp
export const generateWhatsAppLink = (data: LeadFormData): string => {
  const mensaje = generateWhatsAppMessage(data);
  const encodedMessage = encodeURIComponent(mensaje);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

// Submit lead to Supabase
export const submitLead = async (data: LeadFormData): Promise<boolean> => {
  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;

  // Prepare lead data for Supabase
  const leadData = {
    // Datos de contacto
    nombre: data.nombre,
    email: data.email || null,
    whatsapp: data.whatsapp,
    empresa: data.empresa || null,

    // Datos del quiz
    nicho: data.perfil,
    nicho_label: getPerfilLabel(data.perfil),
    situacion: data.necesidad,
    situacion_label: data.necesidad,
    facturacion: data.inversion,
    facturacion_label: getInversionLabel(data.inversion),

    // Mensaje
    problematica: data.mensaje,
    problematica_label: data.mensaje,

    // Estado
    estado: "nuevo",
    contactado_whatsapp: false,
    notas: null,

    // Campos legacy (null)
    experiencia: null,
    experiencia_label: null,
    origen: null,
    origen_label: null,
    mejoras: null,
    mejoras_labels: null,
    volumen: null,
    volumen_label: null,
    etapa: null,
    etapa_label: null,
    urgencia: null,
    urgencia_label: null,
    espacio: null,
    espacio_label: null,
    servicios_adicionales: null,
    servicios_adicionales_labels: null,
    frecuencia: null,
    frecuencia_label: null,
    tercerizar: null,
    tercerizar_labels: null,
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

  return true;
};
