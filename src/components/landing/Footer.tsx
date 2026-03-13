import { Instagram, Linkedin, Youtube, Mail, MapPin, Clock } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-20 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl font-bold tracking-tighter">
                ADUA<span className="text-primary">NEX</span>
              </span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">Haciendo que el comercio internacional sea tan simple como comprar en el chino. Sin vueltas, sin letra chica.

            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>


          {/* Contact */}
          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-muted-foreground">Contacto</h5>
            <ul className="space-y-4">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                contacto@aduanex.com.ar
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Buenos Aires, Argentina
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                Lun - Vie, 9hs a 18hs
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ADUANEX. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a className="hover:text-foreground transition-colors" href="/terminosycondiciones">Términos y condiciones</a>
            <a className="hover:text-foreground transition-colors" href="/terminosycondiciones">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>);

};