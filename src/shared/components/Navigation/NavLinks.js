import React, { useContext, } from 'react'
import { NavLink } from 'react-router-dom';
import { Authcontext } from '../../context/auth-context';

import './NavLinks.css'



const NavLinks = (props) => {
    const auth = useContext(Authcontext)
    return <ul className='nav-links'>
        <li>
            <NavLink to ={"/"}>ALL USERS</NavLink>
        </li>

        {auth.isLoggedIn && (
        <li>
            <NavLink to ={"/u1/places"}>MY PLACES</NavLink>
        </li>
        )}
        {auth.isLoggedIn && (
        <li>
            <NavLink to ={"/places/new"}>ADD PLACES</NavLink>
        </li>
        )}

        {!auth.isLoggedIn && (
        <li>
            <NavLink to ={"/auth"}>AUTHENTICATE</NavLink>
        </li>
        )}
        {auth.isLoggedIn && (
            <button onClick={auth.logout}>LOGOUT</button>
        )}
    </ul>

}
export default NavLinks;
