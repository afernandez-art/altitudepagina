import { motion } from "framer-motion";
import { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  User,
  Building,
  Mail,
  Phone,
} from "lucide-react";
import { useLeadMagnet } from "@/contexts/LeadMagnetContext";

// Horarios disponibles (placeholder)
const horariosDisponibles = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

// Generar días del mes
const generateCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const days: (number | null)[] = [];

  // Días vacíos al inicio
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // Días del mes
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return days;
};

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export const CalendarSection = () => {
  const { formData, currentStep } = useLeadMagnet();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const today = new Date();
  const calendarDays = generateCalendarDays(currentYear, currentMonth);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isDateSelectable = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay();
    // Solo días de semana y futuros
    return dayOfWeek !== 0 && dayOfWeek !== 6 && date >= today;
  };

  const handleDateSelect = (day: number) => {
    if (isDateSelectable(day)) {
      setSelectedDate(new Date(currentYear, currentMonth, day));
      setSelectedTime(null);
    }
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      setIsConfirmed(true);
      // Aquí se enviaría la información al backend
      console.log("Reserva confirmada:", {
        fecha: selectedDate,
        hora: selectedTime,
        datos: formData,
      });
    }
  };

  if (currentStep !== "calendar") {
    return null;
  }

  if (isConfirmed) {
    return (
      <section id="calendar-section" className="py-20 px-6 bg-black">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card p-12 rounded-2xl border border-zinc-800"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-black mb-4">¡Llamada Agendada!</h2>
            <p className="text-muted-foreground mb-8">
              Te confirmamos tu reunión para el{" "}
              <span className="text-white font-semibold">
                {selectedDate?.toLocaleDateString("es-AR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </span>{" "}
              a las{" "}
              <span className="text-white font-semibold">{selectedTime}hs</span>
            </p>

            <div className="bg-secondary/50 p-6 rounded-xl mb-8 text-left">
              <p className="text-sm text-muted-foreground mb-4">Detalles de la reunión:</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-primary" />
                  <span>Videollamada por Google Meet</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Duración: 30 minutos</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  <span>Con un especialista de Altitude</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Te enviamos un email de confirmación a{" "}
              <span className="text-primary">{formData.email}</span> con el link de la reunión.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="calendar-section" className="py-20 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calendar className="w-4 h-4" />
            Paso Final
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Agendá tu Llamada Estratégica
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            30 minutos con un especialista para revisar tu plan personalizado
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resumen del contacto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card p-6 rounded-2xl border border-zinc-800"
          >
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Tus Datos
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>{formData.nombre}</span>
              </div>
              {formData.empresa && (
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <span>{formData.empresa}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{formData.email}</span>
              </div>
              {formData.whatsapp && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{formData.whatsapp}</span>
                </div>
              )}
            </div>

            <hr className="my-6 border-zinc-800" />

            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              Detalles de la Reunión
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Videollamada por Google Meet
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Duración: 30 minutos
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Sin compromiso
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Especialista asignado según tu industria
              </li>
            </ul>
          </motion.div>

          {/* Calendario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card p-6 rounded-2xl border border-zinc-800"
          >
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="font-bold">
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-xs text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Días del mes */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div key={index} className="aspect-square">
                  {day && (
                    <button
                      onClick={() => handleDateSelect(day)}
                      disabled={!isDateSelectable(day)}
                      className={`w-full h-full rounded-lg text-sm font-medium transition-all ${
                        selectedDate?.getDate() === day &&
                        selectedDate?.getMonth() === currentMonth &&
                        selectedDate?.getFullYear() === currentYear
                          ? "bg-primary text-primary-foreground"
                          : isDateSelectable(day)
                          ? "hover:bg-secondary"
                          : "text-muted-foreground/30 cursor-not-allowed"
                      }`}
                    >
                      {day}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Horarios */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card p-6 rounded-2xl border border-zinc-800"
          >
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              {selectedDate
                ? selectedDate.toLocaleDateString("es-AR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })
                : "Seleccioná una fecha"}
            </h3>

            {selectedDate ? (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                {horariosDisponibles.map((hora) => (
                  <button
                    key={hora}
                    onClick={() => setSelectedTime(hora)}
                    className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                      selectedTime === hora
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    {hora}hs
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-60 text-muted-foreground text-sm">
                Seleccioná una fecha para ver horarios disponibles
              </div>
            )}

            {selectedDate && selectedTime && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleConfirm}
                className="w-full mt-6 bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 transition-all"
              >
                Confirmar Reunión
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
