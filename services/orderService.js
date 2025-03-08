import api from "../utils/api";

export async function getOrders() {
    try {
        const response = await api.get("/orders");
        // 
        if (response && response.data) {
            return {
                success: true,
                data: response.data,
            };
        } else {
            throw new Error("La respuesta del servidor es inválida.");
        }

    } catch (error) {

        return {
            success: false,
            message: error.response?.data?.message || "Error al procesar la solicitud.",
        };

    }
}

export async function createOrder(orderData) {
    try {
        const orderPayload = {
            pickupAddress: orderData.direccionRecoleccion,
            scheduledDate: new Date(orderData.fechaProgramada).toISOString(),
            senderName: orderData.nombres,
            senderLastName: orderData.apellidos,
            senderEmail: orderData.correo,
            senderPhone: orderData.telefono,
            recipientAddress: orderData.direccionDestinatario,
            department: orderData.departamento,
            municipality: orderData.municipio,
            referencePoint: orderData.puntoReferencia,
            instructions: orderData.indicaciones,
            packages: orderData.bultos?.map((bulto) => ({
                weight: parseFloat(bulto.peso),
                content: bulto.contenido,
                length: parseInt(bulto.largo, 10),
                width: parseInt(bulto.ancho, 10),
                height: parseInt(bulto.alto, 10)
            })) || []
        };

        console.log("Enviando orden a API:", orderPayload);

        // ✅ Esperamos la respuesta correctamente
        const response = await api.post("/orders", orderPayload);

        // ✅ Verificamos si la respuesta contiene datos
        if (response && response.data) {
            return {
                success: true,
                data: response.data, // Enviamos los datos de la orden creada
            };
        } else {
            throw new Error("La respuesta del servidor es inválida.");
        }
    } catch (error) {
        console.error("Error en createOrder:", error);

        return {
            success: false,
            message: error.response?.data?.message || "Error al procesar la orden.",
        };
    }
}
