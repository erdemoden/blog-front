import React from 'react';
import '../Styles/Menu.css'

const Menu = (props)=>{

    
    return ( 
        <nav className='navbar navbar-dark bg-dark fixed-top shadow flex'>
            <h1 className='white'>Welcome</h1>
            <button type="button" className='btn btn-success' id='buttons'>Your Writings</button>
            <button type="button" className='btn btn-success' id='buttons'>All Writings</button>
            <button type="button" className='btn btn-success' id='buttons'>Public Chat</button>
            <button type="button" className='btn btn-success' id='buttons'>Log-Out</button>         
            </nav>
    );
}

export default Menu;