

## Problem Analysis

The lead submission pipeline has a mismatch between the new 3-step funnel (Perfil/Necesidad/Inversión) and the old database column names. While the `submitLead` function maps new fields to old columns, there are two issues:

1. **TypeScript interface mismatch**: The `Lead` interface in `src/lib/supabase.ts` declares `urgencia: string` (non-nullable), but `submitLead` passes `null`. This can cause silent failures.
2. **Admin display**: The admin panel references old field names and labels inconsistently.
3. **No error feedback**: If the insert fails, the user is silently redirected to WhatsApp anyway.

## Plan

### 1. Fix the Lead interface in `src/lib/supabase.ts`
- Make `urgencia`, `urgencia_label`, `estado`, and `contactado_whatsapp` nullable/optional to match the actual DB schema
- This ensures TypeScript doesn't fight with the null values being passed

### 2. Add error logging to `submitLead` in `src/contexts/LeadMagnetContext.tsx`
- Add a visible error alert (sonner toast) when the Supabase insert fails, so the user knows
- Log the full error details to console for debugging

### 3. Simplify and fix the Admin panel (`src/pages/Admin.tsx`)
- Map display columns clearly to the new funnel:
  - `nicho_label` → "Perfil" (was "Ya importo y quiero mejorar", etc.)
  - `situacion_label` → "Necesidad" (the specific need selected)
  - `facturacion_label` → "Inversión" (the budget range)
  - `problematica_label` → "Mensaje" (free text from form)
- Update the detail modal to show these fields with correct labels
- Update filters to work with the new field values

### 4. Add a test insert mechanism
- After fixing, I'll verify the insert works by checking the actual Supabase error response in the code flow

### Technical Details

The column mapping in `submitLead` reuses old DB columns for new data:
- `nicho` ← perfil ID (A/B/C)
- `situacion` ← necesidad text
- `facturacion` ← inversión ID
- `problematica` ← free-text message

This mapping is correct but the TypeScript types need to allow nulls for the many unused legacy columns.

