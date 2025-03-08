"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../services/auth/auth";
import bgLogin from "../../public/bgLogin.jpg"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        const result = await login(email, password);
        if (result.success) {
            router.push("/");
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgLogin.src})` }}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    Iniciar sesión
                </h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                        className="bg-[#FF4300] text-white  p-3 rounded-lg hover:bg-orange-500 transition duration-300"
                    >
                        Ingresar al sistema
                    </button>
                </form>
                <div className="mt-6">
                    <p className="text-gray-500 text-center text-sm mt-4">
                        ¿No tienes cuenta?{" "}
                        <a href="/register" className="text-[#FF4300] hover:underline">
                            Regístrate
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
