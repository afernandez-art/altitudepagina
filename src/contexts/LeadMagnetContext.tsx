import { saveLead, isSupabaseConfigured } from "@/lib/supabase";

// ==========================================
// FUNNEL DE 3 ETAPAS CON DERIVACIÓN
// ==========================================

export type PerfilType = "A" | "B" | "C" | "";

// Servicios derivados
export type ServicioDerivado = "ADUANEX" | "B2BOX_PRO" | "B2BOX_APP" | "B2BOX_BRANDS" | "NOT_B2B";

// Paso 1: Seleccioná la opción que mejor te describe
export const perfilOptions: { id: PerfilType; titulo: string; descripcion: string }[] = [
  {
    id: "A",
    titulo: "Ya importo y quiero mejorar",
    descripcion: "Actualmente estoy importando, estoy buscando mejorar costos, tiempos o cambiar de despachante.",
  },
  {
    id: "B",
    titulo: "Quiero empezar a importar",
    descripcion: "Quiero empezar a traer productos de China. Ideal para primeras importaciones o compras en conjunto.",
  },
  {
    id: "C",
    titulo: "Quiero desarrollar mi producto o marca",
    descripcion: "Busco crear mi propia línea de productos en China, desarrollar packaging o lanzar mi marca desde cero.",
  },
];

// Paso 2: Preguntas condicionales por perfil (con descripción)
export const preguntasPorPerfil: Record<
  Exclude<PerfilType, "">,
  { pregunta: string; opciones: { label: string; descripcion: string }[] }
> = {
  A: {
    pregunta: "¿Qué necesitás mejorar?",
    opciones: [
      { label: "Costos de producto / sourcing en China", descripcion: "Busco mejores precios de fábrica o un proveedor más competitivo" },
      { label: "Despacho y operación aduanera", descripcion: "Necesito un despachante más ágil, transparente o económico" },
      { label: "Tiempos de entrega puerta a puerta", descripcion: "Mis operaciones tardan demasiado y pierdo ventas" },
      { label: "Todo el proceso completo", descripcion: "Quiero optimizar sourcing, logística y despacho de punta a punta" },
    ],
  },
  B: {
    pregunta: "¿Tenés experiencia comprando en el exterior?",
    opciones: [
      { label: "Nunca compré en el exterior", descripcion: "Es mi primera vez, quiero entender cómo funciona" },
      { label: "Compré para uso personal", descripcion: "Compré por AliExpress, Amazon u otras plataformas para mí" },
      { label: "Hice alguna importación chica para reventa", descripcion: "Traje mercadería pero en poca cantidad" },
      { label: "Compré por Alibaba / 1688", descripcion: "Ya contacté fábricas o hice compras directas" },
    ],
  },
  C: {
    pregunta: "¿En qué etapa estás?",
    opciones: [
      { label: "Tengo la idea pero no el proveedor", descripcion: "Sé qué quiero hacer pero necesito quién lo fabrique" },
      { label: "Ya tengo proveedor, necesito desarrollo", descripcion: "Tengo contacto en China pero necesito diseño, muestras o packaging" },
      { label: "Necesito todo: proveedor, diseño y producción", descripcion: "Arranco de cero y quiero que me guíen en todo el proceso" },
    ],
  },
};

// Paso 3: Inversión condicional por perfil
export const inversionPorPerfil: Record<
  Exclude<PerfilType, "">,
  { pregunta: string; opciones: { id: string; label: string; descripcion: string }[] }
> = {
  A: {
    pregunta: "¿Cuánto invertís por operación actualmente?",
    opciones: [
      { id: "menos-5k", label: "Menos de USD 5.000", descripcion: "Operaciones chicas" },
      { id: "5k-20k", label: "USD 5.000 a 20.000", descripcion: "Operaciones medianas" },
      { id: "20k-50k", label: "USD 20.000 a 50.000", descripcion: "Operaciones grandes" },
      { id: "mas-50k", label: "Más de USD 50.000", descripcion: "Operaciones de alto volumen" },
    ],
  },
  B: {
    pregunta: "¿Cuánto pensás invertir en tu primera compra?",
    opciones: [
      { id: "menos-1k", label: "Menos de USD 1.000", descripcion: "Compra chica para testear" },
      { id: "1k-5k", label: "USD 1.000 a 5.000", descripcion: "Primera importación seria" },
      { id: "5k-20k", label: "USD 5.000 a 20.000", descripcion: "Quiero arrancar fuerte" },
      { id: "mas-20k", label: "Más de USD 20.000", descripcion: "Tengo capital y quiero escalar rápido" },
    ],
  },
  C: {
    pregunta: "¿Cuánto pensás invertir en el desarrollo?",
    opciones: [
      { id: "5k-10k", label: "USD 5.000 a 10.000", descripcion: "Desarrollo inicial y primeras muestras" },
      { id: "10k-30k", label: "USD 10.000 a 30.000", descripcion: "Desarrollo completo + primera producción" },
      { id: "mas-30k", label: "Más de USD 30.000", descripcion: "Lanzamiento completo de marca" },
    ],
  },
};

// Legacy export for backward compat
export const inversionOptions = inversionPorPerfil.B.opciones;

// ==========================================
// LÓGICA DE DERIVACIÓN
// ==========================================

export const derivarServicio = (
  perfil: PerfilType,
  necesidad: string,
  inversion: string
): ServicioDerivado => {
  if (perfil === "A") {
    if (necesidad === "Despacho y operación aduanera") return "ADUANEX";
    return "B2BOX_PRO";
  }

  if (perfil === "B") {
    if (necesidad === "Compré para uso personal") return "NOT_B2B";
    if (inversion === "5k-20k" || inversion === "mas-20k") return "B2BOX_PRO";
    return "B2BOX_APP";
  }

  if (perfil === "C") {
    return "B2BOX_BRANDS";
  }

  return "B2BOX_APP";
};

// Info de cada servicio para la pantalla de resultado
export const servicioInfo: Record<
  Exclude<ServicioDerivado, "NOT_B2B">,
  { nombre: string; tagline: string; descripcion: string; color: string; videoLabel: string }
> = {
  ADUANEX: {
    nombre: "Aduanex",
    tagline: "Despachante de aduanas con tecnología",
    descripcion: "Operación aduanera profesional con seguimiento en tiempo real, costos transparentes y atención personalizada.",
    color: "#10b981",
    videoLabel: "Video Aduanex",
  },
  B2BOX_PRO: {
    nombre: "B2BOX Pro",
    tagline: "Importación llave en mano desde China",
    descripcion: "Sourcing, negociación con fábricas, control de calidad, logística internacional y despacho. Todo resuelto, vos solo vendés.",
    color: "#c4f000",
    videoLabel: "Video B2BOX Pro",
  },
  B2BOX_APP: {
    nombre: "B2BOX App",
    tagline: "Importá fácil desde USD 1.000",
    descripcion: "Elegí productos de nuestro catálogo con precio DDP. Ideal para empezar a importar sin complicaciones.",
    color: "#c4f000",
    videoLabel: "Video B2BOX App",
  },
  B2BOX_BRANDS: {
    nombre: "B2BOX Brands",
    tagline: "Desarrollá tu producto en China",
    descripcion: "Te conectamos con fábricas, gestionamos desarrollo de producto, packaging, branding y producción desde cero.",
    color: "#c4f000",
    videoLabel: "Video B2BOX Brands",
  },
};

// ==========================================
// TIPOS DE DATOS
// ==========================================

export interface LeadFormData {
  perfil: PerfilType;
  necesidad: string;
  inversion: string;
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
  // Search across all profiles
  for (const key of ["A", "B", "C"] as const) {
    const found = inversionPorPerfil[key].opciones.find(i => i.id === inversion);
    if (found) return found.label;
  }
  return inversion;
};

const WHATSAPP_NUMBER = "5492257617922";

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

export const generateWhatsAppLink = (data: LeadFormData): string => {
  const mensaje = generateWhatsAppMessage(data);
  const encodedMessage = encodeURIComponent(mensaje);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const submitLead = async (data: LeadFormData): Promise<boolean> => {
  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;

  const leadData = {
    nombre: data.nombre,
    email: data.email || "no-proporcionado@sinmail.com",
    whatsapp: data.whatsapp,
    empresa: data.empresa || null,
    nicho: data.perfil || "B",
    nicho_label: getPerfilLabel(data.perfil) || "No especificado",
    situacion: data.necesidad || "No especificado",
    situacion_label: data.necesidad || "No especificado",
    facturacion: data.inversion || "no-especificado",
    facturacion_label: getInversionLabel(data.inversion) || "No especificado",
    problematica: data.mensaje || "Sin mensaje",
    problematica_label: data.mensaje || "Sin mensaje",
    estado: "nuevo",
    contactado_whatsapp: false,
    notas: null,
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

  if (isSupabaseConfigured()) {
    const { error: supabaseError } = await saveLead(leadData);
    if (supabaseError) {
      console.error("Supabase error:", supabaseError);
    }
  }

  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...leadData, timestamp: new Date().toISOString() }),
      });
      if (!response.ok) console.error("Webhook error:", response.status);
    } catch (error) {
      console.error("Webhook error:", error);
    }
  }

  return true;
};
