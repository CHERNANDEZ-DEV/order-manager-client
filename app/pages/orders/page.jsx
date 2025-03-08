"use client";
import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import StepOne from '../../components/orders/StepOne';
import StepTwo from '../../components/orders/StepTwo';
import { useOrder } from '@/utils/context/orderContext';
import { createOrder } from '@/services/orderService';
import Image from "next/image";
import nextIcon from "../../../public/nxt.svg"
import Swal from 'sweetalert2';

const steps = [
    { title: 'Datos de entrega', content: <StepOne /> },
    { title: 'Agregar bultos', content: <StepTwo /> }
];

const Orders = () => {

    const { orderData } = useOrder();
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const isOrderDataValid = () => {
        const requiredFields = [
            'direccionRecoleccion', 'fechaProgramada', 'nombres', 'apellidos',
            'correo', 'telefono', 'direccionDestinatario', 'departamento',
            'municipio'
        ];

        for (const field of requiredFields) {
            if (!orderData[field] || String(orderData[field]).trim() === "") {
                return field; // Retornamos el campo que falta
            }
        }
        return null; // Retornamos null si todos los campos están llenos
    };

    const verifyPackages = () => {
        return orderData.bultos && orderData.bultos.length === 0;
    };

    const verifyData = async () => {
        if (verifyPackages()) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe agregar al menos un bulto a la orden',
                confirmButtonColor: '#d33',
            });
            return;
        }

        try {
            const response = await createOrder(orderData);

            if (response && response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Orden Creada',
                    text: 'La orden se ha creado exitosamente',
                    confirmButtonColor: '#4270F9',
                }).then(() => {
                    window.location.reload();
                });
            } else {
                throw new Error("La respuesta del servidor no indica éxito");
            }
        } catch (error) {
            console.error("Error al crear la orden:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al crear la orden',
                text: 'Hubo un problema al procesar la orden. Inténtalo de nuevo más tarde.',
                confirmButtonColor: '#d33',
            });
        }
    };


    const next = () => {
        if (current === 0) {
            const fieldMissing = isOrderDataValid();
            if (fieldMissing) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Complete y confirme todos los datos',
                    confirmButtonColor: '#d33',
                });
                return;
            }
        }

        setCurrent(current + 1);
    };

    const prev = () => { setCurrent(current - 1) };

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    const contentStyle = {
        height: "calc(100vh - 200px)",
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: 'white',
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <>
            <Steps current={current} items={steps.map((item) => ({ key: item.title, title: item.title }))} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div
                style={{
                    marginTop: 12,
                }}

                className="flex justify-end"
            >
                {current < steps.length - 1 && (

                    <Button
                        type="primary"
                        onClick={() => next()}
                        style={{ height: "48px", fontSize: "12px", backgroundColor: "#4270F9", borderColor: "#2F5CDF", color: "#fff" }}>
                        <p className="mr-4">Siguiente</p>
                        <Image src={nextIcon} alt="Box" width={20} height={20} />

                    </Button>

                )}
                {current === steps.length - 1 && (

                    <Button type="primary" onClick={() => verifyData()}
                        style={{ height: "48px", fontSize: "12px", backgroundColor: "#4270F9", borderColor: "#2F5CDF", color: "#fff" }}>
                        <p className="mr-4">Enviar</p>
                        <Image src={nextIcon} alt="Box" width={20} height={20} />
                    </Button>

                )}
                {current > 0 && (

                    <Button
                        style={{
                            margin: '0 8px', height: "48px"
                        }}
                        onClick={() => prev()}
                    >
                        Anterior
                    </Button>


                )}
            </div>
        </>
    );
};
export default Orders;