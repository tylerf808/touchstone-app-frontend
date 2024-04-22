import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './toolbarStyles.css'

export default function Toolbar({ loggedIn, user, setLoggedIn, setCosts, setShowAlert, userType }) {

  const handleLogOut = () => {
    localStorage.removeItem('token')
    closeNav()
    setShowAlert(false)
    setLoggedIn(false)
    
  };

  const [isAdmin, setIsAdmin] = useState(false)

  function openNav() {
    setShowAlert(false)
    if(window.screen.width <= 1000){
      document.getElementById("mySidenav").style.left = '0%';

    } else {
      document.getElementById("mySidenav").style.left = '0px';
    }
    document.getElementById('toolbar-header').innerHTML = ''
    if (user.accountType === 'admin') {
      setIsAdmin(true)
    } else {
      setIsAdmin(false)
    }
  }

  function closeNav() {
    if(window.screen.width <= 1000){
      document.getElementById("mySidenav").style.left = '-100%';

    } else {
      document.getElementById("mySidenav").style.left = '-250px';
    }
    document.getElementById('toolbar-header').innerHTML = 'TOUCHSTONE LOGISTICS';
  }

  return (
    <div className='toolbar'>
      {loggedIn ? <span id='menu-icon' onClick={openNav}>&#9776;</span> : null}
      <div id="mySidenav" className='sidenav' >
        <span className='closebtn' onClick={closeNav}>&times;</span>
        <div className='sideNavLink' onClick={closeNav}><Link to='/dashboard'>Dashboard</Link></div>
        <div className='sideNavLink' onClick={closeNav}><Link to='/addjob'>New Load</Link></div>
        <div className='sideNavLink' onClick={closeNav}><Link to='/jobs'>Accepted Loads</Link></div>
        <div className='sideNavLink' onClick={closeNav}><Link to='/costs'>Costs</Link></div>
        {isAdmin ?
          <div className='sideNavLink' onClick={closeNav}><Link to='/drivers'>Users</Link></div>
          :
          null
        }
        <div className='sideNavLink' onClick={handleLogOut}><Link to='/'>Log Out</Link></div>
      </div>
      <h1 className='toolbarHeader' id='toolbar-header'>TOUCHSTONE LOGISTICS</h1>
    </div >
  );
}