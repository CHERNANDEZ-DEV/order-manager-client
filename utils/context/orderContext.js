import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

    const [orderData, setOrderData] = useState({
        direccionRecoleccion: "",
        fechaProgramada: "",
        nombres: "",
        apellidos: "",
        correo: "",
        telefono: "",
        direccionDestinatario: "",
        departamento: "",
        municipio: "",
        puntoReferencia: "",
        indicaciones: "",
        bultos: [],
    });

    const updateOrderData = (newData) => {
        setOrderData((prevData) => ({ ...prevData, ...newData }));
    };

    return (
        <OrderContext.Provider value={{ orderData, updateOrderData }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder debe ser usado dentro de un OrderProvider");
    }
    return context;
};