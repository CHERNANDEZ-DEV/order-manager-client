import { logout } from "../../services/auth/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-[#FF4300] hover:bg-orange-500 text-white text-sm px-4 py-2 rounded-md transition duration-300 shadow-md"
        >
            Cerrar sesión
        </button>
    );
}
