import React, { useState, useEffect } from "react";
import classes from "./Orders.module.css";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const isAdminFromLocalStorage = localStorage.getItem("isAdmin") === "true";
    const existingToken = localStorage.getItem("token");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:8000/orders", {
                    headers: {
                        Authorization: `Bearer ${existingToken}` 
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch orders");
                }
                const data = await response.json();
                setOrders(data); 
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, [existingToken]);

    const formatCreatedAtDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // You can customize the date format using options
    };

    const filteredOrders = orders.filter(order =>
        order.owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.owner.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.owner.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={classes.container}>
            {isAdminFromLocalStorage ? (
                <div >
                    <h2>Zamówienia</h2>
                    <p className={classes.mb_0}>Filtruj po: imieniu, nazwisku lub adresie email</p>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <ul className={classes.listUl}>
                        {filteredOrders.map(order => (
                            <li key={order.id}>
                                <p>Id: {order.owner_id}</p>
                                <p>Imie: {order.owner.name}</p>
                                <p>Nazwisko: {order.owner.surname}</p>
                                <p>Email: {order.owner.email}</p>
                                <p>Number telefonu: {order.owner.phone_number}</p>
                                <p>Data złożenia zamówiania: {formatCreatedAtDate(order.created_at)}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className={classes.textCenter}>You do not have permission to view this page.</p>
            )}
        </div>
    );
};

export default Orders;
