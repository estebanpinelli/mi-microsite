import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        passengers: 1,
        month: "",
        day: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const templateParams = {
            from_name: form.name,
            from_email: form.email,
            phone: form.phone,
            passengers: form.passengers,
            travel_date: `${form.day} de ${form.month}`,
            message: form.message,
        };

        emailjs
            .send("service_fy6p39e", "template_ns3vbtb", templateParams, "1i5lotGd3gMfy9bmo")
            .then(() => {
                toast.success("✅ Mensaje enviado correctamente");
                setForm({
                    name: "",
                    email: "",
                    phone: "",
                    passengers: 1,
                    month: "",
                    day: "",
                    message: "",
                });
            })
            .catch((error) => console.error("Error al enviar:", error));
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Contacto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nombre" required className="w-full p-2 border border-gray-300 rounded" />
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Correo electrónico" required className="w-full p-2 border border-gray-300 rounded" />
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Número de teléfono" required className="w-full p-2 border border-gray-300 rounded" />
                <input type="number" name="passengers" value={form.passengers} onChange={handleChange} min="1" required className="w-full p-2 border border-gray-300 rounded" placeholder="Cantidad de pasajeros" />

                <div className="flex gap-2">
                    <select name="month" value={form.month} onChange={handleChange} required className="w-1/2 p-2 border border-gray-300 rounded">
                        <option value="">Mes</option>
                        {["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"].map((mes) => (
                            <option key={mes} value={mes}>{mes}</option>
                        ))}
                    </select>
                    <input type="number" name="day" value={form.day} onChange={handleChange} min="1" max="31" required className="w-1/2 p-2 border border-gray-300 rounded" placeholder="Día" />
                </div>

                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Mensaje" required className="w-full p-2 border border-gray-300 rounded h-24"></textarea>

                <button type="submit" className="w-full bg-[#FF6600] text-white py-2 rounded hover:bg-orange-600 transition">
                    Enviar
                </button>
            </form>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
        </div>
    );
};

export default Contact;