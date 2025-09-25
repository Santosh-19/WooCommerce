import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../index.css';
import Checkout from './Checkout';
import OrderPlace from './OrderPlace';
import { useContext } from 'react';
import { ModelContext } from '../contexts/modalContext';
import { OrderContext } from '../contexts/OrderContextProvider';
import MyOrder from './MyOrder';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: '#e4ddd4',
    border: '2px solid #000',
    boxShadow: 24,
    color: 'black',
    p: 2,
};

// export default function Cart({ open, setOpen, cart, setCart, handleCheckout, checkout, setCheckout, order, handlePlaceOrder}) 
export default function Cart() {
    const { setCart, cart, setOpen, open, handleClose,myorder } = useContext(ModelContext)
    const {handleCheckout, handlePlaceOrder, checkout, order} = useContext(OrderContext);

    const addMore = () => {
        setOpen(false);
    }
    function decrement(id) {
        setCart((precart) =>
            precart.map((item) => {
                // if( item.count > 1){
                // item.id === id ? {...item, count: item.count - 1 } : item
                // }
                if (item.id === id) {
                    if (item.count > 1) {
                        return { ...item, count: item.count - 1 }
                    } else {
                        return item;
                    }
                }
                return item;
            }
            )
        );
    };

    function increment(id) {
        setCart((precart) =>
            precart.map((item) => {
                return item.id === id ? { ...item, count: item.count + 1 } : item;
            })
        )
    }

    const price = cart.reduce((total, item) => total + item.price * item.count, 0);
    const totalPrice = parseFloat(price.toFixed(2));

    return (
        <div>
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >

                    <div className='model'>
                        {!myorder ? (
                        <div className='cart-info'>
                        {!checkout ? (
                            <div>
                                <div className='card-header'>
                                    <h4>Your Cart</h4>
                                    <p onClick={handleClose} className='close'>X</p>
                                </div>
                                {cart.length > 0 ?
                                    <div>
                                        {cart.map((item) => (
                                            <div key={item.id} className='meal-info'>
                                                <div className='meal-data'>{item.name} - {item.count} x {item.price}</div>
                                                <div className='increase-items'>
                                                    <button onClick={() => decrement(item.id)}>-</button> {item.count} <button onClick={() => increment(item.id)}>+</button>
                                                </div>
                                            </div>
                                        ))}
                                        <h4>Total : {totalPrice}</h4>
                                        <div className='submit'>
                                            <button onClick={addMore} className='add-more'>Add More</button>
                                            <button onClick={handleCheckout} className='button'>Go To Checkout</button>
                                        </div>
                                    </div>
                                    :
                                    <p>Your cart is empty</p>
                                }
                            </div>
                        ) : (
                            <div>
                                {!order ? (
                                    <Checkout totalPrice={totalPrice} />
                                ) : (
                                    <OrderPlace />
                                )}
                            </div>
                        )}
                        </div>
                        ):(
                            <div>
                               <MyOrder/>
                            </div>
                        )}
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
