import { motion } from "framer-motion";

const team = [
  {
    name: "Juan Pérez",
    role: "Director Comercial",
    specialty: "Desarrollo de cuentas estratégicas"
  },
  {
    name: "María García",
    role: "Jefa de Operaciones",
    specialty: "Optimización de procesos logísticos"
  },
  {
    name: "Carlos López",
    role: "Despacho de Aduana",
    specialty: "Clasificación arancelaria"
  }
];

export const TeamSection = () => {
  return (
    <section className="py-20 sm:py-24 px-6 bg-card/50" id="equipo">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-4">
            Equipo
          </h2>
          <p className="text-4xl md:text-5xl font-black tracking-tighter">
            El equipo detrás de <span className="text-primary">tu operación</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center group"
            >
              {/* Placeholder photo */}
              <div className="w-32 h-32 mx-auto rounded-full bg-muted mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-4xl font-black text-primary/40">
                    {member.name.charAt(0)}
                  </span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary font-medium mb-2">{member.role}</p>
              <p className="text-muted-foreground text-sm">{member.specialty}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
