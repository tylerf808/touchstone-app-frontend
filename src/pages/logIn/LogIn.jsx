import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserContext from '../../helpers/Context';
import './loginStyles.css'
import { useContext } from 'react';

export default function LogIn() {

    const [credentials, setCredentials] = useState({ emailOrUsername: '', password: '' })

    const navigate = useNavigate();

    const { setLoggedIn, setShowAlert, setAlertMsg, loggedIn, setAccountType, apiUrl, setUser } = useContext(UserContext)

    useEffect(() => {
        if (loggedIn) {
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
            localStorage.setItem('token', response.token)
            setLoggedIn(true)
            setShowAlert(false)
            setUser(response.user)
        }

        navigate('/dashboard')
    }

    return (
        <div className='modal-form' style={{justifySelf: 'center', position: 'relative', top: '12rem', padding: '2rem'}}>
            <div className='login-header'>
                <h2>Log In</h2>
                <p >Don't have an account? <Link id='sign-up-link' to="/signup" onClick={() => setShowAlert(false)}>Sign up here!</Link></p>
            </div>
            <input placeholder='Enter your email or username' className='login-input' type='emailOrUsername' id="email-login" onChange={(e) => setCredentials({ ...credentials, emailOrUsername: e.target.value })}></input>
            <input placeholder='Enter you password' className='login-input' type='password' id="password-login" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}></input>
            <div className='login-show-password'>
                <p style={{ color: 'black', fontSize: '1em', marginRight: '.5rem' }}>Show Password</p>
                <input style={{accentColor: 'orange'}} onClick={togglePassword} type='checkbox'></input>
            </div>
            <div style={{marginTop: '2rem', justifySelf: 'center'}}>
                <button className='modal-save-btn' onClick={logIn}>Log In</button>
            </div>
        </div>

    )
}