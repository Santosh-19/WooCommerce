import React, { useEffect, useState } from "react";
import { ModelContext } from "../contexts/modalContext";
import { OrderContext } from "../contexts/OrderContextProvider";
import { useContext } from "react";

const MyOrder = () => {
    const { handleClose } = useContext(ModelContext);
    const {orderHistory} = useContext(OrderContext);
    return (
        <>
            <div className='checkout'>
                <h4>My Orders</h4>
                <p onClick={handleClose} className='close'>X</p>
            </div>
            <div className="order-history">
                <table>
                    <tbody>
                        <tr>
                            <td>Sr. No</td>
                            <td>Product Name</td>
                            <td>Quantity</td>
                            <td>Price</td>
                            <td>Status</td>
                        </tr>
                        {orderHistory.map((item,index)=>(
                            item.orderinfo.map((order, i) => 
                            <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{order.name}</td>
                            <td>{order.quantity}</td>
                            <td>{order.price}</td>
                            <td>InProgress</td>
                            </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MyOrder;