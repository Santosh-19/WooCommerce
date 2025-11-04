import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react';

export const OrderContext = createContext();

function OrderContextProvider({children}) {

    const [checkout, setCheckout] = useState(false);
    const [order, setOrder] = useState(false);
    const [orderHistory, setOrderHistory] = useState([]);

     useEffect(() => {
            const fetchOrder = async () => {
                const response = await fetch('http://localhost:3000/orders');
                if (!response.ok) {
                    throw new Error("Failed To fetch Meals");
                }
                const data = await response.json();
                setOrderHistory(data);
            };
            fetchOrder();
        }, [])
   
    function handleCheckout() {
        setCheckout(true);
    }
    const handlePlaceOrder = () => {
        setOrder(true);
    }
    return (
        <OrderContext.Provider value={{handleCheckout, handlePlaceOrder, checkout, order, setOrder, setCheckout, orderHistory}}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider
