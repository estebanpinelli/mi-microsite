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
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#FE9E32] focus:border-[#FE9E32]";
  const labelBase = "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <section className="relative mx-auto max-w-4xl px-4 md:px-6 py-10">
      {/* Glow decor sutil */}
      <div className="pointer-events-none absolute -top-14 -right-10 h-40 w-40 rounded-full bg-orange-200/40 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-amber-200/40 blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(2,6,23,0.08)]">
        {/* Header */}
        <div className="border-b border-slate-200 px-6 md:px-8 py-6">
          <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-orange-500 font-semibold">
            Planifica tu próxima experiencia
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-slate-900">
            Solicita tu viaje a medida
          </h2>
          <p className="mt-2 text-sm md:text-base text-slate-600">
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
            <p className="text-xs text-slate-500">
              Te responderemos dentro de las próximas 24–48 hs hábiles.
            </p>

            <button
              type="submit"
              disabled={isSending}
              className={`inline-flex items-center justify-center rounded-xl px-6 py-3 font-bold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FE9E32] ${
                isSending
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-[#FE9E32] hover:bg-orange-600 active:scale-95 shadow-md hover:shadow-lg"
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