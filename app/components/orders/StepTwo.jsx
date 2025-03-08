"use client";
import React, { useState } from "react";
import Image from "next/image";
import deleteIcon from "../../../public/delete.svg";
import plusIcon from "../../../public/add.svg"
import boxIcon from "../../../public/box.svg"
import { useOrder } from "@/utils/context/orderContext";
import Swal from 'sweetalert2';

const StepTwo = () => {

    const { orderData, updateOrderData } = useOrder();

    const [formData, setFormData] = useState({
        largo: "",
        alto: "",
        ancho: "",
        peso: "",
        contenido: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddBulto = () => {
        if (!formData.largo || !formData.alto || !formData.ancho || !formData.peso || !formData.contenido) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Complete los datos del bulto',
                confirmButtonColor: '#d33',
            });
            return;
        }

        updateOrderData({
            bultos: [...(orderData.bultos || []), formData], // 🔹 Agrega al contexto sin perder datos previos
        });

        setFormData({ largo: "", alto: "", ancho: "", peso: "", contenido: "" }); // 🔹 Limpia los campos
    };

    return (
        <div className="h-full overflow-y-auto p-4">

            <p className="text-sm font-semibold mb-2 text-start">Agrega tus bultos</p>

            {/* Formulario para agregar bultos */}
            <div className="p-4 bg-gray-100 rounded-lg">

                <div className="flex gap-4 p-4">

                    <div className="flex">

                        <div className="flex flex-col justify-end mb-2 items-center mr-4">

                            <Image src={boxIcon} alt="Box" width={30} height={30} />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[#454A55] text-sm text-start">Largo</label>
                            <input type="text" name="largo" value={formData.largo} onChange={handleChange} className="w-24 p-2 rounded-bl-md  rounded-tl-md border border-[#E0E3E8] bg-white focus:border-blue-500 outline-none" placeholder="cm" />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 text-sm text-start">Alto</label>
                            <input type="text" name="alto" value={formData.alto} onChange={handleChange} className="w-24 p-2 border border-[#DEE1E7] bg-white focus:border-blue-500 outline-none" placeholder="cm" />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-700 text-sm text-start">Ancho</label>
                            <input type="text" name="ancho" value={formData.ancho} onChange={handleChange} className="w-24 p-2 border rounded-br-md rounded-tr-md border-[#DEE1E7] bg-white focus:border-blue-500 outline-none" placeholder="cm" />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 text-sm text-start">Peso en libras</label>
                        <input type="text" name="peso" value={formData.peso} onChange={handleChange} className="w-24 p-2 border rounded-md border-[#DEE1E7] bg-white focus:border-blue-500 outline-none" placeholder="lb" />
                    </div>

                    <div className="flex flex-col flex-1">
                        <label className="text-gray-700 text-sm text-start">Contenido</label>
                        <input type="text" name="contenido" value={formData.contenido} onChange={handleChange} className="p-2 border rounded-md border-[#DEE1E7] bg-white focus:border-blue-500 outline-none" placeholder="Descripción" />
                    </div>
                </div>

                <div className="flex justify-end p-4">
                    <button
                        onClick={handleAddBulto}
                        className="bg-[#ECEEF1] text-[#7682A0] border border-[#E1E4EC] px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-200 transition"
                    >
                        <p className="text-sm font-medium">Agregar</p>
                        <Image src={plusIcon} alt="Agregar" width={16} height={16} />
                    </button>

                </div>
            </div>

            <p className="mt-4 text-sm font-semibold text-start">Bultos registrados</p>

            {/* Lista de bultos agregados */}
            <div className="p-4 border-1 border-green-400 rounded-lg mt-2">
                {orderData.bultos?.length > 0 ? (
                    orderData.bultos.map((bulto, index) => (
                        <div key={index} className="flex gap-4 mb-2 items-center">
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-sm text-start">Peso en libras</span>
                                <div className="bg-white p-2 rounded-lg flex justify-between w-24 border border-gray-300">
                                    <p>{bulto.peso}</p>
                                    <p className="text-gray-400">lb</p>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <span className="text-gray-500 text-sm text-start">Contenido</span>
                                <div className="bg-white p-2 rounded-lg flex border border-gray-300">
                                    <p>{bulto.contenido}</p>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-sm text-start">Largo</span>
                                    <div className="bg-white p-2 rounded-bl-md rounded-tl-md flex justify-between w-20 border border-gray-300">
                                        <p>{bulto.largo}</p>
                                        <p className="text-gray-400">cm</p>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-sm text-start">Alto</span>
                                    <div className="bg-white p-2 flex justify-between w-20 border border-gray-300">
                                        <p>{bulto.alto}</p>
                                        <p className="text-gray-400">cm</p>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-sm text-start">Ancho</span>
                                    <div className="bg-white p-2 rounded-br-md rounded-tr-md flex justify-between w-20 border border-gray-300">
                                        <p>{bulto.ancho}</p>
                                        <p className="text-gray-400">cm</p>
                                    </div>
                                </div>

                            </div>

                            {/* Botón de eliminar con el icono SVG */}
                            <button className="p-2 flex items-center justify-center hover:bg-red-100 rounded-full transition"
                                onClick={() => {
                                    const newBultos = orderData.bultos.filter((_, i) => i !== index);
                                    updateOrderData({ bultos: newBultos });
                                }}>
                                <Image src={deleteIcon} alt="Eliminar" width={20} height={20} />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No hay bultos agregados</p>
                )}
            </div>
        </div>
    );
};

export default StepTwo;
