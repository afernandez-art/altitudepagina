import { Linkedin, Instagram, Mail, Phone, MessageCircle } from "lucide-react";
import altitudeLogo from "@/assets/altitude-logo.png";

export const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Columna 1: Logo y descripción */}
          <div className="space-y-4">
            <img 
              src={altitudeLogo} 
              alt="Altitude Logistics Group" 
              className="h-8 w-auto"
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Logística integral para comercio internacional.
              Buenos Aires, Argentina.
            </p>
          </div>
          
          {/* Columna 2: Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Navegación</h4>
            <nav className="flex flex-col gap-3">
              <a href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                Servicios
              </a>
              <a href="#nosotros" className="text-muted-foreground hover:text-foreground transition-colors">
                Sobre Nosotros
              </a>
              <a href="#contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                Contacto
              </a>
            </nav>
          </div>
          
          {/* Columna 3: Contacto */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Contacto</h4>
            <div className="space-y-3">
              <a href="mailto:info@altitude.com.ar" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
                info@altitude.com.ar
              </a>
              <a href="tel:+541112345678" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
                +54 11 1234-5678
              </a>
              <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
          
          {/* Columna 4: Redes */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Seguinos</h4>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © 2026 Altitude Logística. Todos los derechos reservados.
          </p>
          <nav className="flex gap-6">
            <a href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors">
              Términos y Condiciones
            </a>
            <a href="#" className="text-muted-foreground text-xs hover:text-foreground transition-colors">
              Política de Privacidad
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
