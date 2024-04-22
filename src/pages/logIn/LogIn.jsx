import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserContext from '../../helpers/Context';
import './loginStyles.css'
import { useContext } from 'react';

const { apiUrl } = require('../../urls.json')

export default function LogIn() {

    const [credentials, setCredentials] = useState({emailOrUsername: '', password: ''})

    const navigate = useNavigate();

    const { setLoggedIn, setShowAlert, setAlertMsg, loggedIn, setAccountType } = useContext(UserContext)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            navigate('/dashboard')
        }
    }, [])

    const togglePassword = () => {
        let password = document.getElementById('password-login')
        if (password.type === 'password') {
            password.type = 'text'
        } else {
            password.type = 'password'
        }
    }

    const logIn = async () => {

        if (credentials.emailOrUsername === '' || credentials.password === '') {
            setAlertMsg('missing and entry')
            setShowAlert(true)
            return
        }

        const response = await fetch(apiUrl + "/api/user/login", {
            method: "POST",
            body: JSON.stringify({ emailOrUsername: credentials.emailOrUsername, password: credentials.password }),
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json())
        if (response.msg) {
            setShowAlert(true)
            setAlertMsg(response.msg)
            return
        } else {
            localStorage.setItem('token', response)
            setLoggedIn(true)
            setShowAlert(false)
        }
        
        navigate('/dashboard')
    }

    return (
        <div className='pageContainer'>
            <div className='logInContainer'>
                <div className='logInHeader'>
                    <h2>Log In</h2>
                </div>
                <input placeholder='Enter your email or username' className='emailAndPasswordInput' type='emailOrUsername' id="email-login" onChange={(e) => setCredentials({...credentials, emailOrUsername: e.target.value})}></input>
                <input placeholder='Enter you password' className='emailAndPasswordInput' type='password' id="password-login" onChange={(e) => setCredentials({...credentials, password: e.target.value})}></input>
                <div className='logInShowPassword'>
                    <p style={{color: 'black', fontSize: '1em'}}>Show Password</p>
                    <input className='showPasswordInput' onClick={togglePassword} type='checkbox'></input>
                </div>
                <div className='btnContainer'>
                    <button className='logInBtn' onClick={logIn}>Log In</button>
                </div>
            </div>
            <div className='signUpLinkContainer'>
                <p >Don't have an account? <Link id='sign-up-link' to="/signup" onClick={() => setShowAlert(false)}>Sign up here!</Link></p>
            </div>
        </div>
    )
}