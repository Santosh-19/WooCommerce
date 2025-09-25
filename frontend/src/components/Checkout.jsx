import React, { useState } from 'react'
import { useContext } from 'react';
import { OrderContext } from '../contexts/OrderContextProvider';
import { ModelContext } from '../contexts/modalContext';

function Checkout({ totalPrice }) {

    const { setCheckout, handlePlaceOrder } = useContext(OrderContext);
    const { handleClose, cart } = useContext(ModelContext);
    console.log(cart);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        street: "",
        code: "",
        city: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
        }));
    }

    const cartData = cart.map(item => ({
        quantity: item.count,
        name: item.name,
        price: item.price,
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isEmptyField = Object.values(formData).some((value) => value.trim() === "");
        if (isEmptyField) {
            alert("Please fill in all the fields correctly.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    order: {
                        customer: formData,
                        orderinfo : cartData,
                        total : totalPrice,
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert("Error: " + errorData.message);
                return;
            }
            setFormData({
                name: "",
                email: "",
                street: "",
                code: "",
                city: ""
            });

        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong!");
        }
        handlePlaceOrder();
    };

    return (
        <div>
            <div className='checkout'>
                <h4>Checkout</h4>
                <p onClick={handleClose} className='close'>X</p>
            </div>
            <h4>Total Amout : {totalPrice} </h4>
            <div className='form'>
                <div className='form-div'>
                    <label>Full Name</label><br />
                    <input type='text' name='name' value={formData.name} onChange={handleChange} id='name'></input>
                </div>
                <div className='form-div'>
                    <label>Email</label><br />
                    <input type='email' name='email' value={formData.email} onChange={handleChange} id='email'></input>
                </div>
                <div className='form-div'>
                    <label>Street</label><br />
                    <input type='text' name='street' value={formData.street} onChange={handleChange} id='street'></input>
                </div>
                <div className='form-div'>
                    <label>Postal Code</label><br />
                    <input type='text' name='code' value={formData.code} onChange={handleChange} id='postal-code'></input>
                </div>
                <div className='form-div'>
                    <label>City</label><br />
                    <input type='text' name='city' value={formData.city} onChange={handleChange} id='city'></input>
                </div>
            </div>
            <div className='submit'>
                <p onClick={() => setCheckout(false)}>Back</p>
                <button className='button' onClick={handleSubmit}>Submit Order</button>
            </div>
        </div>
    )
}

export default Checkout
