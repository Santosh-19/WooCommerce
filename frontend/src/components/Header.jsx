import React from 'react'
import logo from '../assets/logo.jpg'
import { useContext } from 'react'
import { ModelContext } from '../contexts/modalContext'

function Header() {
  const {setOpen, cart, handleMyOrder} = useContext(ModelContext);
  return (
    <div id='main-header'>
        <div id='title'>
        <img src={logo} alt='logo' />
        <h1 id='title'>Food</h1>
        </div>
        <div>
          <button onClick={()=> setOpen(true)} className='hd-btn'>Cart ({cart.length})</button>
          <button className='hd-btn' onClick={handleMyOrder}>My Orders</button>
        </div>
        
    </div>
  )
}

export default Header
