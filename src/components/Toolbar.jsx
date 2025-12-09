import * as React from 'react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    // toggle menu state (CSS class handled by render)
    setShowMenu(!showMenu)
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
      {loggedIn ? (
        <>
          <i className={showMenu ? 'fa fa-window-close' : 'fa fa-bars menu '} style={{ color: 'whitesmoke', fontSize: '2.25rem', right: '4rem', position: 'absolute' }} onClick={handleMenu}></i>
          {/** Render the menu into document.body so it escapes stacking contexts */}
          {createPortal(
            <div id='user-menu' className={'user-menu' + (showMenu ? ' menu-open' : '')}>
              <Link className='user-menu-item' to='/dashboard' onClick={() => setShowMenu(false)}>Dashboard</Link>
              <Link className='user-menu-item' to='/addjob' onClick={() => setShowMenu(false)}>New Load</Link>
              <Link className='user-menu-item' to='/jobs' onClick={() => setShowMenu(false)}>Accepted Loads</Link>
              <Link className='user-menu-item' to='/costs' onClick={() => setShowMenu(false)}>Costs</Link>
              {isAdmin ? (
                <>
                  <Link to='/users' className='user-menu-item' onClick={() => setShowMenu(false)}>Users</Link>
                  <Link to='/tractors' className='user-menu-item' onClick={() => setShowMenu(false)}>Tractors</Link>
                </>
              ) : null}
              <Link to='/account' className='user-menu-item' onClick={() => setShowMenu(false)}>Account</Link>
              <a className='user-menu-item' onClick={handleLogOut}>Log Out</a>
            </div>,
            document.body
          )}
        </>
      ) : (
        <>
          {!loggedIn && !isSignUpPage && (
            <div className='landing-menu'>
              <div className='login-btn-container'>
                <button className='landing-btn' onClick={handleLogIn}>Log In</button>
              </div>
              <button className='landing-btn' onClick={handleSignUp}>Sign Up</button>
            </div>
          )}
        </>
      )}
      <div className={showMenu ? 'menu-overlay' : ''}></div>
    </div >
  );
}