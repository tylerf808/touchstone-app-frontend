import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const { apiUrl } = require('../urls.json')

export default function LogIn({ user, userType, setUserType, setUser, costs, setCosts, setLoggedIn, setShowAlert, setAlertMsg }) {

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
                console.log(response.msg)
                return
            } else {
                setShowAlert(false)
                setUser(response);
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
                console.log('Wrong Password')
                return
            } else {
                setShowAlert(false)
                setUser(response);
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
            <div className='headerContainer'>
                <h1>Log In</h1>
            </div>
            <div className='logInContainer'>
                <div className="logInFormItem">
                    <div className='logInLabelContainer'>
                        <p>Email or Username</p>
                    </div>
                    <input className='textInput' type='emailOrUsername' id="email-login"></input>
                </div>
                <div className="logInFormItem">
                    <div className='logInLabelContainer'>
                        <p>Password</p>
                    </div>
                    <input className='textInput' type='password' id="password-login"></input>
                </div>
                <div className='showPasswordContainer'>
                    <p>Show Password</p>
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