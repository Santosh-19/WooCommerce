import React from 'react'
import logo from '../assets/logo.jpg'
import { useContext } from 'react'
import { ModelContext } from '../contexts/modalContext'

function Header() {
  const {setOpen, cart} = useContext(ModelContext);
  return (
    <div id='main-header'>
        <div id='title'>
        <img src={logo} alt='logo' />
        <h1 id='title'>Food</h1>
        </div>    
        <button onClick={()=> setOpen(true)}>Cart ({cart.length})</button>   
    </div>
  )
}

export default Header
