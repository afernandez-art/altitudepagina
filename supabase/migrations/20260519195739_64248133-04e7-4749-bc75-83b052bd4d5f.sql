
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  empresa TEXT,
  nicho TEXT NOT NULL,
  nicho_label TEXT NOT NULL,
  situacion TEXT NOT NULL,
  situacion_label TEXT NOT NULL,
  problematica TEXT NOT NULL DEFAULT '',
  problematica_label TEXT NOT NULL DEFAULT '',
  facturacion TEXT NOT NULL,
  facturacion_label TEXT NOT NULL,
  experiencia TEXT,
  experiencia_label TEXT,
  origen TEXT,
  origen_label TEXT,
  mejoras TEXT[],
  mejoras_labels TEXT[],
  volumen TEXT,
  volumen_label TEXT,
  etapa TEXT,
  etapa_label TEXT,
  espacio TEXT,
  espacio_label TEXT,
  servicios_adicionales TEXT[],
  servicios_adicionales_labels TEXT[],
  frecuencia TEXT,
  frecuencia_label TEXT,
  tercerizar TEXT[],
  tercerizar_labels TEXT[],
  urgencia TEXT,
  urgencia_label TEXT,
  estado TEXT DEFAULT 'nuevo',
  contactado_whatsapp BOOLEAN DEFAULT false,
  notas TEXT
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
  ON public.leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update leads"
  ON public.leads FOR UPDATE
  TO authenticated
  USING (true);
