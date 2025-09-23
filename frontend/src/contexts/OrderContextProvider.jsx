import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'

export const OrderContext = createContext();

function OrderContextProvider({children}) {

    const [checkout, setCheckout] = useState(false);
    const [order, setOrder] = useState(false);
    function handleCheckout() {
        setCheckout(true);
    }
    const handlePlaceOrder = () => {
        setOrder(true);
    }
    return (
        <OrderContext.Provider value={{handleCheckout, handlePlaceOrder, checkout, order, setOrder, setCheckout}}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider
