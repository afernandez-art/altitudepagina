
-- Drop all RESTRICTIVE policies on leads and recreate as PERMISSIVE
DROP POLICY IF EXISTS "Allow anonymous insert" ON leads;
DROP POLICY IF EXISTS "Anon can insert leads" ON leads;
DROP POLICY IF EXISTS "Authenticated can view leads" ON leads;
DROP POLICY IF EXISTS "Authenticated can update leads" ON leads;
DROP POLICY IF EXISTS "Allow anon select" ON leads;
DROP POLICY IF EXISTS "Allow anon update" ON leads;
DROP POLICY IF EXISTS "Allow authenticated select" ON leads;
DROP POLICY IF EXISTS "Allow authenticated update" ON leads;

-- Recreate as PERMISSIVE policies
CREATE POLICY "anon_insert_leads" ON leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "authenticated_select_leads" ON leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "authenticated_update_leads" ON leads FOR UPDATE TO authenticated USING (true);

-- Fix events table too
DROP POLICY IF EXISTS "Allow anon insert events" ON events;
DROP POLICY IF EXISTS "Allow anon select events" ON events;
DROP POLICY IF EXISTS "Anon can insert events" ON events;
DROP POLICY IF EXISTS "Authenticated can view events" ON events;

CREATE POLICY "anon_insert_events" ON events FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "authenticated_select_events" ON events FOR SELECT TO authenticated USING (true);
