import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Sea & Air",
    description: "Fletes internacionales con contratos directos con carriers para asegurar espacio y precio."
  },
  {
    number: "02",
    title: "Operaciones",
    description: "Gestión aduanera técnica y clasificación arancelaria preventiva."
  },
  {
    number: "03",
    title: "Last Mile",
    description: "Distribución capilar de alta eficiencia en principales centros urbanos."
  }
];

export const ServicesSection = () => {
  return (
    <section className="py-32 px-6" id="servicios">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-16"
        >
          Especialidades Forwarding
        </motion.h2>
        
        <div className="flex flex-col">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group border-t border-zinc-800 py-12 flex flex-col md:flex-row items-start md:items-center justify-between transition-all px-4 hover:bg-foreground/[0.02]"
            >
              <div className="flex items-center gap-12 md:w-1/2">
                <span className="font-mono text-zinc-700 text-2xl font-light">{service.number}</span>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
              </div>
              <div className="md:w-1/3 mt-4 md:mt-0">
                <p className="text-zinc-500">{service.description}</p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-zinc-800" />
        </div>
      </div>
    </section>
  );
};
