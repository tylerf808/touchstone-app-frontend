import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './toolbarStyles.css'
import { useNavigate } from 'react-router-dom';

export default function Toolbar({ loggedIn, user, setUser, setLoggedIn, location, setShowAlert, setAlertMsg, setShowMenu, showMenu }) {

  const navigate = useNavigate();

  const isSignUpPage = location?.pathname === '/signup' || location?.pathname === '/confirmPendingUser/' ||
    location?.pathname === '/login'

  const handleLogOut = () => {
    setShowMenu(false)
    localStorage.removeItem('token')
    setShowAlert(false)
    setLoggedIn(false)
    setUser({})
    navigate('/')
  };

  const [isAdmin, setIsAdmin] = useState(false)


  useEffect(() => {
    if (user) {
      if (user.accountType === 'admin') {
        setIsAdmin(true)
      }
    }
  }, [loggedIn])

  const handleMenu = () => {
    const menuComponent = document.getElementsByClassName('user-menu')
    if (showMenu) {
      menuComponent[0].classList.toggle('menu-open')
      setShowMenu(false)
    } else {
      menuComponent[0].classList.toggle('menu-open')
      setShowMenu(true)
    }
  }

  const handleLogIn = () => {
    navigate('/login')
  }

  const handleSignUp = () => {
    navigate('/signup')
  }

  return (
    <div className='toolbar'>
      <div className='toolbar-header-container'>
        <h1 className='toolbar-header' id='toolbar-header'>TOUCHSTONE LOGISTICS</h1>
      </div>
      {loggedIn ?
        <>
          <i className='fa fa-bars' style={{ color: 'whitesmoke' }} onClick={handleMenu}></i>
          <div id='user-menu' className='user-menu'>
            <Link className='user-menu-item' to='/dashboard' onClick={handleMenu}>Dashboard</Link>
            <Link className='user-menu-item' to='/addjob' onClick={handleMenu}>New Load</Link>
            <Link className='user-menu-item' to='/jobs' onClick={handleMenu}>Accepted Loads</Link>
            <Link className='user-menu-item' to='/costs' onClick={handleMenu}>Costs</Link>
            {isAdmin ?
              <>
                <Link to='/users' className='user-menu-item' onClick={handleMenu}>Users</Link>
                <Link to='/tractors' className='user-menu-item' onClick={handleMenu}>Tractors</Link>
              </>
              :
              null
            }
            <Link to='/account' className='user-menu-item' onClick={handleMenu}>Account</Link>
            <a className='user-menu-item' onClick={handleLogOut}>Log Out</a>
          </div>
        </>
        :
        <>
          {!loggedIn && !isSignUpPage &&
            <div className='landing-menu'>
              <div className='login-btn-container'>
                <button className='landing-btn' onClick={handleLogIn}>Log In</button>
              </div>
              <button className='landing-btn' onClick={handleSignUp}>Sign Up</button>
            </div>
          }
        </>
      }
    </div >
  );
}