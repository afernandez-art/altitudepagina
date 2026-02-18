-- ===========================================
-- SCHEMA PARA ADUANEX - LEADS
-- Ejecutar este SQL en tu proyecto de Supabase
-- ===========================================

-- Crear tabla de leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Datos de contacto
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  empresa TEXT,

  -- Form 1 - Calificación inicial
  nicho TEXT NOT NULL,
  nicho_label TEXT NOT NULL,
  situacion TEXT NOT NULL,
  situacion_label TEXT NOT NULL,
  problematica TEXT NOT NULL,
  problematica_label TEXT NOT NULL,
  facturacion TEXT NOT NULL,
  facturacion_label TEXT NOT NULL,

  -- Form 2 - Campos dinámicos (pueden ser NULL según situación)
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

  -- Urgencia
  urgencia TEXT NOT NULL,
  urgencia_label TEXT NOT NULL,

  -- Estado y tracking
  estado TEXT DEFAULT 'nuevo',
  contactado_whatsapp BOOLEAN DEFAULT FALSE,
  notas TEXT
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_situacion ON leads(situacion);
CREATE INDEX IF NOT EXISTS idx_leads_estado ON leads(estado);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Habilitar Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT desde el frontend (anon)
CREATE POLICY "Allow anonymous insert" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Política para permitir SELECT solo a usuarios autenticados
CREATE POLICY "Allow authenticated select" ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Política para permitir UPDATE solo a usuarios autenticados
CREATE POLICY "Allow authenticated update" ON leads
  FOR UPDATE
  TO authenticated
  USING (true);

-- Si querés permitir SELECT también para anon (para el admin simple con password):
-- Descomenta la siguiente línea:
CREATE POLICY "Allow anon select" ON leads
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anon update" ON leads
  FOR UPDATE
  TO anon
  USING (true);

-- ===========================================
-- INSTRUCCIONES:
-- 1. Ve a tu proyecto en supabase.com
-- 2. SQL Editor > New Query
-- 3. Pega este código y ejecuta
-- 4. Copia tu URL y anon key de Settings > API
-- 5. Agrega al .env:
--    VITE_SUPABASE_URL=https://xxxxx.supabase.co
--    VITE_SUPABASE_ANON_KEY=eyJhbGciOiJI...
-- ===========================================
