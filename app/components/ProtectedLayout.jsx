"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../../services/auth/auth";

import { OrderProvider } from "@/utils/context/orderContext";


export default function ProtectedLayout({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/login");
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <main className="p-4 h-screen">
                <OrderProvider>
                    {children}
                </OrderProvider>
            </main>
        </div>
    );
}
