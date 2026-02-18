import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  LogOut,
  RefreshCw,
  Download,
  Search,
  Filter,
  Eye,
  X,
  MessageCircle,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Building,
  Mail,
  Phone,
  Calendar,
  Target,
  AlertTriangle,
  Package,
  Save,
  BarChart3,
  Users,
  TrendingUp,
  ArrowRight,
  MousePointer,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Timer,
  ArrowDown,
  PieChart,
  Loader2,
} from "lucide-react";
import { getLeads, updateLeadStatus, Lead, isSupabaseConfigured } from "@/lib/supabase";
import { getAnalyticsData, calculateFunnelMetrics, calculateExtendedMetrics } from "@/lib/analytics";
import { useAuth } from "@/hooks/useAuth";

// Estados disponibles para leads
const estadosOptions = [
  { id: "nuevo", label: "Nuevo", color: "bg-blue-500" },
  { id: "contactado", label: "Contactado", color: "bg-yellow-500" },
  { id: "en_proceso", label: "En proceso", color: "bg-purple-500" },
  { id: "cerrado_ganado", label: "Cerrado - Ganado", color: "bg-green-500" },
  { id: "cerrado_perdido", label: "Cerrado - Perdido", color: "bg-red-500" },
];

const getEstadoConfig = (estado: string) => {
  return estadosOptions.find(e => e.id === estado) || estadosOptions[0];
};

// Tipos para métricas
interface FunnelMetrics {
  funnel: {
    visitors: number;
    form1Start: number;
    form1Complete: number;
    form2Start: number;
    form2Complete: number;
    whatsappClick: number;
  };
  rates: {
    form1StartRate: string;
    form1CompleteRate: string;
    form2StartRate: string;
    form2CompleteRate: string;
    whatsappRate: string;
    overallConversion: string;
  };
  form1Abandons: { step: string; count: number }[];
  buttonClicks: Record<string, number>;
}

interface ExtendedMetrics {
  devices: Record<string, number>;
  trafficSources: Record<string, number>;
  avgCompletionTime: { form1: number; form2: number };
  hourDistribution: number[];
  dayDistribution: Record<string, number>;
  scrollDepth: { average: number; distribution: Record<string, number> };
  form1Responses: Record<string, Record<string, number>>;
  conversionByDevice: Record<string, { visitors: number; conversions: number; rate: string }>;
  conversionBySource: Record<string, { visitors: number; conversions: number; rate: string }>;
}

const Admin = () => {
  // Auth state
  const { user, loading: authLoading, isAuthenticated, signIn, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSituacion, setFilterSituacion] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editingNotas, setEditingNotas] = useState("");
  const [editingEstado, setEditingEstado] = useState("");
  const [saving, setSaving] = useState(false);

  // Métricas
  const [activeTab, setActiveTab] = useState<"leads" | "metrics">("leads");
  const [metrics, setMetrics] = useState<FunnelMetrics | null>(null);
  const [extendedMetrics, setExtendedMetrics] = useState<ExtendedMetrics | null>(null);
  const [metricsLoading, setMetricsLoading] = useState(false);
  const [metricsDays, setMetricsDays] = useState(30);

  // Load leads when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    const { error } = await signIn(email, password);

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        setLoginError("Email o contraseña incorrectos");
      } else if (error.message.includes("Email not confirmed")) {
        setLoginError("Confirmá tu email antes de iniciar sesión");
      } else {
        setLoginError(error.message);
      }
    }

    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await signOut();
  };

  const loadLeads = async () => {
    setLoading(true);
    const { data, error } = await getLeads();
    if (data) {
      setLeads(data);
    }
    if (error) {
      console.error("Error loading leads:", error);
    }
    setLoading(false);
  };

  const loadMetrics = async () => {
    setMetricsLoading(true);
    const events = await getAnalyticsData(metricsDays);
    if (events) {
      const calculatedMetrics = calculateFunnelMetrics(events);
      const calculatedExtended = calculateExtendedMetrics(events);
      setMetrics(calculatedMetrics);
      setExtendedMetrics(calculatedExtended);
    }
    setMetricsLoading(false);
  };

  // Load metrics when tab changes or days change
  useEffect(() => {
    if (isAuthenticated && activeTab === "metrics") {
      loadMetrics();
    }
  }, [isAuthenticated, activeTab, metricsDays]);

  const handleSaveLead = async () => {
    if (!selectedLead?.id) return;
    setSaving(true);

    await updateLeadStatus(selectedLead.id, {
      estado: editingEstado || selectedLead.estado,
      notas: editingNotas,
    });

    // Refresh leads
    await loadLeads();

    // Update selected lead
    setSelectedLead(prev => prev ? {
      ...prev,
      estado: editingEstado || prev.estado,
      notas: editingNotas,
    } : null);

    setSaving(false);
  };

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
    setEditingNotas(lead.notas || "");
    setEditingEstado(lead.estado);
  };

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.empresa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp.includes(searchTerm);

    const matchesSituacion = !filterSituacion || lead.situacion === filterSituacion;
    const matchesEstado = !filterEstado || lead.estado === filterEstado;

    return matchesSearch && matchesSituacion && matchesEstado;
  });

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "Fecha", "Nombre", "Email", "WhatsApp", "Empresa",
      "Nicho", "Situación", "Problemática", "Facturación",
      "Urgencia", "Estado", "Notas"
    ];

    const rows = filteredLeads.map(lead => [
      new Date(lead.created_at || "").toLocaleDateString("es-AR"),
      lead.nombre,
      lead.email,
      lead.whatsapp,
      lead.empresa || "",
      lead.nicho_label,
      lead.situacion_label,
      lead.problematica_label,
      lead.facturacion_label,
      lead.urgencia_label,
      getEstadoConfig(lead.estado).label,
      lead.notas || ""
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `leads_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card p-8 rounded-2xl border border-zinc-800 max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-black mb-2">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Ingresá tus credenciales para acceder</p>
          </div>

          {!isSupabaseConfigured() && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-500">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Supabase no está configurado. Agregá VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY al .env
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Email</label>
              <input
                type="email"
                placeholder="admin@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-secondary border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-primary"
                required
                disabled={loginLoading}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-secondary border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-primary"
                required
                disabled={loginLoading}
              />
            </div>
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-500 text-sm">{loginError}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Ingresando...
                </>
              ) : (
                "Ingresar"
              )}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            <a href="/" className="hover:text-primary">← Volver al sitio</a>
          </p>
        </motion.div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-black">Admin Dashboard</h1>
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("leads")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === "leads"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                }`}
              >
                <Users className="w-4 h-4" />
                Leads
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {leads.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("metrics")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeTab === "metrics"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Métricas
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={activeTab === "leads" ? loadLeads : loadMetrics}
              disabled={loading || metricsLoading}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              title="Actualizar"
            >
              <RefreshCw className={`w-5 h-5 ${(loading || metricsLoading) ? "animate-spin" : ""}`} />
            </button>
            {activeTab === "leads" && (
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                Exportar CSV
              </button>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-500 text-sm"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Metrics Tab */}
        {activeTab === "metrics" && (
          <div className="space-y-6">
            {/* Period Selector */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Métricas del Embudo</h2>
              <select
                value={metricsDays}
                onChange={(e) => setMetricsDays(Number(e.target.value))}
                className="bg-secondary border border-zinc-700 rounded-lg px-3 py-2 text-sm"
              >
                <option value={7}>Últimos 7 días</option>
                <option value={30}>Últimos 30 días</option>
                <option value={90}>Últimos 90 días</option>
              </select>
            </div>

            {metricsLoading ? (
              <div className="bg-card rounded-xl border border-zinc-800 p-12 text-center">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Cargando métricas...</p>
              </div>
            ) : !metrics ? (
              <div className="bg-card rounded-xl border border-zinc-800 p-12 text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">No hay datos de métricas</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Asegurate de haber creado la tabla "events" en Supabase
                </p>
              </div>
            ) : (
              <>
                {/* KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-card rounded-xl border border-zinc-800 p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Visitantes</span>
                    </div>
                    <p className="text-3xl font-black">{metrics.funnel.visitors}</p>
                  </div>
                  <div className="bg-card rounded-xl border border-zinc-800 p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Leads completos</span>
                    </div>
                    <p className="text-3xl font-black">{metrics.funnel.form2Complete}</p>
                  </div>
                  <div className="bg-card rounded-xl border border-zinc-800 p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-emerald-500" />
                      </div>
                      <span className="text-sm text-muted-foreground">Clicks WhatsApp</span>
                    </div>
                    <p className="text-3xl font-black">{metrics.funnel.whatsappClick}</p>
                  </div>
                  <div className="bg-card rounded-xl border border-zinc-800 p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">Conversión total</span>
                    </div>
                    <p className="text-3xl font-black">{metrics.rates.overallConversion}%</p>
                  </div>
                </div>

                {/* Funnel Chart */}
                <div className="bg-card rounded-xl border border-zinc-800 p-6">
                  <h3 className="font-bold mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Embudo de Conversión
                  </h3>
                  <div className="space-y-4">
                    {/* Funnel Steps */}
                    {[
                      { label: "Visitantes", value: metrics.funnel.visitors, rate: "100%" },
                      { label: "Iniciaron Form 1", value: metrics.funnel.form1Start, rate: `${metrics.rates.form1StartRate}%` },
                      { label: "Completaron Form 1", value: metrics.funnel.form1Complete, rate: `${metrics.rates.form1CompleteRate}%` },
                      { label: "Iniciaron Form 2", value: metrics.funnel.form2Start, rate: `${metrics.rates.form2StartRate}%` },
                      { label: "Completaron Form 2", value: metrics.funnel.form2Complete, rate: `${metrics.rates.form2CompleteRate}%` },
                      { label: "Click WhatsApp", value: metrics.funnel.whatsappClick, rate: `${metrics.rates.whatsappRate}%` },
                    ].map((step, index, arr) => {
                      const maxValue = arr[0].value || 1;
                      const widthPercent = (step.value / maxValue) * 100;
                      const colors = [
                        "bg-blue-500",
                        "bg-cyan-500",
                        "bg-teal-500",
                        "bg-emerald-500",
                        "bg-green-500",
                        "bg-lime-500",
                      ];
                      return (
                        <div key={step.label} className="relative">
                          <div className="flex items-center justify-between mb-1 text-sm">
                            <div className="flex items-center gap-2">
                              {index > 0 && <ArrowRight className="w-3 h-3 text-muted-foreground" />}
                              <span>{step.label}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-bold">{step.value}</span>
                              <span className="text-muted-foreground text-xs w-12 text-right">{step.rate}</span>
                            </div>
                          </div>
                          <div className="h-8 bg-secondary/50 rounded-lg overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${widthPercent}%` }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className={`h-full ${colors[index]} rounded-lg`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Abandonment by Step */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card rounded-xl border border-zinc-800 p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      Abandonos Form 1 (por paso)
                    </h3>
                    <div className="space-y-3">
                      {metrics.form1Abandons.map((abandon) => (
                        <div key={abandon.step} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{abandon.step}</span>
                          <span className="font-bold text-yellow-500">{abandon.count}</span>
                        </div>
                      ))}
                      {metrics.form1Abandons.every(a => a.count === 0) && (
                        <p className="text-sm text-muted-foreground">Sin abandonos registrados</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-card rounded-xl border border-zinc-800 p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <MousePointer className="w-5 h-5 text-primary" />
                      Clicks en botones
                    </h3>
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      {Object.entries(metrics.buttonClicks).length > 0 ? (
                        Object.entries(metrics.buttonClicks)
                          .sort(([, a], [, b]) => b - a)
                          .slice(0, 10)
                          .map(([button, count]) => (
                            <div key={button} className="flex items-center justify-between">
                              <span className="text-sm truncate max-w-[200px]">{button}</span>
                              <span className="font-bold">{count}</span>
                            </div>
                          ))
                      ) : (
                        <p className="text-sm text-muted-foreground">Sin clicks registrados</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Extended Metrics */}
                {extendedMetrics && (
                  <>
                    {/* Dispositivos y Fuentes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Dispositivos */}
                      <div className="bg-card rounded-xl border border-zinc-800 p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                          <Monitor className="w-5 h-5 text-primary" />
                          Dispositivos
                        </h3>
                        <div className="space-y-3">
                          {[
                            { key: 'desktop', icon: Monitor, label: 'Desktop' },
                            { key: 'mobile', icon: Smartphone, label: 'Mobile' },
                            { key: 'tablet', icon: Tablet, label: 'Tablet' },
                          ].map(({ key, icon: Icon, label }) => {
                            const count = extendedMetrics.devices[key] || 0;
                            const total = Object.values(extendedMetrics.devices).reduce((a, b) => a + b, 0) || 1;
                            const percent = ((count / total) * 100).toFixed(1);
                            const conversion = extendedMetrics.conversionByDevice[key];
                            return (
                              <div key={key} className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Icon className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">{label}</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="font-bold">{count}</span>
                                    <span className="text-xs text-muted-foreground ml-2">({percent}%)</span>
                                  </div>
                                </div>
                                {conversion && (
                                  <div className="text-xs text-muted-foreground pl-6">
                                    Conv: {conversion.rate}% ({conversion.conversions}/{conversion.visitors})
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Fuentes de tráfico */}
                      <div className="bg-card rounded-xl border border-zinc-800 p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                          <Globe className="w-5 h-5 text-primary" />
                          Fuentes de Tráfico (UTM)
                        </h3>
                        <div className="space-y-3 max-h-48 overflow-y-auto">
                          {Object.entries(extendedMetrics.trafficSources).length > 0 ? (
                            Object.entries(extendedMetrics.trafficSources)
                              .sort(([, a], [, b]) => b - a)
                              .map(([source, count]) => {
                                const conversion = extendedMetrics.conversionBySource[source];
                                return (
                                  <div key={source} className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm capitalize">{source}</span>
                                      <span className="font-bold">{count}</span>
                                    </div>
                                    {conversion && (
                                      <div className="text-xs text-muted-foreground">
                                        Conv: {conversion.rate}% ({conversion.conversions}/{conversion.visitors})
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                          ) : (
                            <p className="text-sm text-muted-foreground">Sin datos de UTM</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Tiempo de completado y Scroll */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Tiempo promedio */}
                      <div className="bg-card rounded-xl border border-zinc-800 p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                          <Timer className="w-5 h-5 text-primary" />
                          Tiempo Promedio
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Form 1 (Landing)</p>
                            <p className="text-2xl font-bold">
                              {extendedMetrics.avgCompletionTime.form1 > 0
                                ? `${Math.floor(extendedMetrics.avgCompletionTime.form1 / 60)}:${(extendedMetrics.avgCompletionTime.form1 % 60).toString().padStart(2, '0')}`
                                : '--:--'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Form 2 (Video)</p>
                            <p className="text-2xl font-bold">
                              {extendedMetrics.avgCompletionTime.form2 > 0
                                ? `${Math.floor(extendedMetrics.avgCompletionTime.form2 / 60)}:${(extendedMetrics.avgCompletionTime.form2 % 60).toString().padStart(2, '0')}`
                                : '--:--'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Scroll Depth */}
                      <div className="bg-card rounded-xl border border-zinc-800 p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                          <ArrowDown className="w-5 h-5 text-primary" />
                          Scroll Depth
                        </h3>
                        <div className="space-y-3">
                          <div className="text-center mb-4">
                            <p className="text-3xl font-bold">{extendedMetrics.scrollDepth.average}%</p>
                            <p className="text-xs text-muted-foreground">Promedio</p>
                          </div>
                          {Object.entries(extendedMetrics.scrollDepth.distribution).map(([depth, count]) => (
                            <div key={depth} className="flex items-center justify-between text-sm">
                              <span>{depth}</span>
                              <span className="font-medium">{count}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Distribución horaria */}
                      <div className="bg-card rounded-xl border border-zinc-800 p-6">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-primary" />
                          Hora Pico
                        </h3>
                        <div className="space-y-2">
                          {(() => {
                            const maxHour = extendedMetrics.hourDistribution.indexOf(
                              Math.max(...extendedMetrics.hourDistribution)
                            );
                            const maxCount = Math.max(...extendedMetrics.hourDistribution);
                            return (
                              <div className="text-center mb-4">
                                <p className="text-3xl font-bold">{maxHour}:00</p>
                                <p className="text-xs text-muted-foreground">Mayor actividad ({maxCount} eventos)</p>
                              </div>
                            );
                          })()}
                          <div className="flex items-end justify-between h-20 gap-0.5">
                            {extendedMetrics.hourDistribution.map((count, hour) => {
                              const max = Math.max(...extendedMetrics.hourDistribution) || 1;
                              const height = (count / max) * 100;
                              return (
                                <div
                                  key={hour}
                                  className="bg-primary/60 hover:bg-primary rounded-t transition-colors cursor-help"
                                  style={{ height: `${height}%`, width: '3.5%' }}
                                  title={`${hour}:00 - ${count} eventos`}
                                />
                              );
                            })}
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>0h</span>
                            <span>12h</span>
                            <span>24h</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Día de la semana */}
                    <div className="bg-card rounded-xl border border-zinc-800 p-6">
                      <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Actividad por Día
                      </h3>
                      <div className="flex items-end justify-around h-32 gap-2">
                        {Object.entries(extendedMetrics.dayDistribution).map(([day, count]) => {
                          const max = Math.max(...Object.values(extendedMetrics.dayDistribution)) || 1;
                          const height = (count / max) * 100;
                          return (
                            <div key={day} className="flex flex-col items-center gap-2 flex-1">
                              <span className="text-xs font-medium">{count}</span>
                              <div
                                className="bg-primary/60 hover:bg-primary rounded-t transition-colors w-full max-w-[40px]"
                                style={{ height: `${height}%`, minHeight: count > 0 ? '4px' : '0' }}
                              />
                              <span className="text-xs text-muted-foreground">{day}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Distribución de respuestas */}
                    <div className="bg-card rounded-xl border border-zinc-800 p-6">
                      <h3 className="font-bold mb-4 flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-primary" />
                        Distribución de Respuestas (Form 1)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(extendedMetrics.form1Responses).map(([step, responses]) => {
                          const entries = Object.entries(responses);
                          if (entries.length === 0) return null;
                          const total = entries.reduce((sum, [, count]) => sum + count, 0);
                          return (
                            <div key={step}>
                              <h4 className="text-sm font-medium mb-2 capitalize">{step}</h4>
                              <div className="space-y-2">
                                {entries
                                  .sort(([, a], [, b]) => b - a)
                                  .slice(0, 5)
                                  .map(([value, count]) => {
                                    const percent = ((count / total) * 100).toFixed(1);
                                    return (
                                      <div key={value} className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                          <span className="truncate max-w-[150px]" title={value}>{value}</span>
                                          <span>{count} ({percent}%)</span>
                                        </div>
                                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                          <div
                                            className="h-full bg-primary rounded-full"
                                            style={{ width: `${percent}%` }}
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* Leads Tab */}
        {activeTab === "leads" && (
          <>
        {/* Filters */}
        <div className="bg-card rounded-xl border border-zinc-800 p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, email, empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-secondary border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={filterSituacion}
                onChange={(e) => setFilterSituacion(e.target.value)}
                className="bg-secondary border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
              >
                <option value="">Todas las situaciones</option>
                <option value="mejorar-costos">Mejorar costos</option>
                <option value="contenedor-compartido">Contenedor compartido</option>
              </select>
              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="bg-secondary border border-zinc-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary"
              >
                <option value="">Todos los estados</option>
                {estadosOptions.map(estado => (
                  <option key={estado.id} value={estado.id}>{estado.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-card rounded-xl border border-zinc-800 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Cargando leads...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">No hay leads para mostrar</p>
              {!isSupabaseConfigured() && (
                <p className="text-sm text-yellow-500 mt-2">
                  Configurá Supabase para empezar a guardar leads
                </p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Fecha</th>
                    <th className="text-left px-4 py-3 font-medium">Contacto</th>
                    <th className="text-left px-4 py-3 font-medium">Situación</th>
                    <th className="text-left px-4 py-3 font-medium">Facturación</th>
                    <th className="text-left px-4 py-3 font-medium">Urgencia</th>
                    <th className="text-left px-4 py-3 font-medium">Estado</th>
                    <th className="text-left px-4 py-3 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredLeads.map((lead) => {
                    const estadoConfig = getEstadoConfig(lead.estado);
                    return (
                      <tr key={lead.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3 text-muted-foreground">
                          {new Date(lead.created_at || "").toLocaleDateString("es-AR", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium">{lead.nombre}</p>
                            <p className="text-xs text-muted-foreground">{lead.email}</p>
                            {lead.empresa && (
                              <p className="text-xs text-muted-foreground">{lead.empresa}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs bg-secondary px-2 py-1 rounded">
                            {lead.situacion_label?.slice(0, 30)}...
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs">{lead.facturacion_label}</td>
                        <td className="px-4 py-3 text-xs">{lead.urgencia_label}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${estadoConfig.color} text-white`}>
                            {estadoConfig.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleSelectLead(lead)}
                            className="p-2 hover:bg-secondary rounded-lg transition-colors"
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
          </>
        )}
      </div>

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card rounded-2xl border border-zinc-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-card">
                <div>
                  <h2 className="text-xl font-bold">{selectedLead.nombre}</h2>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedLead.created_at || "").toLocaleString("es-AR")}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-secondary/50 p-3 rounded-lg">
                    <Mail className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">{selectedLead.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-secondary/50 p-3 rounded-lg">
                    <Phone className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">WhatsApp</p>
                      <a
                        href={`https://wa.me/${selectedLead.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-green-500 hover:underline"
                      >
                        {selectedLead.whatsapp}
                      </a>
                    </div>
                  </div>
                  {selectedLead.empresa && (
                    <div className="flex items-center gap-3 bg-secondary/50 p-3 rounded-lg col-span-2">
                      <Building className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Empresa</p>
                        <p className="text-sm font-medium">{selectedLead.empresa}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Form Data */}
                <div className="space-y-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Información del formulario
                  </h3>
                  <div className="bg-secondary/30 rounded-lg p-4 space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Nicho:</span>{" "}
                      <span className="font-medium">{selectedLead.nicho_label}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Situación:</span>{" "}
                      <span className="font-medium">{selectedLead.situacion_label}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Problemática:</span>{" "}
                      <span className="font-medium">{selectedLead.problematica_label}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Facturación:</span>{" "}
                      <span className="font-medium">{selectedLead.facturacion_label}</span>
                    </div>
                    {selectedLead.experiencia_label && (
                      <div>
                        <span className="text-muted-foreground">Experiencia:</span>{" "}
                        <span className="font-medium">{selectedLead.experiencia_label}</span>
                      </div>
                    )}
                    {selectedLead.origen_label && (
                      <div>
                        <span className="text-muted-foreground">Origen:</span>{" "}
                        <span className="font-medium">{selectedLead.origen_label}</span>
                      </div>
                    )}
                    {selectedLead.mejoras_labels && selectedLead.mejoras_labels.length > 0 && (
                      <div>
                        <span className="text-muted-foreground">Quiere mejorar:</span>{" "}
                        <span className="font-medium">{selectedLead.mejoras_labels.join(", ")}</span>
                      </div>
                    )}
                    {selectedLead.volumen_label && (
                      <div>
                        <span className="text-muted-foreground">Volumen:</span>{" "}
                        <span className="font-medium">{selectedLead.volumen_label}</span>
                      </div>
                    )}
                    {selectedLead.etapa_label && (
                      <div>
                        <span className="text-muted-foreground">Etapa:</span>{" "}
                        <span className="font-medium">{selectedLead.etapa_label}</span>
                      </div>
                    )}
                    {selectedLead.espacio_label && (
                      <div>
                        <span className="text-muted-foreground">Espacio:</span>{" "}
                        <span className="font-medium">{selectedLead.espacio_label}</span>
                      </div>
                    )}
                    {selectedLead.servicios_adicionales_labels && selectedLead.servicios_adicionales_labels.length > 0 && (
                      <div>
                        <span className="text-muted-foreground">Servicios adicionales:</span>{" "}
                        <span className="font-medium">{selectedLead.servicios_adicionales_labels.join(", ")}</span>
                      </div>
                    )}
                    {selectedLead.frecuencia_label && (
                      <div>
                        <span className="text-muted-foreground">Frecuencia:</span>{" "}
                        <span className="font-medium">{selectedLead.frecuencia_label}</span>
                      </div>
                    )}
                    {selectedLead.tercerizar_labels && selectedLead.tercerizar_labels.length > 0 && (
                      <div>
                        <span className="text-muted-foreground">Quiere tercerizar:</span>{" "}
                        <span className="font-medium">{selectedLead.tercerizar_labels.join(", ")}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">Urgencia:</span>{" "}
                      <span className="font-medium">{selectedLead.urgencia_label}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Notes */}
                <div className="space-y-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Estado y notas
                  </h3>

                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Estado</label>
                    <select
                      value={editingEstado}
                      onChange={(e) => setEditingEstado(e.target.value)}
                      className="w-full bg-secondary border border-zinc-700 rounded-lg px-4 py-2 outline-none focus:border-primary"
                    >
                      {estadosOptions.map(estado => (
                        <option key={estado.id} value={estado.id}>{estado.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Notas internas</label>
                    <textarea
                      value={editingNotas}
                      onChange={(e) => setEditingNotas(e.target.value)}
                      placeholder="Agregar notas sobre este lead..."
                      rows={3}
                      className="w-full bg-secondary border border-zinc-700 rounded-lg px-4 py-2 outline-none focus:border-primary resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSaveLead}
                    disabled={saving}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {saving ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Guardar cambios
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-3 pt-4 border-t border-zinc-800">
                  <a
                    href={`https://wa.me/${selectedLead.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Abrir WhatsApp
                  </a>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="flex-1 bg-secondary text-foreground py-3 rounded-xl font-bold hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Enviar Email
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
