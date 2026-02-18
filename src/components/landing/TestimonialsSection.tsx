import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Martín G.",
    role: "Importador de Repuestos",
    text: "Lo mejor es que no me tengo que preocupar por la aduana. Antes era un dolor de cabeza cada vez que llegaba el barco.",
  },
  {
    name: "Sofía L.",
    role: "Emprendedora Textil",
    text: "Con el modelo B2BOX por fin pude proyectar mi stock sin miedo a que el precio cambie a mitad de camino.",
  },
  {
    name: "Carlos R.",
    role: "Retail de Tecnología",
    text: "Agustín y Emanuel son directos. Si algo no se puede, te lo dicen de entrada. Esa honestidad no se paga con nada.",
  },
];

export const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight italic">
            "Trabajamos con gente que{" "}
            <span className="text-gradient">confía.</span>"
          </h2>
          <p className="text-muted-foreground mt-4">
            No somos una agencia gigante, somos dos tipos que se rompen el lomo para que tus cosas lleguen bien.
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all flex-shrink-0"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="flex-1 bento-item text-center py-8 sm:py-12"
            >
              <Quote className="w-8 h-8 text-primary/40 mx-auto mb-4" />
              <p className="text-lg sm:text-xl leading-relaxed mb-6 max-w-xl mx-auto">
                "{testimonials[current].text}"
              </p>
              <p className="font-bold">{testimonials[current].name}</p>
              <p className="text-muted-foreground text-sm">{testimonials[current].role}</p>
            </motion.div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all flex-shrink-0"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-primary w-6" : "bg-border"
                }`}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
