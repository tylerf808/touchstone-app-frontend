import { useState } from "react"
import { Link } from "react-router-dom"

const {apiUrl} = require('../../urls.json')

export default function FirstPage(props) {

    const togglePassword = () => {
        let password = document.getElementById('password-signup')
        let passwordConf = document.getElementById('password-conf-signup')
        if (password.type === 'password') {
            password.type = 'text'
            passwordConf.type = 'text'
        } else {
            password.type = 'password'
            passwordConf.type = 'password'
        }
    }

    const checkUser = async () => {

        props.setShowAlert(false)

        if (props.email === '' || props.password === '' || props.passwordConf === '') {
            props.setAlertMsg('Missing an Entry')
            props.setShowAlert(true)
            return
        }

        if (props.passwordConf !== props.password) {
            props.setAlertMsg("Passwords do not match")
            props.setShowAlert(true)
            return
        }

        const response = await fetch(apiUrl + '/api/user/check', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: props.email,
                username: props.username
            })
        }).then((res) => res.json()).catch((err) => console.log(err))

        if (response.status === 404) {
            props.setAlertMsg('User with that email or username already exists')
            props.setShowAlert(true)
            return
        } else {
            props.setCurrentSlide(props.currentSlide + 1)
            props.setShowAlert(false)
            return
        }
    }

    return (
        <div className="pageContainer">
            <div className="slider">
                <div className="slide">
                    <div className="slideTitle">
                        <h3>Create an Account</h3>
                    </div>
                    <div className="slideInputs">
                        <div className="slideItem">
                            <div className="slideLabelContainerCreateAcct">
                                <p className="slideLabel">Email</p>
                            </div>
                            <input className="emailInputSignUp" onChange={(e) => props.setEmail(e.target.value)} type="email" />
                        </div>
                        <div className="slideItem">
                            <div className="slideLabelContainerCreateAcct">
                                <p className="slideLabel">Username</p>
                            </div>
                            <input className="emailInputSignUp" onChange={(e) => props.setUsername(e.target.value)} type="text" />
                        </div>
                        <div className="slideItem">
                            <div className="slideLabelContainerCreateAcct">
                                <p className="slideLabel">Password</p>
                            </div>
                            <input className="passwordInputSignUp" id='password-signup' onChange={(e) => props.setPassword(e.target.value)} type="password" />
                        </div>
                        <div className="slideItem">
                            <div className="slideLabelContainerCreateAcct">
                                <p className="slideLabel">Confirm Password</p>
                            </div>
                            <input className="passwordInputSignUp" id="password-conf-signup" onChange={(e) => props.setPasswordConf(e.target.value)} type="password" />
                        </div>
                        <div className="slideItem" style={{position: 'relative', left: 200}}>
                            <div className='showPasswordContainerSignup'>
                                <p>Show Password</p>
                                <input className='showPasswordInput' onClick={togglePassword} type='checkbox'></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="btnContainer">
                <button className="btnSignUp" onClick={() => {
                    checkUser()
                }}>Next</button>
            </div>
            <div className="signUpLinkContainer">
                <p>Already have an account? <Link id="sign-up-link" to='/'>Log in here!</Link></p>
            </div>
        </div>
    )
}