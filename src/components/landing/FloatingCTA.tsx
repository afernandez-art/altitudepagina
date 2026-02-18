import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export const FloatingCTA = () => {
  return (
    <a
      href="https://wa.me/5491100000000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25d366] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-foreground" />
    </a>
  );
};
