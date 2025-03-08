"use client";
import { Form, Input, DatePicker, Select, Button } from "antd";
import { useOrder } from "@/utils/context/orderContext";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const options = [
    { label: "Colonia Las Magnolias Calle ruta militar #1, San Miguel, San Miguel.", value: "Colonia Las Magnolias Calle ruta militar #1, San Miguel, San Miguel." },
    { label: "Residencial Altavista, Avenida Norte #23, Ilopango, San Salvador.", value: "Residencial Altavista, Avenida Norte #23, Ilopango, San Salvador." },
    { label: "Colonia Jardines del Volcán, Calle Las Flores #8, Santa Tecla, La Libertad.", value: "Colonia Jardines del Volcán, Calle Las Flores #8, Santa Tecla, La Libertad." },
    { label: "Barrio San Antonio, Calle Principal #12, Sonsonate, Sonsonate.", value: "Barrio San Antonio, Calle Principal #12, Sonsonate, Sonsonate." },
];

const optionsDepartment = [
    { label: "Ahuachapán", value: "Ahuachapán" },
    { label: "Cabañas", value: "Cabañas" },
];

// 🔹 Diccionario de Municipios por Departamento
const municipiosPorDepartamento = {
    Ahuachapán: [
        { label: "Ahuachapán", value: "Ahuachapán" }
    ],
    Cabañas: [
        { label: "Ilobasco", value: "Ilobasco" },
        { label: "Sensuntepeque", value: "Sensuntepeque" }
    ]
};

// const labelRender = (props) => {
//     const { label, value } = props;
//     return label ? value : <span className="text-[#7682A0] text-xs">Seleccionar ubicación</span>;
// };

const labelRender = ({ label }) => label || <span className="text-[#7682A0] text-xs">Seleccionar ubicación</span>;
const labelRenderMunicipios = ({ label }) => label || <span className="text-[#7682A0] text-xs">Seleccionar municipio</span>;
const labelRenderDepartamentos = ({ label }) => label || <span className="text-[#7682A0] text-xs">Seleccionar departamento</span>;


// const labelRenderMunicipios = (props) => {
//     const { label, value } = props;
//     return label ? value : <span className="text-[#7682A0] text-xs">Seleccionar municipio</span>;
// };

// const labelRenderDepartamentos = (props) => {
//     const { label, value } = props;
//     return label ? value : <span className="text-[#7682A0] text-xs">Seleccionar departamento</span>;
// };

const onFinishFailed = (errorInfo) => {
    Swal.fire({
        icon: "error",
        title: "Datos incompletos",
        text: "Por favor completa todos los campos requeridos antes de confirmar.",
        confirmButtonColor: "#4270F9",
    });
};

const StepOne = () => {

    const { orderData, updateOrderData } = useOrder();
    const [form] = Form.useForm();
    const [municipios, setMunicipios] = useState([]);

    useEffect(() => {
        form.setFieldsValue(orderData);
    }, [orderData, form]);

    useEffect(() => {
        if (orderData.departamento) {
            setMunicipios(municipiosPorDepartamento[orderData.departamento] || []);
        }
    }, [orderData.departamento]); // ✅ Only depend on the department, not the array itself.



    const handleDepartamentoChange = (value) => {
        const municipiosFiltrados = municipiosPorDepartamento[value] || [];
        setMunicipios(municipiosFiltrados);

        // Mantener el municipio si sigue siendo válido
        if (orderData.municipio && municipiosFiltrados.some(m => m.value === orderData.municipio)) {
            form.setFieldsValue({ municipio: orderData.municipio });
        } else {
            form.setFieldsValue({ municipio: undefined });
        }
    };


    const onFinish = (values) => {
        updateOrderData(values);
        Swal.fire({
            icon: "success",
            title: "Datos confirmados",
            text: "Tus datos han sido confirmados correctamente",
            confirmButtonColor: "#4270F9",
        });
    };

    const onFinishFailed = (errorInfo) => {
        Swal.fire({
            icon: "error",
            title: "Datos incompletos",
            text: "Por favor completa todos los campos requeridos antes de confirmar",
            confirmButtonColor: "#4270F9",
        });
    };

    return (
        <div className="h-full overflow-y-auto p-4">
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <div className="flex flex-col">
                    {/* Fila 1: Dirección de recolección y Fecha Programada */}
                    <div className="grid grid-cols-3 gap-4">
                        <Form.Item
                            label={<span className="text-[#7682A0] text-xs">📍 Dirección de recolección</span>}
                            name="direccionRecoleccion"
                            rules={[{ required: true, message: "Campo requerido" }]}
                            className="col-span-2"
                        >
                            <Select
                                labelRender={labelRender}
                                placeholder="Selecciona una opción"
                                className="w-full"
                                options={options}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-[#7682A0] text-xs">📅 Fecha programada</span>}
                            name="fechaProgramada"
                            rules={[{ required: true, message: "Campo requerido" }]}
                        >
                            <DatePicker className="w-full" format={dateFormatList} />
                        </Form.Item>
                    </div>

                    {/* Fila 2: Nombres, Apellidos y Correo Electrónico */}
                    <div className="grid grid-cols-3 gap-4">
                        <Form.Item
                            label={<span className="text-[#7682A0] text-xs">Nombres</span>}
                            name="nombres"
                            rules={[{ required: true, message: "Campo requerido" }]}
                        >
                            <Input placeholder="Carlos Alberto" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-[#7682A0] text-xs">Apellidos</span>}
                            name="apellidos"
                            rules={[{ required: true, message: "Campo requerido" }]}
                        >
                            <Input placeholder="Hernández Guerra" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-[#7682A0] text-xs">Correo electrónico</span>}
                            name="correo"
                            rules={[
                                { required: true, message: "Campo requerido" },
                                { type: "email", message: "Ingresa un correo válido" },
                            ]}
                        >
                            <Input placeholder="tu-email@email.com" />
                        </Form.Item>
                    </div>

                    {/* Fila 3: Teléfono y Dirección del destinatario */}
                    <div className="grid grid-cols-3 gap-4">
                        <Form.Item
                            label={<span className="text-[#7682A0] text-xs">Teléfono</span>}
                            name="telefono"
                            rules={[{ required: true, message: "Campo requerido" }]}
                            className="col-span-1"
                        >
                            <Input placeholder="Teléfono" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-[#7682A0] text-xs">Dirección del destinatario</span>}
                            name="direccionDestinatario"
                            rules={[{ required: true, message: "Campo requerido" }]}
                            className="col-span-2"
                        >
                            <Input placeholder="Dirección del destinatario" />
                        </Form.Item>
                    </div>

                    {/* Fila 4: Departamento, Municipio y Punto de Referencia */}
                    <div className="grid grid-cols-3 gap-4">
                        <Form.Item
                            label={<span className="text-[#7682A0] text-xs">Departamento</span>}
                            name="departamento"
                            rules={[{ required: true, message: "Campo requerido" }]}
                        >
                            <Select
                                // fieldNames={{ label: "label", value: "value" }}
                                labelRender={labelRenderDepartamentos}
                                placeholder="Selecciona"
                                className="w-full"
                                options={optionsDepartment}
                                onChange={handleDepartamentoChange}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-[#7682A0] text-xs">Municipio</span>}
                            name="municipio"
                            rules={[{ required: true, message: "Campo requerido" }]}
                        >
                            <Select
                                labelRender={labelRenderMunicipios}
                                placeholder="Selecciona"
                                className="w-full"
                                options={municipios}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-[#7682A0] text-xs">Punto de referencia</span>}
                            name="puntoReferencia"
                            rules={[{ required: true, message: "Campo requerido" }]}
                        >
                            <Input placeholder="Punto de referencia" />
                        </Form.Item>
                    </div>

                    {/* Fila 5: Indicaciones */}

                    <div className="flex gap-4">
                        <Form.Item
                            className="w-1/2"
                            label={<span className="text-[#7682A0] text-xs">Indicaciones</span>}
                            name="indicaciones">
                            <Input placeholder="Indicaciones adicionales" />
                        </Form.Item>

                        <div className="flex items-center justify-center w-1/2 mt-2">
                            <Button type="primary" htmlType="submit" style={{ width: "100%"  ,fontSize: "12px", backgroundColor: "#4270F9", borderColor: "#2F5CDF", color: "#fff" }}>
                                Confirmar datos
                            </Button>
                        </div>
                    </div>

                </div>
            </Form>
        </div>
    );
};

export default StepOne;

