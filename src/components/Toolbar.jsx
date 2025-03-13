import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './toolbarStyles.css'
import { useNavigate } from 'react-router-dom';

export default function Toolbar({ loggedIn, user, setUser, setLoggedIn, setCosts, setShowAlert, setShowMenu, showMenu }) {

  const navigate = useNavigate();

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
    if (showMenu) {
      setShowMenu(false)
    } else {
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
      <h1 className='toolbarHeader' id='toolbar-header'>TOUCHSTONE LOGISTICS</h1>
      {loggedIn ?
        <div className='menu' >
          <div className='toolbarItem'><Link className='link' to='/dashboard' onClick={() => setShowMenu(false)}>Dashboard</Link></div>
          <div className='toolbarItem'><Link className='link' to='/addjob' onClick={() => setShowMenu(false)}>New Load</Link></div>
          <div className='toolbarItem'><Link className='link' to='/jobs' onClick={() => setShowMenu(false)}>Accepted Loads</Link></div>
          <i className='user-icon fa fa-user' onClick={handleMenu}></i>
          {showMenu ?
            <div className='user-menu'>
              <div className='user-menu-item'><Link className='user-menu-link' to='/costs' onClick={() => setShowMenu(false)}>Costs</Link></div>
              {isAdmin ?
                <>
                  <div className='user-menu-item'><Link to='/users' className='user-menu-link' onClick={() => setShowMenu(false)}>Users</Link></div>
                  <div className='user-menu-item'><Link to='/tractors' className='user-menu-link' onClick={() => setShowMenu(false)}>Tractors</Link></div>
                </>
                :
                null
              }
              <div className='user-menu-item'><Link to='/account' className='user-menu-link' onClick={() => setShowMenu(false)}>Account</Link></div>
              <div className='user-menu-item'><a className='user-menu-link' onClick={handleLogOut}>Log Out</a></div>
            </div>
            :
            null
          }
        </div>
        :
        <div className='landing-menu'>
          <div className='login-btn-container'>
            <button className='landing-btn' onClick={handleLogIn}>Log In</button>
          </div>
          <button className='landing-btn' onClick={handleSignUp}>Sign Up</button>
        </div>
      }
    </div >
  );
}