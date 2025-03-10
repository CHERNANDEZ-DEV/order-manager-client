import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001", 
    timeout: 10000, 
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");

        if (token && !config.url.includes("/auth/login")) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
