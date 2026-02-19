import { motion } from "framer-motion";
import { Phone, Mail, ArrowRight, Lock } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const situaciones = [
  { id: "mejora", label: "Ya importo/opero y quiero mejorar o cambiar de operador" },
  { id: "primera", label: "Estoy por hacer mi primera importación" },
  { id: "tercerizar", label: "Quiero tercerizar mi logística o fulfillment" }
];

const serviciosOptions = [
  { id: "forwarding", label: "Forwarding internacional (traer mercadería del exterior)" },
  { id: "aduana", label: "Despacho de aduana" },
  { id: "transporte", label: "Transporte nacional" },
  { id: "fulfillment", label: "Fulfillment / almacenamiento" }
];

const volumenes = [
  { value: "10k", label: "Menos de USD 10.000" },
  { value: "10-50k", label: "USD 10.000 - 50.000" },
  { value: "50-200k", label: "USD 50.000 - 200.000" },
  { value: "200k+", label: "Más de USD 200.000" },
  { value: "no-se", label: "No sé todavía" }
];

const urgencias = [
  { id: "urgente", label: "Urgente (próximos 30 días)" },
  { id: "2-3-meses", label: "Próximos 2-3 meses" },
  { id: "evaluando", label: "Estoy evaluando, sin apuro" }
];

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    whatsapp: "",
    email: "",
    situacion: "",
    servicios: [] as string[],
    volumen: "",
    urgencia: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleServicioChange = (servicioId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      servicios: checked 
        ? [...prev.servicios, servicioId]
        : prev.servicios.filter(s => s !== servicioId)
    }));
  };

  return (
    <section className="min-h-screen flex flex-col lg:flex-row" id="contacto">
      {/* Left side - Blue */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:w-2/5 bg-primary p-12 md:p-16 lg:p-20 flex flex-col justify-center relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground tracking-tighter leading-[0.95] mb-8">
            Contanos sobre tu operación.
          </h2>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 font-medium mb-12">
            Te mostramos cómo podemos ayudarte en menos de 3 minutos.
          </p>
          
          <div className="space-y-6 text-primary-foreground/90">
            <div className="flex items-center gap-4">
              <span className="p-3 bg-primary-foreground/10 rounded-full">
                <Phone className="w-5 h-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-primary-foreground/60">Atención Directa</p>
                <p className="font-bold text-lg">+54 11 1234-5678</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="p-3 bg-primary-foreground/10 rounded-full">
                <Mail className="w-5 h-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-primary-foreground/60">Email</p>
                <p className="font-bold text-lg">contacto@aduanex.com.ar</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />
      </motion.div>
      
      {/* Right side - Form */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:w-3/5 bg-card p-8 md:p-12 lg:p-16 flex flex-col justify-center"
      >
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto w-full space-y-8">
          {/* Row 1: Nombre y Empresa */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nombre</Label>
              <input 
                type="text"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full border-0 border-b-2 border-border focus:border-primary py-3 text-lg placeholder:text-muted-foreground/50 transition-all outline-none bg-transparent"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Empresa</Label>
              <input 
                type="text"
                placeholder="Nombre de la empresa"
                value={formData.empresa}
                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                className="w-full border-0 border-b-2 border-border focus:border-primary py-3 text-lg placeholder:text-muted-foreground/50 transition-all outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Row 2: WhatsApp y Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">WhatsApp</Label>
              <input 
                type="tel"
                placeholder="+54 9 11 ..."
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full border-0 border-b-2 border-border focus:border-primary py-3 text-lg placeholder:text-muted-foreground/50 transition-all outline-none bg-transparent"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</Label>
              <input 
                type="email"
                placeholder="tu@empresa.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-0 border-b-2 border-border focus:border-primary py-3 text-lg placeholder:text-muted-foreground/50 transition-all outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Campo 3: Situación actual */}
          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              ¿Cuál es tu situación actual?
            </Label>
            <RadioGroup
              value={formData.situacion}
              onValueChange={(value) => setFormData({ ...formData, situacion: value })}
              className="space-y-3"
            >
              {situaciones.map((sit) => (
                <div key={sit.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={sit.id} id={sit.id} />
                  <Label htmlFor={sit.id} className="text-sm font-normal cursor-pointer">
                    {sit.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Campo 4: Servicios (checkboxes) */}
          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              ¿Qué servicios necesitás?
            </Label>
            <div className="space-y-3">
              {serviciosOptions.map((serv) => (
                <div key={serv.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={serv.id}
                    checked={formData.servicios.includes(serv.id)}
                    onCheckedChange={(checked) => handleServicioChange(serv.id, checked as boolean)}
                  />
                  <Label htmlFor={serv.id} className="text-sm font-normal cursor-pointer">
                    {serv.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Campo 5: Volumen */}
          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Volumen mensual aproximado en USD
            </Label>
            <Select
              value={formData.volumen}
              onValueChange={(value) => setFormData({ ...formData, volumen: value })}
            >
              <SelectTrigger className="w-full bg-transparent border-0 border-b-2 border-border rounded-none focus:ring-0 focus:border-primary">
                <SelectValue placeholder="Seleccioná un rango" />
              </SelectTrigger>
              <SelectContent>
                {volumenes.map((vol) => (
                  <SelectItem key={vol.value} value={vol.value}>
                    {vol.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Campo 6: Urgencia */}
          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              ¿Para cuándo necesitás resolverlo?
            </Label>
            <RadioGroup
              value={formData.urgencia}
              onValueChange={(value) => setFormData({ ...formData, urgencia: value })}
              className="space-y-3"
            >
              {urgencias.map((urg) => (
                <div key={urg.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={urg.id} id={urg.id} />
                  <Label htmlFor={urg.id} className="text-sm font-normal cursor-pointer">
                    {urg.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-primary text-primary-foreground px-8 py-5 rounded-xl text-lg font-bold hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-2"
          >
            Ver mi video personalizado <ArrowRight className="w-5 h-5" />
          </button>
          
          <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" />
            Tus datos están seguros. No compartimos tu información.
          </p>
        </form>
      </motion.div>
    </section>
  );
};
