import { createContext, useContext, useState, ReactNode } from "react";

// Tipos para los datos del formulario
export interface LeadMagnetFormData {
  // Form 1 - Calificación inicial
  nombre: string;
  empresa: string;
  whatsapp: string;
  email: string;
  nicho: string;
  facturacion: string;
  problematicas: string[];

  // Form 2 - Profundización
  descripcionOperacion: string;
  desafiosPrincipales: string;
  objetivos: string;
  tiempoImplementacion: string;
}

// Configuración de videos por categoría (placeholders)
export interface VideoClip {
  id: string;
  categoria: "nicho" | "facturacion" | "problematica" | "solucion" | "caso_exito" | "metodologia" | "autoridad" | "cta";
  titulo: string;
  duracion: number; // segundos
  videoUrl: string; // placeholder por ahora
}

// Nichos disponibles
export const nichosOptions = [
  { id: "ecommerce", label: "E-commerce / Retail online" },
  { id: "retail", label: "Retail físico / Cadenas" },
  { id: "industrial", label: "Industrial / Manufactura" },
  { id: "alimentos", label: "Alimentos y bebidas" },
  { id: "farmaceutico", label: "Farmacéutico / Salud" },
  { id: "tecnologia", label: "Tecnología / Electrónica" },
  { id: "automotriz", label: "Automotriz / Autopartes" },
  { id: "textil", label: "Textil / Moda" },
  { id: "otro", label: "Otro" },
];

// Facturación
export const facturacionOptions = [
  { id: "menos-50k", label: "Menos de USD 50.000/mes" },
  { id: "50-200k", label: "USD 50.000 - 200.000/mes" },
  { id: "200-500k", label: "USD 200.000 - 500.000/mes" },
  { id: "500k-1m", label: "USD 500.000 - 1M/mes" },
  { id: "mas-1m", label: "Más de USD 1M/mes" },
];

// Problemáticas
export const problematicasOptions = [
  { id: "costos-altos", label: "Costos logísticos muy altos" },
  { id: "tiempos-entrega", label: "Tiempos de entrega impredecibles" },
  { id: "falta-visibilidad", label: "Falta de visibilidad en la cadena" },
  { id: "problemas-aduana", label: "Problemas con despacho de aduana" },
  { id: "operador-actual", label: "Mal servicio del operador actual" },
  { id: "escalar-operacion", label: "Necesito escalar mi operación" },
  { id: "primera-importacion", label: "No sé cómo hacer mi primera importación" },
  { id: "almacenamiento", label: "Necesito almacenamiento/fulfillment" },
];

// Placeholder para clips de video
export const videoClipsPlaceholder: VideoClip[] = [
  // Clips por nicho
  { id: "nicho-ecommerce", categoria: "nicho", titulo: "Soluciones para E-commerce", duracion: 45, videoUrl: "" },
  { id: "nicho-retail", categoria: "nicho", titulo: "Soluciones para Retail", duracion: 45, videoUrl: "" },
  { id: "nicho-industrial", categoria: "nicho", titulo: "Soluciones para Industria", duracion: 45, videoUrl: "" },
  { id: "nicho-alimentos", categoria: "nicho", titulo: "Soluciones para Alimentos", duracion: 45, videoUrl: "" },
  { id: "nicho-farmaceutico", categoria: "nicho", titulo: "Soluciones para Farma", duracion: 45, videoUrl: "" },
  { id: "nicho-tecnologia", categoria: "nicho", titulo: "Soluciones para Tech", duracion: 45, videoUrl: "" },
  { id: "nicho-automotriz", categoria: "nicho", titulo: "Soluciones para Automotriz", duracion: 45, videoUrl: "" },
  { id: "nicho-textil", categoria: "nicho", titulo: "Soluciones para Textil", duracion: 45, videoUrl: "" },
  { id: "nicho-otro", categoria: "nicho", titulo: "Soluciones Personalizadas", duracion: 45, videoUrl: "" },

  // Clips por facturación
  { id: "fact-menos-50k", categoria: "facturacion", titulo: "Plan Starter", duracion: 30, videoUrl: "" },
  { id: "fact-50-200k", categoria: "facturacion", titulo: "Plan Growth", duracion: 30, videoUrl: "" },
  { id: "fact-200-500k", categoria: "facturacion", titulo: "Plan Business", duracion: 30, videoUrl: "" },
  { id: "fact-500k-1m", categoria: "facturacion", titulo: "Plan Enterprise", duracion: 30, videoUrl: "" },
  { id: "fact-mas-1m", categoria: "facturacion", titulo: "Plan Corporate", duracion: 30, videoUrl: "" },

  // Clips por problemática
  { id: "prob-costos", categoria: "problematica", titulo: "Cómo reducimos costos", duracion: 40, videoUrl: "" },
  { id: "prob-tiempos", categoria: "problematica", titulo: "Tiempos predecibles", duracion: 40, videoUrl: "" },
  { id: "prob-visibilidad", categoria: "problematica", titulo: "Tracking en tiempo real", duracion: 40, videoUrl: "" },
  { id: "prob-aduana", categoria: "problematica", titulo: "Expertos en aduana", duracion: 40, videoUrl: "" },
  { id: "prob-operador", categoria: "problematica", titulo: "Transición sin fricciones", duracion: 40, videoUrl: "" },
  { id: "prob-escalar", categoria: "problematica", titulo: "Escalá tu operación", duracion: 40, videoUrl: "" },
  { id: "prob-primera", categoria: "problematica", titulo: "Tu primera importación", duracion: 40, videoUrl: "" },
  { id: "prob-almacen", categoria: "problematica", titulo: "Fulfillment integral", duracion: 40, videoUrl: "" },

  // Clips de soluciones
  { id: "sol-forwarding", categoria: "solucion", titulo: "Forwarding Internacional", duracion: 35, videoUrl: "" },
  { id: "sol-aduana", categoria: "solucion", titulo: "Despacho de Aduana", duracion: 35, videoUrl: "" },
  { id: "sol-transporte", categoria: "solucion", titulo: "Transporte Nacional", duracion: 35, videoUrl: "" },
  { id: "sol-fulfillment", categoria: "solucion", titulo: "Fulfillment B2B", duracion: 35, videoUrl: "" },

  // Clips generales
  { id: "caso-exito", categoria: "caso_exito", titulo: "Caso de Éxito", duracion: 60, videoUrl: "" },
  { id: "metodologia", categoria: "metodologia", titulo: "Nuestra Metodología", duracion: 45, videoUrl: "" },
  { id: "autoridad", categoria: "autoridad", titulo: "Por qué Altitude", duracion: 40, videoUrl: "" },
  { id: "cta-final", categoria: "cta", titulo: "Próximos Pasos", duracion: 30, videoUrl: "" },
];

// Estados del flujo
export type LeadMagnetStep = "form1" | "vsl" | "form2" | "action_plan" | "calendar";

interface LeadMagnetContextType {
  // Estado actual del flujo
  currentStep: LeadMagnetStep;
  setCurrentStep: (step: LeadMagnetStep) => void;

  // Datos del formulario
  formData: LeadMagnetFormData;
  updateFormData: (data: Partial<LeadMagnetFormData>) => void;

  // Videos seleccionados basados en respuestas
  selectedVideoClips: VideoClip[];

  // Helpers
  getVideoPlaylist: () => VideoClip[];
  getTotalVideoDuration: () => number;
  resetFlow: () => void;
}

const initialFormData: LeadMagnetFormData = {
  nombre: "",
  empresa: "",
  whatsapp: "",
  email: "",
  nicho: "",
  facturacion: "",
  problematicas: [],
  descripcionOperacion: "",
  desafiosPrincipales: "",
  objetivos: "",
  tiempoImplementacion: "",
};

const LeadMagnetContext = createContext<LeadMagnetContextType | undefined>(undefined);

export function LeadMagnetProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<LeadMagnetStep>("form1");
  const [formData, setFormData] = useState<LeadMagnetFormData>(initialFormData);

  const updateFormData = (data: Partial<LeadMagnetFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  // Genera la playlist de videos basada en las respuestas del Form 1
  const getVideoPlaylist = (): VideoClip[] => {
    const playlist: VideoClip[] = [];

    // 1. Clip de nicho
    const nichoClip = videoClipsPlaceholder.find(
      clip => clip.categoria === "nicho" && clip.id === `nicho-${formData.nicho}`
    );
    if (nichoClip) playlist.push(nichoClip);

    // 2. Clip de facturación
    const factClip = videoClipsPlaceholder.find(
      clip => clip.categoria === "facturacion" && clip.id === `fact-${formData.facturacion}`
    );
    if (factClip) playlist.push(factClip);

    // 3. Clips de problemáticas (máximo 3)
    const probClips = formData.problematicas.slice(0, 3).map(prob => {
      const mapping: Record<string, string> = {
        "costos-altos": "prob-costos",
        "tiempos-entrega": "prob-tiempos",
        "falta-visibilidad": "prob-visibilidad",
        "problemas-aduana": "prob-aduana",
        "operador-actual": "prob-operador",
        "escalar-operacion": "prob-escalar",
        "primera-importacion": "prob-primera",
        "almacenamiento": "prob-almacen",
      };
      return videoClipsPlaceholder.find(clip => clip.id === mapping[prob]);
    }).filter(Boolean) as VideoClip[];
    playlist.push(...probClips);

    // 4. Clips de soluciones relevantes
    const solClips = videoClipsPlaceholder.filter(clip => clip.categoria === "solucion").slice(0, 2);
    playlist.push(...solClips);

    // 5. Caso de éxito
    const casoExito = videoClipsPlaceholder.find(clip => clip.categoria === "caso_exito");
    if (casoExito) playlist.push(casoExito);

    // 6. Metodología
    const metodologia = videoClipsPlaceholder.find(clip => clip.categoria === "metodologia");
    if (metodologia) playlist.push(metodologia);

    // 7. Autoridad
    const autoridad = videoClipsPlaceholder.find(clip => clip.categoria === "autoridad");
    if (autoridad) playlist.push(autoridad);

    // 8. CTA final
    const cta = videoClipsPlaceholder.find(clip => clip.categoria === "cta");
    if (cta) playlist.push(cta);

    return playlist;
  };

  const getTotalVideoDuration = (): number => {
    return getVideoPlaylist().reduce((total, clip) => total + clip.duracion, 0);
  };

  const resetFlow = () => {
    setCurrentStep("form1");
    setFormData(initialFormData);
  };

  const selectedVideoClips = getVideoPlaylist();

  return (
    <LeadMagnetContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        formData,
        updateFormData,
        selectedVideoClips,
        getVideoPlaylist,
        getTotalVideoDuration,
        resetFlow,
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
