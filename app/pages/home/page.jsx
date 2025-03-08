import { getOrders } from "@/services/orderService";
import { useState, useEffect } from "react";

const Home = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                console.log(data);
                setOrders(data.data); // Guardar órdenes en el estado
            } catch (err) {
                setError("Error loading orders");
            } finally {
                //setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="h-full overflow-y-auto">

            {
                orders?.map((order, index) =>

                    <div key={index} className="bg-gray-100 p-6 my-3 rounded-xl shadow-md text-sm flex flex-col gap-6">
                        <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                            <p className="text-gray-700 font-semibold">Total:</p>
                            <span className="text-xl font-bold text-[#FF4300]">$ 12.00</span>
                        </div>


                        <div className="flex justify-between items-center">
                            <p className="text-gray-600">📍 {order.pickupAddress}</p>
                            <span className="text-gray-500">{new Date(order.scheduledDate).toLocaleDateString("es-ES", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}</span>
                        </div>

                        <div className="flex justify-between items-center">
                            <p className="text-gray-600">📍 {order.recipientAddress}</p>
                            <div className="bg-blue-600 w-32 py-1 rounded-full text-white shadow-md flex justify-evenly">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="20"
                                    height="20"
                                    className="mr-1"
                                    fill="white"
                                >
                                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-1 14.59-4.29-4.3 1.42-1.41L11 13.17l5.88-5.88 1.41 1.42Z" />
                                </svg>
                                Entregado
                            </div>
                        </div>
                    </div>
                )
            }


        </div>
    )
}

export default Home;