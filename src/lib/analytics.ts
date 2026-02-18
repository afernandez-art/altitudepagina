import { supabase } from '@/integrations/supabase/client';

// Tipos de eventos
export type EventType =
  // Página
  | 'page_view'
  | 'page_exit'
  | 'scroll_depth'
  // Formulario
  | 'form_start'
  | 'form_step_complete'
  | 'form_step_view'
  | 'form_abandon'
  | 'form_complete'
  | 'form_time'
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
  const key = 'aduanex_visitor_id';
  let visitorId = localStorage.getItem(key);
  if (!visitorId) {
    visitorId = `v_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(key, visitorId);
  }
  return visitorId;
};

// Generar ID de sesión (persiste solo durante la sesión)
const getSessionId = (): string => {
  const key = 'aduanex_session_id';
  let sessionId = sessionStorage.getItem(key);
  if (!sessionId) {
    sessionId = `s_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(key, sessionId);
  }
  return sessionId;
};

// Detectar tipo de dispositivo
const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

// Obtener parámetros UTM de la URL
const getUTMParams = (): Record<string, string> => {
  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};

  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    const value = params.get(param);
    if (value) {
      utmParams[param] = value;
    }
  });

  // Guardar UTMs en sessionStorage para persistir durante la sesión
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem('aduanex_utm', JSON.stringify(utmParams));
  }

  // Recuperar UTMs guardados si no hay nuevos
  const savedUtm = sessionStorage.getItem('aduanex_utm');
  if (savedUtm && Object.keys(utmParams).length === 0) {
    return JSON.parse(savedUtm);
  }

  return utmParams;
};

// Función principal para trackear eventos
export const trackEvent = async (
  eventType: EventType,
  eventCategory: EventCategory,
  eventData: EventData = {}
): Promise<void> => {
  try {
    const utmParams = getUTMParams();
    const deviceType = getDeviceType();

    const event = {
      visitor_id: getVisitorId(),
      session_id: getSessionId(),
      event_type: eventType,
      event_category: eventCategory,
      event_data: {
        ...eventData,
        device_type: deviceType,
        ...utmParams,
      },
      page_url: window.location.href,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('events')
      .insert([event]);

    if (error) {
      console.error('Analytics error:', error);
    }
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

// Timer para medir tiempo de completado
class FormTimer {
  private startTime: number | null = null;
  private stepTimes: Record<string, number> = {};

  start() {
    this.startTime = Date.now();
    this.stepTimes = {};
  }

  markStep(stepName: string) {
    if (this.startTime) {
      this.stepTimes[stepName] = Date.now() - this.startTime;
    }
  }

  getElapsedSeconds(): number {
    if (!this.startTime) return 0;
    return Math.round((Date.now() - this.startTime) / 1000);
  }

  getStepTimes(): Record<string, number> {
    return this.stepTimes;
  }
}

// Instancias de timer para cada formulario
export const form1Timer = new FormTimer();
export const form2Timer = new FormTimer();

// Helpers específicos para tracking común
export const analytics = {
  // Tracking de páginas
  pageView: (pageName: string) => {
    trackEvent('page_view', 'navigation', { page: pageName });
  },

  // Tracking de formulario 1 (landing)
  form1: {
    start: () => {
      form1Timer.start();
      trackEvent('form_start', 'form1', { form: 'calificacion_inicial' });
    },
    stepView: (step: number, stepName: string) =>
      trackEvent('form_step_view', 'form1', { step, step_name: stepName }),
    stepComplete: (step: number, stepName: string, value: string) => {
      form1Timer.markStep(stepName);
      trackEvent('form_step_complete', 'form1', {
        step,
        step_name: stepName,
        value,
        time_elapsed: form1Timer.getElapsedSeconds()
      });
    },
    complete: () => {
      const totalTime = form1Timer.getElapsedSeconds();
      trackEvent('form_complete', 'form1', {
        form: 'calificacion_inicial',
        completion_time_seconds: totalTime
      });
      trackEvent('form_time', 'form1', {
        form: 'calificacion_inicial',
        total_seconds: totalTime,
        step_times: JSON.stringify(form1Timer.getStepTimes())
      });
    },
    abandon: (lastStep: number, lastStepName: string) =>
      trackEvent('form_abandon', 'form1', {
        last_step: lastStep,
        last_step_name: lastStepName,
        time_before_abandon: form1Timer.getElapsedSeconds()
      }),
  },

  // Tracking de formulario 2 (video)
  form2: {
    start: (situacion: string) => {
      form2Timer.start();
      trackEvent('form_start', 'form2', { form: 'profundizacion', situacion });
    },
    stepView: (step: number, stepName: string) =>
      trackEvent('form_step_view', 'form2', { step, step_name: stepName }),
    stepComplete: (step: number, stepName: string, value: string) => {
      form2Timer.markStep(stepName);
      trackEvent('form_step_complete', 'form2', {
        step,
        step_name: stepName,
        value,
        time_elapsed: form2Timer.getElapsedSeconds()
      });
    },
    complete: () => {
      const totalTime = form2Timer.getElapsedSeconds();
      trackEvent('form_complete', 'form2', {
        form: 'profundizacion',
        completion_time_seconds: totalTime
      });
      trackEvent('form_time', 'form2', {
        form: 'profundizacion',
        total_seconds: totalTime,
        step_times: JSON.stringify(form2Timer.getStepTimes())
      });
    },
    abandon: (lastStep: number, lastStepName: string) =>
      trackEvent('form_abandon', 'form2', {
        last_step: lastStep,
        last_step_name: lastStepName,
        time_before_abandon: form2Timer.getElapsedSeconds()
      }),
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

  // Tracking de scroll depth
  scrollDepth: (depth: number, page: string) =>
    trackEvent('scroll_depth', 'engagement', { depth_percent: depth, page }),
};

// Setup scroll depth tracking
export const setupScrollTracking = (page: string) => {
  let maxScroll = 0;
  const milestones = [25, 50, 75, 100];
  const trackedMilestones = new Set<number>();

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;

      // Track milestones
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
          trackedMilestones.add(milestone);
          analytics.scrollDepth(milestone, page);
        }
      });
    }
  };

  // Throttle scroll events
  let ticking = false;
  const throttledScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', throttledScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', throttledScroll);
  };
};

// Detectar abandono de página
export const setupAbandonTracking = (formStep: number, formName: string, stepName: string) => {
  const handleBeforeUnload = () => {
    const event = {
      visitor_id: getVisitorId(),
      session_id: getSessionId(),
      event_type: 'form_abandon',
      event_category: formName === 'form1' ? 'form1' : 'form2',
      event_data: {
        last_step: formStep,
        last_step_name: stepName,
        form: formName,
        time_before_abandon: formName === 'form1' ? form1Timer.getElapsedSeconds() : form2Timer.getElapsedSeconds()
      },
      page_url: window.location.href,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    };

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
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

// Calcular métricas extendidas
export const calculateExtendedMetrics = (events: any[]) => {
  // Dispositivos
  const deviceCounts: Record<string, number> = { mobile: 0, tablet: 0, desktop: 0 };
  const pageViews = events.filter(e => e.event_type === 'page_view');
  pageViews.forEach(e => {
    const device = e.event_data?.device_type || 'desktop';
    deviceCounts[device] = (deviceCounts[device] || 0) + 1;
  });

  // Fuentes de tráfico (UTM)
  const trafficSources: Record<string, number> = {};
  const visitorsWithUtm = events.filter(e => e.event_type === 'page_view' && e.event_data?.utm_source);
  visitorsWithUtm.forEach(e => {
    const source = e.event_data?.utm_source || 'direct';
    trafficSources[source] = (trafficSources[source] || 0) + 1;
  });
  // Agregar directo
  const directVisits = pageViews.length - visitorsWithUtm.length;
  if (directVisits > 0) {
    trafficSources['direct'] = directVisits;
  }

  // Tiempo promedio de completado
  const form1Times = events
    .filter(e => e.event_type === 'form_time' && e.event_category === 'form1')
    .map(e => e.event_data?.total_seconds || 0)
    .filter(t => t > 0);

  const form2Times = events
    .filter(e => e.event_type === 'form_time' && e.event_category === 'form2')
    .map(e => e.event_data?.total_seconds || 0)
    .filter(t => t > 0);

  const avgForm1Time = form1Times.length > 0
    ? Math.round(form1Times.reduce((a, b) => a + b, 0) / form1Times.length)
    : 0;

  const avgForm2Time = form2Times.length > 0
    ? Math.round(form2Times.reduce((a, b) => a + b, 0) / form2Times.length)
    : 0;

  // Hora pico (distribución por hora)
  const hourDistribution: number[] = new Array(24).fill(0);
  events.forEach(e => {
    const hour = new Date(e.created_at).getHours();
    hourDistribution[hour]++;
  });

  // Día de la semana
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const dayDistribution: Record<string, number> = {};
  dayNames.forEach(d => dayDistribution[d] = 0);
  events.forEach(e => {
    const day = dayNames[new Date(e.created_at).getDay()];
    dayDistribution[day]++;
  });

  // Scroll depth promedio
  const scrollEvents = events.filter(e => e.event_type === 'scroll_depth');
  const maxScrollByVisitor: Record<string, number> = {};
  scrollEvents.forEach(e => {
    const depth = e.event_data?.depth_percent || 0;
    const visitor = e.visitor_id;
    if (!maxScrollByVisitor[visitor] || depth > maxScrollByVisitor[visitor]) {
      maxScrollByVisitor[visitor] = depth;
    }
  });
  const scrollValues = Object.values(maxScrollByVisitor);
  const avgScrollDepth = scrollValues.length > 0
    ? Math.round(scrollValues.reduce((a, b) => a + b, 0) / scrollValues.length)
    : 0;

  // Distribución de scroll
  const scrollDistribution = { '25%': 0, '50%': 0, '75%': 0, '100%': 0 };
  scrollEvents.forEach(e => {
    const depth = e.event_data?.depth_percent;
    if (depth === 25) scrollDistribution['25%']++;
    else if (depth === 50) scrollDistribution['50%']++;
    else if (depth === 75) scrollDistribution['75%']++;
    else if (depth === 100) scrollDistribution['100%']++;
  });

  // Distribución de respuestas Form 1
  const form1Responses: Record<string, Record<string, number>> = {
    nicho: {},
    situacion: {},
    problematica: {},
    facturacion: {},
  };

  events
    .filter(e => e.event_type === 'form_step_complete' && e.event_category === 'form1')
    .forEach(e => {
      const stepName = e.event_data?.step_name;
      const value = e.event_data?.value;
      if (stepName && value && form1Responses[stepName]) {
        form1Responses[stepName][value] = (form1Responses[stepName][value] || 0) + 1;
      }
    });

  // Conversión por dispositivo
  const conversionByDevice: Record<string, { visitors: number; conversions: number; rate: string }> = {};
  ['mobile', 'tablet', 'desktop'].forEach(device => {
    const deviceVisitors = new Set(
      events.filter(e => e.event_type === 'page_view' && e.event_data?.device_type === device)
        .map(e => e.visitor_id)
    );
    const deviceConversions = new Set(
      events.filter(e => e.event_type === 'whatsapp_click' && e.event_data?.device_type === device)
        .map(e => e.visitor_id)
    );
    const visitors = deviceVisitors.size;
    const conversions = deviceConversions.size;
    conversionByDevice[device] = {
      visitors,
      conversions,
      rate: visitors > 0 ? (conversions / visitors * 100).toFixed(1) : '0'
    };
  });

  // Conversión por fuente UTM
  const conversionBySource: Record<string, { visitors: number; conversions: number; rate: string }> = {};
  Object.keys(trafficSources).forEach(source => {
    const sourceVisitors = new Set(
      events.filter(e =>
        e.event_type === 'page_view' &&
        (source === 'direct' ? !e.event_data?.utm_source : e.event_data?.utm_source === source)
      ).map(e => e.visitor_id)
    );
    const sourceConversions = new Set(
      events.filter(e =>
        e.event_type === 'whatsapp_click' &&
        (source === 'direct' ? !e.event_data?.utm_source : e.event_data?.utm_source === source)
      ).map(e => e.visitor_id)
    );
    const visitors = sourceVisitors.size;
    const conversions = sourceConversions.size;
    conversionBySource[source] = {
      visitors,
      conversions,
      rate: visitors > 0 ? (conversions / visitors * 100).toFixed(1) : '0'
    };
  });

  return {
    devices: deviceCounts,
    trafficSources,
    avgCompletionTime: {
      form1: avgForm1Time,
      form2: avgForm2Time,
    },
    hourDistribution,
    dayDistribution,
    scrollDepth: {
      average: avgScrollDepth,
      distribution: scrollDistribution,
    },
    form1Responses,
    conversionByDevice,
    conversionBySource,
  };
};
