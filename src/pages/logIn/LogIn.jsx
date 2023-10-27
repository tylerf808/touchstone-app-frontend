import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './loginStyles.css'

const { apiUrl } = require('../../urls.json')

export default function LogIn({ setUser, setCosts, setLoggedIn, setShowAlert, setAlertMsg }) {

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const togglePassword = () => {
        let password = document.getElementById('password-login')
        if (password.type === 'password') {
            password.type = 'text'
        } else {
            password.type = 'password'
        }
    }

    const logIn = async () => {
        const emailOrUsername = document.getElementById("email-login").value;
        const password = document.getElementById("password-login").value;

        if (emailOrUsername === '' || password === '') {
            setAlertMsg('missing and entry')
            setShowAlert(true)
            return
        }

        if (emailOrUsername.includes('@')) {
            const response = await fetch(apiUrl + "/api/user/emailLogin", {
                method: "POST",
                body: JSON.stringify({ email: emailOrUsername, password: password }),
                headers: { "Content-Type": "application/json" },
            }).then((res) => res.json())
            if (response.msg) {
                setShowAlert(true)
                setAlertMsg(response.msg)
                return
            } else {
                setShowAlert(false)
                setUser(response.username);
                setLoggedIn(true);

                await fetch(apiUrl + "/api/costs", {
                    method: "POST",
                    body: JSON.stringify({
                        username: response.username
                    })
                })
                    .then((res) => res.json())
                    .then((data) => setCosts(data[0]));
                navigate('dashboard')
            }

        } else {
            const response = await fetch(apiUrl + "/api/user/usernameLogin", {
                method: "POST",
                body: JSON.stringify({ username: emailOrUsername, password: password }),
                headers: { "Content-Type": "application/json" },
            }).then((res) => res.json())
            if (response.msg) {
                setShowAlert(true)
                setAlertMsg(response.msg)
                return
            } else {
                setShowAlert(false)
                setUser(response.username);
                setLoggedIn(true);

                await fetch(apiUrl + "/api/costs", {
                    method: "POST",
                    body: JSON.stringify({
                        username: response.username
                    })
                })
                    .then((res) => res.json())
                    .then((data) => setCosts(data[0]));
                navigate('dashboard')
            }
        }
    };

    return (
        <div className='pageContainer'>
            <div className='logInContainer'>
                <div className='logInHeader'>
                    <h2>Log In</h2>
                    <p>Enter your credentials below</p>
                </div>
                <input placeholder='Enter your email or username' className='emailAndPasswordInput' type='emailOrUsername' id="email-login"></input>
                <input placeholder='Enter you password' className='emailAndPasswordInput' type='password' id="password-login"></input>
                <div className='showPasswordContainer'>
                    <p style={{color: 'black', fontSize: '1em'}}>Show Password</p>
                    <input className='showPasswordInput' onClick={togglePassword} type='checkbox'></input>
                </div>
                <div className='btnContainer'>
                    <button className='logInBtn' onClick={logIn}>Log In</button>
                </div>
            </div>
            <div className='signUpLinkContainer'>
                <p >Don't have an account? <Link id='sign-up-link' to="/signup">Sign up here!</Link></p>
            </div>
        </div>
    )
}