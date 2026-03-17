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
  LogIn,
} from "lucide-react";
import { getLeads, updateLeadStatus, Lead } from "@/lib/supabase";
import { supabase } from "@/integrations/supabase/client";
import { generateWhatsAppLink } from "@/contexts/LeadMagnetContext";

const Admin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data } = await getLeads();
    if (data) setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) fetchLeads();
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError("Email o contraseña incorrectos");
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Admin</h1>
              <p className="text-muted-foreground text-sm">Ingresá tus credenciales</p>
            </div>
            {loginError && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 mb-6 text-destructive text-sm">
                {loginError}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                placeholder="Contraseña"
                required
              />
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                {loginLoading ? "Ingresando..." : "Ingresar"}
              </button>
            </form>
            <p className="text-center mt-6">
              <a href="/" className="text-muted-foreground hover:text-foreground text-sm">← Volver</a>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp?.includes(searchTerm) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "todos" || lead.estado === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalLeads = leads.length;
  const leadsHoy = leads.filter(l => l.created_at && new Date(l.created_at).toDateString() === new Date().toDateString()).length;
  const contactados = leads.filter(l => l.contactado_whatsapp).length;
  const pendientes = leads.filter(l => !l.estado || l.estado === "nuevo").length;

  const formatDate = (d?: string) => {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("es-AR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold">Admin <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">LEADS</span></span>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground">Ver Landing</a>
            <button onClick={handleLogout} className="text-sm text-muted-foreground hover:text-destructive">Salir</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: totalLeads, icon: Users, color: "text-primary" },
            { label: "Hoy", value: leadsHoy, icon: TrendingUp, color: "text-blue-500" },
            { label: "Contactados", value: contactados, icon: CheckCircle, color: "text-green-500" },
            { label: "Pendientes", value: pendientes, icon: Clock, color: "text-yellow-500" },
          ].map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-4 md:p-6">
              <m.icon className={`w-5 h-5 ${m.color} mb-2`} />
              <p className="text-2xl md:text-3xl font-bold">{m.value}</p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-card border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary">
            <option value="todos">Todos</option>
            <option value="nuevo">Nuevos</option>
            <option value="contactado">Contactados</option>
            <option value="en_proceso">En proceso</option>
            <option value="cerrado">Cerrados</option>
          </select>
          <button onClick={fetchLeads} className="bg-card border border-border rounded-lg px-4 py-2.5 text-sm hover:bg-muted flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Actualizar
          </button>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No hay leads</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider">
                    <th className="text-left px-4 py-3">Fecha</th>
                    <th className="text-left px-4 py-3">Contacto</th>
                    <th className="text-left px-4 py-3 hidden md:table-cell">Perfil</th>
                    <th className="text-left px-4 py-3 hidden lg:table-cell">Inversión</th>
                    <th className="text-left px-4 py-3">Estado</th>
                    <th className="text-left px-4 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-muted/30">
                      <td className="px-4 py-4 text-muted-foreground text-xs">{formatDate(lead.created_at)}</td>
                      <td className="px-4 py-4">
                        <p className="font-medium">{lead.nombre || "-"}</p>
                        <p className="text-xs text-muted-foreground">{lead.whatsapp}</p>
                        {lead.email && lead.email !== "no-proporcionado@sinmail.com" && (
                          <p className="text-xs text-muted-foreground">{lead.email}</p>
                        )}
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">{lead.nicho_label || "-"}</span>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground text-xs hidden lg:table-cell">{lead.facturacion_label || "-"}</td>
                      <td className="px-4 py-4">
                        <select
                          value={lead.estado || "nuevo"}
                          onChange={(e) => lead.id && handleStatusChange(lead.id, e.target.value)}
                          disabled={updatingId === lead.id}
                          className="text-xs px-2 py-1 rounded bg-muted text-foreground border-0 focus:outline-none focus:ring-1 focus:ring-primary"
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
                            className={`p-2 rounded-lg transition-colors ${lead.contactado_whatsapp ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <a
                            href={generateWhatsAppLink({ perfil: lead.nicho as any, necesidad: lead.situacion || "", inversion: lead.facturacion || "", nombre: lead.nombre || "", whatsapp: lead.whatsapp || "", email: lead.email || "", empresa: lead.empresa || "", mensaje: lead.problematica || "" })}
                            target="_blank" rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground"
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
        <p className="text-center text-xs text-muted-foreground mt-8">
          Mostrando {filteredLeads.length} de {totalLeads} leads
        </p>
      </main>
    </div>
  );
};

export default Admin;
