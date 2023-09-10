import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import MainHeader from './MainHeader'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'
import Backdrop from '../UIElements/Backdrop'

import './MainNavigation.css'

const MainNavigation = (props) => {    
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)

    const OpenDrawerHandler = () =>{
        setDrawerIsOpen(true)
    }

    const closeDrawerHandler = () =>{
        setDrawerIsOpen(false)
    }
    return (
    <React.Fragment>
    {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}  {/* this is used to close the humburg 3 lines in mobile wive */}
    <SideDrawer show ={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className='main-navigation__drawer-nav'>
            <NavLinks />
        </nav>
    </SideDrawer>
    <MainHeader >
           {/* from this component ivering thing will be forwored to MainHeader commponenets */}
         
        <button className='main-navigation__menu-btn' onClick={OpenDrawerHandler}> {/* and this is used to open the 3 lines on mobile wive*/}
            <span></span>
            <span></span>
            <span></span>
        </button>
        <h1 className='main-navigation__title'>
            <Link to = "/">Your place </Link>
        </h1>
        <nav className='main-navigation__header-nav'>

         <NavLinks />  {/* here we are rendering the nave bard likes like all user , my place , auth and all */}

        </nav>

    </MainHeader>

    </React.Fragment>
    )
}

export default MainNavigation;