import { createContext, useContext, useState, ReactNode } from "react";

// Tipos para los datos del formulario
export interface LeadMagnetFormData {
  // QUIZ 1 - Captura inicial
  nombre: string;
  email: string;
  whatsapp: string;
  nicho: string;
  problematicas: string[];
  facturacion: string;

  // FORM 2 - Profundización
  empresa: string;
  operacionTags: string[];
  operacionDetalle: string;
  frustracionTags: string[];
  frustracionDetalle: string;
  objetivoPrincipal: string;
  urgencia: string;
}

// Opciones de industria
export const industriasOptions = [
  { id: "ecommerce", label: "E-commerce / Retail online" },
  { id: "industrial", label: "Industrial / Manufactura" },
  { id: "alimentos", label: "Alimentos y bebidas" },
  { id: "farmaceutico", label: "Farmacéutico / Salud" },
  { id: "textil", label: "Textil / Moda" },
  { id: "tecnologia", label: "Tecnología / Electrónica" },
  { id: "automotriz", label: "Automotriz / Autopartes" },
  { id: "otro", label: "Otro" },
];

// Opciones de desafíos/dolores
export const desafiosOptions = [
  { id: "costos-altos", label: "💰 Costos logísticos muy altos" },
  { id: "tiempos-impredecibles", label: "⏱️ Tiempos de entrega impredecibles" },
  { id: "sin-visibilidad", label: "👁️ Falta de visibilidad y tracking" },
  { id: "problemas-aduana", label: "📋 Problemas con aduana / documentación" },
  { id: "mal-servicio", label: "😤 Mal servicio de mi operador actual" },
  { id: "escalar", label: "📈 Necesito escalar pero mi logística no aguanta" },
  { id: "primera-importacion", label: "🆕 Es mi primera importación" },
  { id: "necesito-fulfillment", label: "📦 Necesito fulfillment / almacenamiento" },
];

// Opciones de facturación
export const facturacionOptions = [
  { id: "menos-50k", label: "Menos de USD 50k" },
  { id: "50-200k", label: "USD 50k - 200k" },
  { id: "200-500k", label: "USD 200k - 500k" },
  { id: "500k-1m", label: "USD 500k - 1M" },
  { id: "mas-1m", label: "Más de USD 1M" },
];

// FORM 2 - Opciones de operación actual
export const operacionOptions = [
  { id: "importo-china", label: "Importo de China" },
  { id: "importo-usa-europa", label: "Importo de USA/Europa" },
  { id: "importo-latam", label: "Importo de Latinoamérica" },
  { id: "compro-local", label: "Compro en Argentina" },
  { id: "uso-forwarder", label: "Uso freight forwarder" },
  { id: "despachante-propio", label: "Tengo despachante propio" },
  { id: "tercerizo-todo", label: "Tercerizo toda la logística" },
  { id: "logistica-propia", label: "Manejo logística propia" },
];

// FORM 2 - Opciones de frustraciones
export const frustracionOptions = [
  { id: "demoras-aduana", label: "Demoras en aduana" },
  { id: "sin-tracking", label: "No sé dónde está mi mercadería" },
  { id: "sobrecostos", label: "Costos ocultos / sobrecostos" },
  { id: "documentacion-rechazada", label: "Documentación rechazada" },
  { id: "operador-no-responde", label: "Mi operador no responde" },
  { id: "no-puedo-planificar", label: "No puedo planificar mi inventario" },
  { id: "entregas-lentas", label: "Entregas al cliente final lentas" },
  { id: "falta-capacidad", label: "No tengo capacidad de almacenamiento" },
];

// FORM 2 - Opciones de objetivo principal
export const objetivoOptions = [
  { id: "reducir-costos", label: "Reducir costos logísticos" },
  { id: "acelerar-tiempos", label: "Acelerar tiempos de entrega" },
  { id: "tener-visibilidad", label: "Tener visibilidad en tiempo real" },
  { id: "escalar-volumen", label: "Escalar mi volumen de importación" },
  { id: "stock-argentina", label: "Tener stock en Argentina" },
  { id: "entregas-rapidas", label: "Entregas same-day / next-day a mis clientes" },
  { id: "profesionalizar", label: "Profesionalizar mi operación" },
  { id: "primera-importacion", label: "Hacer mi primera importación con éxito" },
];

// FORM 2 - Opciones de urgencia
export const urgenciaOptions = [
  { id: "inmediato", label: "🔥 Inmediato - tengo un problema urgente" },
  { id: "1-3-meses", label: "📅 En los próximos 1-3 meses" },
  { id: "3-6-meses", label: "📆 En los próximos 3-6 meses" },
  { id: "explorando", label: "🔍 Solo estoy explorando opciones" },
];

// Helper para obtener labels
export const getLabel = (options: { id: string; label: string }[], id: string): string => {
  return options.find(opt => opt.id === id)?.label || id;
};

export const getLabels = (options: { id: string; label: string }[], ids: string[]): string[] => {
  return ids.map(id => getLabel(options, id));
};

// Estados del flujo
export type LeadMagnetStep = "form1" | "vsl" | "form2" | "action_plan" | "calendar";

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
}

const initialFormData: LeadMagnetFormData = {
  nombre: "",
  email: "",
  whatsapp: "",
  nicho: "",
  problematicas: [],
  facturacion: "",
  empresa: "",
  operacionTags: [],
  operacionDetalle: "",
  frustracionTags: [],
  frustracionDetalle: "",
  objetivoPrincipal: "",
  urgencia: "",
};

const LeadMagnetContext = createContext<LeadMagnetContextType | undefined>(undefined);

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

  // Save form data to localStorage for cross-tab communication
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

  // Submit all data to webhook
  const submitToWebhook = async (): Promise<boolean> => {
    const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("Webhook URL not configured");
      return true; // Continue flow even without webhook
    }

    const payload = {
      nombre: formData.nombre,
      email: formData.email,
      whatsapp: formData.whatsapp,
      industria: formData.nicho,
      industriaLabel: getLabel(industriasOptions, formData.nicho),
      problematicas: formData.problematicas,
      problematicasLabels: getLabels(desafiosOptions, formData.problematicas),
      facturacion: formData.facturacion,
      facturacionLabel: getLabel(facturacionOptions, formData.facturacion),
      empresa: formData.empresa,
      operacionTags: formData.operacionTags,
      operacionTagsLabels: getLabels(operacionOptions, formData.operacionTags),
      operacionDetalle: formData.operacionDetalle || null,
      frustracionTags: formData.frustracionTags,
      frustracionTagsLabels: getLabels(frustracionOptions, formData.frustracionTags),
      frustracionDetalle: formData.frustracionDetalle || null,
      objetivoPrincipal: formData.objetivoPrincipal,
      objetivoPrincipalLabel: getLabel(objetivoOptions, formData.objetivoPrincipal),
      urgencia: formData.urgencia,
      urgenciaLabel: getLabel(urgenciaOptions, formData.urgencia),
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error("Webhook error:", response.status);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Webhook error:", error);
      return false;
    }
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
