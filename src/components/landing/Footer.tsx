import { Linkedin, Instagram, Mail, Phone, MessageCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-16 px-6 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo and description */}
          <div className="space-y-4">
            <span className="text-xl font-black tracking-tight">
              ADUA<span className="text-primary">NEX</span>
            </span>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Forwarder internacional y estudio aduanero.
              Buenos Aires, Argentina.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Navegación</h4>
            <nav className="flex flex-col gap-3">
              <a href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Servicios
              </a>
              <a href="#por-que" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Por qué Aduanex
              </a>
              <a href="#proceso" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Proceso
              </a>
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Contacto</h4>
            <div className="space-y-3">
              <a href="mailto:info@aduanex.com.ar" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
                <Mail className="w-4 h-4" />
                info@aduanex.com.ar
              </a>
              <a href="tel:+541112345678" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
                <Phone className="w-4 h-4" />
                +54 11 1234-5678
              </a>
              <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Column 4: Social */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Seguinos</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
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
            © {new Date().getFullYear()} ADUANEX. Todos los derechos reservados.
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
