import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

export default function Toolbar({ loggedIn, user, setLoggedIn, setUser, setCosts, costs}) {

  const handleLogOut = () => {
    setLoggedIn(false)
    setCosts()
    setUser()
    closeNav()
  };

  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // if (user.accountType === 'admin') {
    //   setIsAdmin(true)
    // }
  }, [])

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById('toolbar-header').innerHTML = ''
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById('toolbar-header').innerHTML = 'TOUCHSTONE LOGISTICS';
  }

  return (
    <div className='toolbar'>
      {loggedIn ? <span id='menu-icon' onClick={openNav}>&#9776;</span> : null}
      <div id="mySidenav" className='sidenav' >
        <span className='closebtn' onClick={closeNav}>&times;</span>
        <div className='sideNavLink' onClick={closeNav}><Link to='/addjob'>New Load</Link></div>
        <div className='sideNavLink' onClick={closeNav}><Link to='/jobs'>Accepted Loads</Link></div>
        <div className='sideNavLink' onClick={closeNav}><Link to='/costs'>Costs</Link></div>
        {isAdmin ? null :
          <div className='sideNavLink' onClick={closeNav}><Link to='/drivers'>Users</Link></div>}
        <div className='sideNavLink' onClick={handleLogOut}><Link to='/'>Log Out</Link></div>
      </div>
      <h1 className='toolbarHeader' id='toolbar-header'>TOUCHSTONE LOGISTICS</h1>
    </div >
  );
}