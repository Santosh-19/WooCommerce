import React from 'react'
import { createContext, useState } from 'react'
import { useContext } from 'react';
import { OrderContext } from './OrderContextProvider';

export const ModelContext = createContext();

function ModalContextProvider({ children }) {
    const {setCheckout,setOrder} = useContext(OrderContext)
    
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [myorder, setMyorder] = useState(false);
    const handleOpen = (meal) => {
        setOpen(true);
        setCheckout(false);
        setOrder(false);
        setCart((prev) => {
            const handleDuplicate = prev.some((item) => item.id === meal.id)

            if (handleDuplicate) {
                return prev.map((item) =>
                    item.id === meal.id ? { ...item, count: item.count + 1 } : item
                );
            }
            else {
                return [...prev, { ...meal, count: 1 }];
            }
        });
    };
    const handleClose = () => {
        setOpen(false);
        setMyorder(false);
        setCart([]);
    }

    const handleMyOrder = () =>{
        setMyorder(true);
        setOpen(true);
    }
    return (
        <ModelContext.Provider value={{ handleOpen, cart, setOpen, open, handleClose, setCart, handleMyOrder, myorder}}>
            {children}
        </ModelContext.Provider>
    );
}

export default ModalContextProvider
