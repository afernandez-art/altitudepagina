import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const services = [
  {
    number: "01",
    title: "Forwarding Internacional",
    description: "Coordinamos tu carga marítima y aérea desde China, USA, Europa y Latinoamérica. Seguimiento en tiempo real desde origen."
  },
  {
    number: "02",
    title: "Despacho de Aduana",
    description: "Clasificación arancelaria, documentación y liberación en 48hs promedio. Despachantes propios, sin intermediarios."
  },
  {
    number: "03",
    title: "Transporte Nacional",
    description: "Flota propia para entregas en AMBA e interior. Cargas completas, consolidadas y distribución puerta a puerta."
  },
  {
    number: "04",
    title: "Fulfillment B2B",
    description: "Almacenamos tu mercadería y despachamos a tus clientes. Integración con tu sistema, reportes en tiempo real."
  }
];

export const ServicesSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6" id="servicios">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-16"
        >
          Nuestros Servicios
        </motion.h2>
        
        <div className="flex flex-col">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group border-t border-border"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full py-8 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between transition-all px-4 hover:bg-foreground/[0.02] text-left"
              >
                <div className="flex items-center gap-8 md:gap-12 w-full md:w-auto">
                  <span className="font-mono text-muted-foreground text-xl md:text-2xl font-light">{service.number}</span>
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter uppercase group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <ChevronDown 
                    className={`w-6 h-6 text-muted-foreground transition-transform duration-300 ${
                      expandedIndex === index ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: expandedIndex === index ? 'auto' : 0,
                  opacity: expandedIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-8 md:pl-[calc(2rem+3rem+3rem)] md:pr-12">
                  <p className="text-muted-foreground text-lg max-w-2xl">{service.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
          <div className="border-t border-border" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-primary font-semibold text-lg hover:gap-3 transition-all"
          >
            Consultá por tu operación <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
