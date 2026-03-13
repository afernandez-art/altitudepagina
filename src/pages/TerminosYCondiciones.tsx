import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const TerminosYCondiciones = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-3xl font-bold mb-8">Términos y Condiciones</h1>

        <section className="space-y-4 text-muted-foreground leading-relaxed mb-16">
          <p><strong className="text-foreground">Última actualización:</strong> Marzo 2026</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">1. Aceptación de los términos</h2>
          <p>Al acceder y utilizar este sitio web de ADUANEX, usted acepta cumplir con estos términos y condiciones de uso. Si no está de acuerdo con alguno de estos términos, le solicitamos que no utilice el sitio.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">2. Uso del sitio</h2>
          <p>Este sitio web tiene fines informativos y comerciales. El contenido proporcionado no constituye asesoramiento legal, financiero ni profesional. Usted se compromete a utilizar el sitio de manera lícita y a no realizar actividades que puedan dañar, deshabilitar o perjudicar el funcionamiento del mismo.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">3. Propiedad intelectual</h2>
          <p>Todo el contenido de este sitio, incluyendo textos, gráficos, logotipos, imágenes y software, es propiedad de ADUANEX o de sus licenciantes y está protegido por las leyes de propiedad intelectual aplicables. Queda prohibida su reproducción, distribución o modificación sin autorización previa por escrito.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">4. Servicios</h2>
          <p>ADUANEX se reserva el derecho de modificar, suspender o discontinuar cualquier aspecto de sus servicios en cualquier momento sin previo aviso. Los precios y condiciones de los servicios están sujetos a cambios y serán confirmados de manera individual para cada cliente.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">5. Limitación de responsabilidad</h2>
          <p>ADUANEX no será responsable por daños directos, indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de uso de este sitio web o de los servicios ofrecidos. El sitio se proporciona "tal cual" sin garantías de ningún tipo.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">6. Enlaces a terceros</h2>
          <p>Este sitio puede contener enlaces a sitios web de terceros. ADUANEX no se responsabiliza por el contenido, las políticas de privacidad ni las prácticas de dichos sitios.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">7. Modificaciones</h2>
          <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor a partir de su publicación en el sitio. El uso continuado del sitio constituye la aceptación de los términos modificados.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">8. Legislación aplicable</h2>
          <p>Estos términos se rigen por las leyes de la República Argentina. Cualquier disputa será sometida a la jurisdicción de los tribunales competentes de la Ciudad Autónoma de Buenos Aires.</p>
        </section>

        <hr className="border-border mb-16" />

        <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>

        <section className="space-y-4 text-muted-foreground leading-relaxed">
          <p><strong className="text-foreground">Última actualización:</strong> Marzo 2026</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">1. Información que recopilamos</h2>
          <p>Recopilamos información personal que usted nos proporciona voluntariamente al completar formularios en nuestro sitio, incluyendo: nombre, dirección de correo electrónico, número de WhatsApp, nombre de empresa y datos relacionados con su actividad comercial.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">2. Uso de la información</h2>
          <p>La información recopilada se utiliza para: responder a sus consultas, enviar cotizaciones y propuestas comerciales, mejorar nuestros servicios, y comunicarnos con usted sobre novedades relevantes. No vendemos ni compartimos su información personal con terceros con fines de marketing.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">3. Almacenamiento y seguridad</h2>
          <p>Su información se almacena en servidores seguros con medidas de protección técnicas y organizativas adecuadas. Implementamos protocolos de seguridad estándar de la industria para proteger sus datos contra acceso no autorizado, alteración o destrucción.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">4. Cookies y tecnologías similares</h2>
          <p>Utilizamos cookies y tecnologías similares para mejorar la experiencia de navegación, analizar el tráfico del sitio y personalizar el contenido. Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">5. Derechos del usuario</h2>
          <p>Usted tiene derecho a acceder, rectificar, actualizar o solicitar la eliminación de sus datos personales en cualquier momento. Para ejercer estos derechos, puede contactarnos a través de contacto@aduanex.com.ar.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">6. Retención de datos</h2>
          <p>Conservamos sus datos personales durante el tiempo necesario para cumplir con los fines para los que fueron recopilados, o según lo requiera la legislación aplicable.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">7. Cambios en esta política</h2>
          <p>Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Cualquier cambio será publicado en esta página con la fecha de la última actualización.</p>

          <h2 className="text-xl font-semibold text-foreground pt-4">8. Contacto</h2>
          <p>Si tiene preguntas sobre esta política de privacidad, puede contactarnos en: <a href="mailto:contacto@aduanex.com.ar" className="text-primary hover:underline">contacto@aduanex.com.ar</a></p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TerminosYCondiciones;
