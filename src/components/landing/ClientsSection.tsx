import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

import lichytexLogo from "@/assets/logos/lichytex.png";
import adlerPelzerLogo from "@/assets/logos/adler-pelzer.png";
import alstomLogo from "@/assets/logos/alstom.png";
import amcorLogo from "@/assets/logos/amcor.png";
import billabongLogo from "@/assets/logos/billabong.png";
import claroLogo from "@/assets/logos/claro.png";
import mapedLogo from "@/assets/logos/maped.png";
import nestleLogo from "@/assets/logos/nestle.png";
import telecomLogo from "@/assets/logos/telecom.png";

const stats = [
  { value: 150, prefix: "+", suffix: "", label: "Clientes" },
  { value: 98, prefix: "", suffix: "%", label: "Entregas a tiempo" },
  { value: 500, prefix: "+", suffix: "", label: "Operaciones/año" },
  { value: 12, prefix: "", suffix: "", label: "Años" }
];

const logos = [
  { src: lichytexLogo, alt: "Lichytex", className: "" },
  { src: adlerPelzerLogo, alt: "Adler Pelzer Group", className: "scale-150" },
  { src: alstomLogo, alt: "Alstom", className: "" },
  { src: amcorLogo, alt: "Amcor", className: "scale-150" },
  { src: billabongLogo, alt: "Billabong", className: "" },
  { src: claroLogo, alt: "Claro", className: "" },
  { src: mapedLogo, alt: "Maped", className: "" },
  { src: nestleLogo, alt: "Nestlé", className: "" },
  { src: telecomLogo, alt: "Telecom", className: "scale-150" },
];

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter = ({ value, prefix = "", suffix = "" }: AnimatedCounterProps) => {
  const { count, elementRef } = useCountUp({ end: value, duration: 2000 });
  
  return (
    <div ref={elementRef} className="text-5xl md:text-6xl font-black text-primary mb-2">
      {prefix}{count}{suffix}
    </div>
  );
};

export const ClientsSection = () => {
  return (
    <section className="py-20 sm:py-24 px-6 bg-card/50" id="clientes">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-4">
            Social Proof
          </h2>
          <p className="text-4xl md:text-5xl font-black tracking-tighter">
            Empresas que <span className="text-primary">confían</span> en nosotros
          </p>
        </motion.div>

        {/* Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 mb-12 sm:mb-16 max-w-4xl mx-auto"
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              className="h-14 md:h-16 p-3 flex items-center justify-center bg-white/90 rounded-xl opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-300"
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className={`max-h-full max-w-full object-contain ${logo.className}`}
              />
            </div>
          ))}
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12 sm:mb-16"
        >
          <div className="relative p-8 md:p-12 rounded-2xl bg-background border border-border">
            <Quote className="w-12 h-12 text-primary/30 absolute top-6 left-6" />
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-center pt-8">
              "Altitude maneja nuestras importaciones, el transporte a todo el país y el stock en su depósito. 
              Un solo proveedor, un solo contacto, cero dolores de cabeza."
            </blockquote>
            <div className="mt-8 text-center">
              <p className="font-bold">María González</p>
              <p className="text-muted-foreground text-sm">Gerente de Operaciones, Empresa S.A.</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter 
                value={stat.value} 
                prefix={stat.prefix} 
                suffix={stat.suffix} 
              />
              <div className="text-muted-foreground text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
