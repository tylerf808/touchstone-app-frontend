import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './toolbarStyles.css'
import { useNavigate } from 'react-router-dom';

export default function Toolbar({ loggedIn, user, setUser, setLoggedIn, setCosts, setShowAlert }) {

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('token')
    setShowAlert(false)
    setLoggedIn(false)
    setUser({})
    navigate('/')
  };

  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    console.log(user)
    if (user.accountType == 'admin') {
      setIsAdmin(true)
    }
  }, [])


  return (
    <div className='toolbar'>
      <h1 className='toolbarHeader' id='toolbar-header'>TOUCHSTONE LOGISTICS</h1>
      <div className='menu' >
        <div className='toolbarItem'><Link className='link' to='/dashboard'>Dashboard</Link></div>
        <div className='toolbarItem'><Link className='link' to='/addjob'>New Load</Link></div>
        <div className='toolbarItem'><Link className='link' to='/jobs'>Accepted Loads</Link></div>
        <div className='toolbarItem'><Link className='link' to='/costs'>Costs</Link></div>
        {isAdmin ?
          <div className='toolbarItem'><Link to='/drivers' className='link'>Tractors & Users</Link></div>
          :
          null
        }
        <div className='toolbarItem'><span className='link' onClick={handleLogOut}>Log Out</span></div>
      </div>
    </div >
  );
}