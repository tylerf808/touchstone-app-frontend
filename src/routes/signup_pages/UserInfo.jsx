import { useState } from "react"
import { Link } from "react-router-dom"

export default function FirstPage(props) {
    
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

        const response = await fetch('http://localhost:3001/api/user/check?email=' + props.email + '&username=' + props.username + '&accountType=' + props.accountType, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then((res) => res.json()).catch((err) => console.log(err))

        if (response === null) {
            props.setCurrentSlide(props.currentSlide + 1)
            props.setShowAlert(false)
            return
        } else {
            props.setAlertMsg('User with that email or username already exists')
            props.setShowAlert(true)
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
                            <input className="passwordInputSignUp" onChange={(e) => props.setPassword(e.target.value)} type="password" />
                        </div>
                        <div className="slideItem">
                            <div className="slideLabelContainerCreateAcct">
                                <p className="slideLabel">Confirm Password</p>
                            </div>
                            <input className="passwordInputSignUp" onChange={(e) => props.setPasswordConf(e.target.value)} type="password" />
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