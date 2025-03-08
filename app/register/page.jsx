"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../services/auth/auth";
import Swal from 'sweetalert2';
import bgRegister from "../../public/bgRegister.jpg"

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const result = await register(name, email, password);
        if (result.success) {
            setSuccess(result.message);
            setTimeout(() => router.push("/login"), 2000); // Redirige después de 2s
        } else {
            Swal.fire({
                icon: "error",
                title: "Usuario no registrado",
                text: result.message,
                confirmButtonColor: "#4270F9",
            });
            setError(result.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgRegister.src})` }}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    Crear cuenta
                </h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Nombre completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-[#FF4300] p-3 rounded-lg hover:bg-orange-500 transition duration-300 text-white"
                    >
                        Registrarse
                    </button>
                </form>
                <div className="mt-6">
                    <p className="text-gray-500 text-center text-sm mt-4">
                        ¿Ya tienes cuenta?{" "}
                        <a href="/login" className="text-[#FF4300] hover:underline">
                            Inicia sesión
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
