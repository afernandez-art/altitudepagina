import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  MessageCircle,
  Search,
  RefreshCw,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { getLeads, updateLeadStatus, Lead } from "@/lib/supabase";
import { getPerfilLabel, getInversionLabel, generateWhatsAppLink } from "@/contexts/LeadMagnetContext";
import { useAuth } from "@/hooks/useAuth";
import { AdminLogin } from "@/components/admin/AdminLogin";

const Admin = () => {
  const { user, loading: authLoading, signIn, signOut, isAuthenticated } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    const { data } = await getLeads();
    if (data) {
      setLeads(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated]);

  const handleLogin = async (email: string, password: string) => {
    const { error } = await signIn(email, password);
    return { error: error as Error | null };
  };

  const handleLogout = async () => {
    await signOut();
  };

  const handleStatusChange = async (id: string, estado: string) => {
    setUpdatingId(id);
    await updateLeadStatus(id, { estado });
    setLeads(leads.map(l => l.id === id ? { ...l, estado } : l));
    setUpdatingId(null);
  };

  const handleWhatsAppToggle = async (id: string, current: boolean) => {
    setUpdatingId(id);
    await updateLeadStatus(id, { contactado_whatsapp: !current });
    setLeads(leads.map(l => l.id === id ? { ...l, contactado_whatsapp: !current } : l));
    setUpdatingId(null);
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp?.includes(searchTerm) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "todos" ||
      lead.estado === filterStatus;

    return matchesSearch && matchesFilter;
  });

  // Metrics
  const totalLeads = leads.length;
  const leadsHoy = leads.filter(l => {
    const today = new Date().toDateString();
    return l.created_at && new Date(l.created_at).toDateString() === today;
  }).length;
  const contactados = leads.filter(l => l.contactado_whatsapp).length;
  const pendientes = leads.filter(l => l.estado === "nuevo" || !l.estado).length;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-black text-foreground">
      {/* Header */}
      <header className="bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold">
              ADUA<span className="text-primary">NEX</span>
            </span>
            <span className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-400">ADMIN</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-500 hidden sm:block">{user?.email}</span>
            <a href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Ver Landing
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white">{totalLeads}</p>
            <p className="text-xs text-zinc-500">Total Leads</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white">{leadsHoy}</p>
            <p className="text-xs text-zinc-500">Leads Hoy</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white">{contactados}</p>
            <p className="text-xs text-zinc-500">Contactados</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white">{pendientes}</p>
            <p className="text-xs text-zinc-500">Pendientes</p>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, whatsapp o email..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            >
              <option value="todos">Todos</option>
              <option value="nuevo">Nuevos</option>
              <option value="contactado">Contactados</option>
              <option value="en_proceso">En proceso</option>
              <option value="cerrado">Cerrados</option>
            </select>

            <button
              onClick={fetchLeads}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white hover:bg-zinc-800 transition-colors flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-20 text-zinc-500">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No hay leads {filterStatus !== "todos" ? `con estado "${filterStatus}"` : ""}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-800/50 text-zinc-400 text-xs uppercase tracking-wider">
                    <th className="text-left px-4 py-3 font-medium">Fecha</th>
                    <th className="text-left px-4 py-3 font-medium">Contacto</th>
                    <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Perfil</th>
                    <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Inversi&oacute;n</th>
                    <th className="text-left px-4 py-3 font-medium">Estado</th>
                    <th className="text-left px-4 py-3 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-4 py-4 text-zinc-400 text-xs">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-white">{lead.nombre || "-"}</p>
                        <p className="text-xs text-zinc-500">{lead.whatsapp}</p>
                        {lead.email && lead.email !== "no-proporcionado@sinmail.com" && (
                          <p className="text-xs text-zinc-500">{lead.email}</p>
                        )}
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="inline-block bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded">
                          {lead.nicho_label || getPerfilLabel(lead.nicho as any) || "-"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-zinc-400 text-xs hidden lg:table-cell">
                        {lead.facturacion_label || getInversionLabel(lead.facturacion) || "-"}
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={lead.estado || "nuevo"}
                          onChange={(e) => lead.id && handleStatusChange(lead.id, e.target.value)}
                          disabled={updatingId === lead.id}
                          className={`text-xs px-2 py-1 rounded border-0 focus:outline-none focus:ring-1 focus:ring-primary ${
                            lead.estado === "cerrado" ? "bg-green-500/20 text-green-400" :
                            lead.estado === "en_proceso" ? "bg-blue-500/20 text-blue-400" :
                            lead.estado === "contactado" ? "bg-yellow-500/20 text-yellow-400" :
                            "bg-zinc-800 text-zinc-300"
                          }`}
                        >
                          <option value="nuevo">Nuevo</option>
                          <option value="contactado">Contactado</option>
                          <option value="en_proceso">En proceso</option>
                          <option value="cerrado">Cerrado</option>
                        </select>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => lead.id && handleWhatsAppToggle(lead.id, lead.contactado_whatsapp || false)}
                            disabled={updatingId === lead.id}
                            title={lead.contactado_whatsapp ? "Ya contactado por WhatsApp" : "Marcar como contactado"}
                            className={`p-2 rounded-lg transition-colors ${
                              lead.contactado_whatsapp
                                ? "bg-green-500/20 text-green-500"
                                : "bg-zinc-800 text-zinc-400 hover:text-white"
                            }`}
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <a
                            href={generateWhatsAppLink({
                              perfil: lead.nicho as any,
                              necesidad: lead.situacion || "",
                              inversion: lead.facturacion || "",
                              nombre: lead.nombre || "",
                              whatsapp: lead.whatsapp || "",
                              email: lead.email || "",
                              empresa: lead.empresa || "",
                              mensaje: lead.problematica || "",
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                            title="Abrir WhatsApp"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-zinc-600 mt-8">
          Mostrando {filteredLeads.length} de {totalLeads} leads
        </p>
      </main>
    </div>
  );
};

export default Admin;
