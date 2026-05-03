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
      [name]: name === "passengers" || name === "day" ? value : value,
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

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
          autoComplete="name"
          className="w-full p-2 border border-gray-400 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FE9E32]"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
          autoComplete="email"
          className="w-full p-2 border border-gray-400 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FE9E32]"
        />

        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Número de teléfono"
          required
          autoComplete="tel"
          className="w-full p-2 border border-gray-400 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FE9E32]"
        />

        <input
          type="text"
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder="¿A dónde quieres viajar?"
          required
          className="w-full p-2 border border-gray-400 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FE9E32]"
        />

        <input
          type="number"
          name="passengers"
          value={form.passengers}
          onChange={handleChange}
          min="1"
          step="1"
          required
          placeholder="Cantidad de pasajeros"
          className="w-full p-2 border border-gray-400 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FE9E32]"
        />

        <div className="flex gap-2">
          <select
            name="month"
            value={form.month}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border border-gray-400 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FE9E32]"
          >
            <option value="">Mes</option>
            {MONTHS.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
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
            className="w-1/2 p-2 border border-gray-400 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FE9E32]"
          />
        </div>

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Mensaje"
          required
          rows={5}
          className="w-full p-2 border border-gray-400 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FE9E32]"
        />

        <button
          type="submit"
          disabled={isSending}
          className={`w-full text-white py-2 rounded transition font-bold shadow-sm ${
            isSending ? "bg-gray-400 cursor-not-allowed" : "bg-[#FE9E32] hover:bg-orange-600 active:scale-95"
          }`}
        >
          {isSending ? "Enviando..." : "Solicitar Presupuesto"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
};

export default ContactForm;