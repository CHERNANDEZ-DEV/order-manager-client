import api from "../../utils/api";

export function isAuthenticated() {
    return localStorage.getItem("authToken") !== null;
}

export async function login(email, password) {
    try {
        
        const response = await api.post("/auth/login", { email, password });
        localStorage.setItem("authToken", response.data.access_token); 
        return { success: true };

    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Login failed" };
    }
}

export async function register(name, email, password) {
    try {
        const response = await api.post("/auth/register", { name, email, password });
        return { success: true, message: "User registered successfully!" };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Registration failed",
        };
    }
}

export function logout() {
    localStorage.removeItem("authToken");
}
