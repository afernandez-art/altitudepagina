import { supabase } from '@/integrations/supabase/client';

export { supabase };

// Type for leads table
export interface Lead {
  id?: string;
  created_at?: string;

  // Contact info
  nombre: string;
  email: string;
  whatsapp: string;
  empresa: string | null;

  // Form 1
  nicho: string;
  nicho_label: string;
  situacion: string;
  situacion_label: string;
  problematica: string;
  problematica_label: string;
  facturacion: string;
  facturacion_label: string;

  // Form 2 - dynamic fields
  experiencia: string | null;
  experiencia_label: string | null;
  origen: string | null;
  origen_label: string | null;
  mejoras: string[] | null;
  mejoras_labels: string[] | null;
  volumen: string | null;
  volumen_label: string | null;
  etapa: string | null;
  etapa_label: string | null;
  espacio: string | null;
  espacio_label: string | null;
  servicios_adicionales: string[] | null;
  servicios_adicionales_labels: string[] | null;
  frecuencia: string | null;
  frecuencia_label: string | null;
  tercerizar: string[] | null;
  tercerizar_labels: string[] | null;

  // Final
  urgencia: string;
  urgencia_label: string;

  // Status tracking
  estado: string;
  contactado_whatsapp: boolean;
  notas: string | null;
}

// Save lead to Supabase
export const saveLead = async (lead: Omit<Lead, 'id' | 'created_at'>): Promise<{ data: Lead | null; error: Error | null }> => {
  try {
    // Don't use .select() after insert - anon users can INSERT but not SELECT with RLS
    const { error } = await supabase
      .from('leads')
      .insert([lead]);

    if (error) throw error;
    return { data: null, error: null }; // Return null data, insert succeeded
  } catch (error) {
    console.error('Error saving lead:', error);
    return { data: null, error: error as Error };
  }
};

// Get all leads
export const getLeads = async (): Promise<{ data: Lead[] | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching leads:', error);
    return { data: null, error: error as Error };
  }
};

// Update lead status
export const updateLeadStatus = async (
  id: string,
  updates: Partial<Pick<Lead, 'estado' | 'contactado_whatsapp' | 'notas'>>
): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error updating lead:', error);
    return { error: error as Error };
  }
};

// Check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return true; // Always configured when using the integration client
};
