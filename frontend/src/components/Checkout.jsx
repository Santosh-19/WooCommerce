import React, { useState } from 'react'
import { useContext } from 'react';
import { OrderContext } from '../contexts/OrderContextProvider';
import { ModelContext } from '../contexts/modalContext';

function Checkout({ totalPrice }) {

    const { setCheckout, handlePlaceOrder, cart} = useContext(OrderContext);
    const {handleClose} = useContext(ModelContext)

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
    const handleSubmit = (e) => {
        e.preventDefault();
        const isEmptyField = Object.values(formData).some((value) => value.trim() === "");
        if (isEmptyField) {
            alert("Please fill in all the fields correctly.");
            return;
        }
        setFormData({
            name: "",
            email: "",
            street: "",
            code: "",
            city: ""
        });
        handlePlaceOrder();

        fetch('http://localhost:3000/orders',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order :{
                    items: cart.items,
                    customer : setFormData
                }
            })
        })
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
