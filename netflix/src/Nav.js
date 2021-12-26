import React from 'react'
import './Nav.css'
import {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



function Nav() {

    const [show, handleShow] = useState(false)
    const navigate = useNavigate();

    const transitionNavBar = () => {
        if(window.scrollY > 100 ){
            handleShow(true)
        }else{
            handleShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar)

        return () => {
            window.removeEventListener('scroll', transitionNavBar)
        }

    }, [])

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <div className='nav__contents'>
            <img onClick={() => navigate('/')} className='nav__logo' src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png' alt='x' />
            <img onClick={() => navigate('/profile') } className='nav__avatar' src='https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png' alt='x' />
            </div>
            
        </div>
    )
}

export default Nav

