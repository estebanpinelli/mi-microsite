import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  passengers: 1,
  destination: "",
  month: "",
  day: "",
  message: "",
};

const ContactForm = () => {
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState(initialForm);

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    const dayNumber = Number(form.day);
    const passengersNumber = Number(form.passengers);

    if (!Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > 31) {
      toast.error("Revisa el día del viaje.");
      return;
    }

    if (!Number.isInteger(passengersNumber) || passengersNumber < 1) {
      toast.error("Revisa el número de pasajeros.");
      return;
    }

    setIsSending(true);

    const templateParams = {
      from_name: form.name.trim(),
      from_email: form.email.trim(),
      phone: form.phone.trim(),
      passengers: passengersNumber,
      destination: form.destination.trim(),
      travel_date: `${form.day} de ${form.month}`,
      message: form.message.trim(),
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );

      toast.success("✅ Mensaje enviado correctamente");
      setForm(initialForm);
    } catch (error) {
      console.error("Error al enviar:", error);
      toast.error("❌ Error al enviar el mensaje.");
    } finally {
      setIsSending(false);
    }
  };

  const inputBase =
    "w-full rounded-sm border border-filete bg-papel px-4 py-3 text-tinta placeholder-muted transition duration-200 focus:outline-none focus:ring-2 focus:ring-naranja focus:border-naranja";
  const labelBase = "mb-2 block text-sm font-semibold text-tinta";

  return (
    <section className="relative mx-auto max-w-4xl py-10">
      <div className="relative overflow-hidden rounded-sm border border-filete bg-white">
        {/* Header */}
        <div className="border-b border-filete px-6 md:px-8 py-6">
          <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-muted font-semibold">
            Planifica tu próxima experiencia
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-tinta">
            Solicita tu viaje a medida
          </h2>
          <p className="mt-2 text-sm md:text-base text-muted">
            Cuéntanos tu idea y te enviamos una propuesta personalizada.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 md:px-8 py-6 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className={labelBase}>Nombre completo</label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ej: Camila Fernández"
                required
                autoComplete="name"
                className={inputBase}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelBase}>Correo electrónico</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
                autoComplete="email"
                className={inputBase}
              />
            </div>

            <div>
              <label htmlFor="phone" className={labelBase}>Teléfono / WhatsApp</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+54 9 11 1234 5678"
                required
                autoComplete="tel"
                className={inputBase}
              />
            </div>

            <div>
              <label htmlFor="destination" className={labelBase}>Destino deseado</label>
              <input
                id="destination"
                type="text"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                placeholder="Ej: Japón, Islandia, Patagonia..."
                required
                className={inputBase}
              />
            </div>

            <div>
              <label htmlFor="passengers" className={labelBase}>Cantidad de pasajeros</label>
              <input
                id="passengers"
                type="number"
                name="passengers"
                value={form.passengers}
                onChange={handleChange}
                min="1"
                step="1"
                required
                className={inputBase}
              />
            </div>

            <div>
              <span className={labelBase}>Fecha aproximada de viaje</span>
              <div className="grid grid-cols-2 gap-3">
                <select
                  name="month"
                  value={form.month}
                  onChange={handleChange}
                  required
                  className={inputBase}
                >
                  <option value="">Mes</option>
                  {MONTHS.map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>

                <input
                  type="number"
                  name="day"
                  value={form.day}
                  onChange={handleChange}
                  min="1"
                  max="31"
                  step="1"
                  required
                  placeholder="Día"
                  className={inputBase}
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="message" className={labelBase}>Cuéntanos qué tipo de viaje imaginas</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Presupuesto estimado, estilo de viaje, intereses, fechas flexibles, etc."
              required
              rows={5}
              className={inputBase}
            />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-muted">
              Te responderemos dentro de las próximas 24–48 hs hábiles.
            </p>

            {/* font-bold (no font-semibold) es a propósito acá, aunque
                Work Sans solo tenga cargados los pesos 400/500/600: tinta
                sobre naranja a este tamaño (20px) solo pasa WCAG AA por la
                excepción de "texto grande en negrita" (mínimo 3:1 en vez
                de 4.5:1), y esa excepción la decide el font-weight
                DECLARADO en el CSS (lo que lee axe/los navegadores para
                accesibilidad), no qué archivo de fuente termina
                usándose. Con font-synthesis:none no hay negrita falsa, así
                que se ve exactamente igual que font-semibold — pero
                declarado en 600 en vez de 700 pierde la excepción y el
                botón vuelve a fallar el contraste (ver auditoría). */}
            <button
              type="submit"
              disabled={isSending}
              className={`inline-flex items-center justify-center rounded-sm px-6 py-3 text-xl font-bold text-tinta transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-naranja ${
                isSending
                  ? "bg-filete text-muted cursor-not-allowed"
                  : "bg-naranja hover:bg-naranja/90 active:scale-95"
              }`}
            >
              {isSending ? "Enviando..." : "Solicitar Presupuesto"}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
        toastClassName="rounded-lg"
      />
    </section>
  );
};

export default ContactForm;