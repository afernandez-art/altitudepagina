import { supabase } from '@/integrations/supabase/client';

// Tipos de eventos
export type EventType =
  // Página
  | 'page_view'
  | 'page_exit'
  // Formulario
  | 'form_start'
  | 'form_step_complete'
  | 'form_step_view'
  | 'form_abandon'
  | 'form_complete'
  // Interacciones
  | 'button_click'
  | 'link_click'
  | 'video_play'
  | 'video_complete'
  // WhatsApp
  | 'whatsapp_click';

export type EventCategory =
  | 'navigation'
  | 'form1'
  | 'form2'
  | 'engagement'
  | 'conversion';

interface EventData {
  [key: string]: string | number | boolean | null | undefined;
}

// Generar ID único para el visitante (persiste en localStorage)
const getVisitorId = (): string => {
  const key = 'altitude_visitor_id';
  let visitorId = localStorage.getItem(key);
  if (!visitorId) {
    visitorId = `v_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(key, visitorId);
  }
  return visitorId;
};

// Generar ID de sesión (persiste solo durante la sesión)
const getSessionId = (): string => {
  const key = 'altitude_session_id';
  let sessionId = sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId = `s_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(key, sessionId);
  }
  return sessionId;
};

// Función principal para trackear eventos
export const trackEvent = async (
  eventType: EventType,
  eventCategory: EventCategory,
  eventData: EventData = {}
): Promise<void> => {
  try {
    const event = {
      visitor_id: getVisitorId(),
      session_id: getSessionId(),
      event_type: eventType,
      event_category: eventCategory,
      event_data: eventData,
      page_url: window.location.href,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    };

    const { error } = await supabase
      .from('events')
      .insert([event]);

    if (error) {
      console.error('Analytics error:', error);
    }
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

// Helpers específicos para tracking común
export const analytics = {
  // Tracking de páginas
  pageView: (pageName: string) => {
    trackEvent('page_view', 'navigation', { page: pageName });
  },

  // Tracking de formulario 1 (landing)
  form1: {
    start: () => trackEvent('form_start', 'form1', { form: 'calificacion_inicial' }),
    stepView: (step: number, stepName: string) =>
      trackEvent('form_step_view', 'form1', { step, step_name: stepName }),
    stepComplete: (step: number, stepName: string, value: string) =>
      trackEvent('form_step_complete', 'form1', { step, step_name: stepName, value }),
    complete: () => trackEvent('form_complete', 'form1', { form: 'calificacion_inicial' }),
    abandon: (lastStep: number, lastStepName: string) =>
      trackEvent('form_abandon', 'form1', { last_step: lastStep, last_step_name: lastStepName }),
  },

  // Tracking de formulario 2 (video)
  form2: {
    start: (situacion: string) =>
      trackEvent('form_start', 'form2', { form: 'profundizacion', situacion }),
    stepView: (step: number, stepName: string) =>
      trackEvent('form_step_view', 'form2', { step, step_name: stepName }),
    stepComplete: (step: number, stepName: string, value: string) =>
      trackEvent('form_step_complete', 'form2', { step, step_name: stepName, value }),
    complete: () => trackEvent('form_complete', 'form2', { form: 'profundizacion' }),
    abandon: (lastStep: number, lastStepName: string) =>
      trackEvent('form_abandon', 'form2', { last_step: lastStep, last_step_name: lastStepName }),
  },

  // Tracking de video
  video: {
    play: () => trackEvent('video_play', 'engagement', {}),
    complete: () => trackEvent('video_complete', 'engagement', {}),
  },

  // Tracking de conversión
  conversion: {
    whatsappClick: () => trackEvent('whatsapp_click', 'conversion', {}),
  },

  // Tracking de clicks genéricos
  click: (buttonName: string, location: string) =>
    trackEvent('button_click', 'engagement', { button: buttonName, location }),
};

// Detectar abandono de página
export const setupAbandonTracking = (formStep: number, formName: string, stepName: string) => {
  const handleBeforeUnload = () => {
    // Usar sendBeacon para enviar datos antes de cerrar
    const event = {
      visitor_id: getVisitorId(),
      session_id: getSessionId(),
      event_type: 'form_abandon',
      event_category: formName === 'form1' ? 'form1' : 'form2',
      event_data: { last_step: formStep, last_step_name: stepName, form: formName },
      page_url: window.location.href,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    };

    // Intentar enviar con sendBeacon (más confiable al cerrar)
    const blob = new Blob([JSON.stringify(event)], { type: 'application/json' });
    navigator.sendBeacon?.('/api/track-abandon', blob);
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
};

// Obtener métricas para el dashboard
export const getAnalyticsData = async (days: number = 30) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching analytics:', error);
    return null;
  }

  return data;
};

// Calcular métricas del embudo
export const calculateFunnelMetrics = (events: any[]) => {
  const uniqueVisitors = new Set(events.map(e => e.visitor_id)).size;

  // Contar eventos únicos por visitor_id
  const getUniqueCount = (eventType: string, category?: string) => {
    const filtered = events.filter(e =>
      e.event_type === eventType &&
      (category ? e.event_category === category : true)
    );
    return new Set(filtered.map(e => e.visitor_id)).size;
  };

  // Embudo
  const funnel = {
    visitors: uniqueVisitors,
    form1Start: getUniqueCount('form_start', 'form1'),
    form1Complete: getUniqueCount('form_complete', 'form1'),
    form2Start: getUniqueCount('form_start', 'form2'),
    form2Complete: getUniqueCount('form_complete', 'form2'),
    whatsappClick: getUniqueCount('whatsapp_click'),
  };

  // Tasas de conversión
  const rates = {
    form1StartRate: funnel.visitors > 0 ? (funnel.form1Start / funnel.visitors * 100).toFixed(1) : '0',
    form1CompleteRate: funnel.form1Start > 0 ? (funnel.form1Complete / funnel.form1Start * 100).toFixed(1) : '0',
    form2StartRate: funnel.form1Complete > 0 ? (funnel.form2Start / funnel.form1Complete * 100).toFixed(1) : '0',
    form2CompleteRate: funnel.form2Start > 0 ? (funnel.form2Complete / funnel.form2Start * 100).toFixed(1) : '0',
    whatsappRate: funnel.form2Complete > 0 ? (funnel.whatsappClick / funnel.form2Complete * 100).toFixed(1) : '0',
    overallConversion: funnel.visitors > 0 ? (funnel.whatsappClick / funnel.visitors * 100).toFixed(1) : '0',
  };

  // Abandonos por paso
  const form1Steps = ['nicho', 'situacion', 'problematica', 'facturacion'];
  const form1Abandons = form1Steps.map(step => {
    const abandons = events.filter(e =>
      e.event_type === 'form_abandon' &&
      e.event_category === 'form1' &&
      e.event_data?.last_step_name === step
    );
    return { step, count: new Set(abandons.map(e => e.visitor_id)).size };
  });

  // Clicks en botones
  const buttonClicks = events
    .filter(e => e.event_type === 'button_click')
    .reduce((acc: Record<string, number>, e) => {
      const key = `${e.event_data?.button || 'unknown'} (${e.event_data?.location || 'unknown'})`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

  return { funnel, rates, form1Abandons, buttonClicks };
};
