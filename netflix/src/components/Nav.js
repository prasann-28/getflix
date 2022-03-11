import React from 'react'
import './Nav.css'
import {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../images/netflix-logo.png';
import avatar from '../images/netflix-avatar.png'


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
            <img onClick={() => navigate('/')} className='nav__logo' src={logo} alt='x' />
            <img onClick={() => navigate('/profile') } className='nav__avatar' src={avatar} alt='x' />
            </div>
            
        </div>
    )
}

export default Nav

