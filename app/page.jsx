"use client";
import ProtectedLayout from "./components/ProtectedLayout";
import Orders from "./pages/orders/page";
import logo from "../public/logo.svg";
import Image from "next/image";
import LogoutButton from "./components/LogoutButton";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import Home from "./pages/home/page";
import { useState } from "react";

export default function HomePage() {

  const [view, setView] = useState("create");

  return (
    <div>
      <ProtectedLayout>

        <header className="flex items-center justify-between bg-white p-4 mb-4 border-b-1 border-gray-300">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Image
                src={logo}
                alt="Boxful Logo"
                width={80}
                height={80}
              />

            </div>
            <div className="h-6 border-l border-gray-300 mx-4"></div>
            <button
              onClick={() => setView("home")}
              className={`text-gray-700 hover:text-gray-900 transition ${view === "home" ? "font-bold" : "" }`}
            >
              Registro
            </button>
            <button
              onClick={() => setView("create")}
              className={`text-gray-700 hover:text-gray-900 transition ${view === "create" ? "font-bold" : "" }`}
            >
              Crear orden
            </button>

          </div>
          <div>
            <LogoutButton />
          </div>
        </header>

        <main className="p-4">
          {view === "create" && <Orders />}
          {view === "home" && <Home />}
        </main>

      </ProtectedLayout>
    </div>
  );
}
