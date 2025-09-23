import React from 'react'
import { useContext } from 'react'
import { ModelContext } from '../contexts/modalContext'

function OrderPlace() {
    const{handleClose} = useContext(ModelContext);

    return (
        <div>
            <h3>Success!</h3>
            <p>Your order was subimitted sucssesfully</p>
            <p>We will get back to you.</p>
            <div style={{textAlign:'right'}}>
                <button className='button' onClick={handleClose}>Okay</button>
            </div>
        </div>
    )
}

export default OrderPlace
