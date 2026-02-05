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
} from "lucide-react";
import { getLeads, updateLeadStatus, Lead, isSupabaseConfigured } from "@/lib/supabase";

// Password simple para el admin (en producción usar auth de Supabase)
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "altitude2024";

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

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSituacion, setFilterSituacion] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editingNotas, setEditingNotas] = useState("");
  const [editingEstado, setEditingEstado] = useState("");
  const [saving, setSaving] = useState(false);

  // Check if already authenticated
  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Load leads when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setPasswordError("");
    } else {
      setPasswordError("Contraseña incorrecta");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
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
            <p className="text-sm text-muted-foreground">Ingresá la contraseña para acceder</p>
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
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-secondary border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-primary"
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-all"
            >
              Ingresar
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
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black">Leads Dashboard</h1>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {filteredLeads.length} leads
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadLeads}
              disabled={loading}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              title="Actualizar"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-secondary rounded-lg transition-colors text-red-500"
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
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
                <option value="deposito-fulfillment">Depósito/Fulfillment</option>
                <option value="escalar-negocio">Escalar negocio</option>
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
