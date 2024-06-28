import { Link } from "react-router-dom"
import { useEffect } from "react"
import '../signUpStyles.css'

export default function FirstPage({ userInfo, setUserInfo, setShowAlert, setAlertMsg, currentSlide, setCurrentSlide, apiUrl }) {

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

        setShowAlert(false)

        if (userInfo.email === '' || userInfo.username === '' || userInfo.password === '' || userInfo.passwordConf === '' || userInfo.name=== '' ){
            setAlertMsg('Missing an Entry')
            setShowAlert(true)
            return
        }

        if (userInfo.passwordConf !== userInfo.password) {
            setAlertMsg("Passwords do not match")
            setShowAlert(true)
            return
        }

        await fetch(apiUrl + '/api/user/check', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: userInfo.email,
                username: userInfo.username
            })
        }).then((response) => {
            if (response.status === 404) {
                setCurrentSlide(currentSlide + 1)
                setShowAlert(false)
                return
            } else {
                setAlertMsg('User with that email and/or username already exists')
                setShowAlert(true)
                return
            }
        }).catch((err) => console.log(err))
    }

    return (
        <div className="pageContainer">
            <div className="slideTitle">
                <h3 style={{color: 'orange'}}>Create an Account</h3>
            </div>
            <div className="userInfoSlide">
            <div className="slideItemInfo">
                    <p className="slideLabel">Full Name</p>
                    <input defaultValue={userInfo.name} className="emailInputSignUp" onChange={(e) => {
                        setUserInfo({...userInfo, name: e.target.value})
                    }} type="email" />
                </div>
                <div className="slideItemInfo">
                    <p className="slideLabel">Email</p>
                    <input defaultValue={userInfo.email} className="emailInputSignUp" onChange={(e) => {
                        setUserInfo({...userInfo,email: e.target.value})
                    }} type="email" />
                </div>
                <div className="slideItemInfo">
                    <p className="slideLabel">Username</p>
                    <input defaultValue={userInfo.username} className="emailInputSignUp" onChange={(e) => {
                        setUserInfo({...userInfo, username: e.target.value})
                    }} type="text" />
                </div>
                <div className="slideItemInfo">
                    <p  className="slideLabel">Password</p>
                    <input defaultValue={userInfo.password} className="passwordInputSignUp" id='password-signup' onChange={(e) => {
                        setUserInfo({...userInfo, password: e.target.value})
                    }} type="password" />
                </div>
                <div className="slideItemInfo">
                    <p  className="slideLabel">Confirm Password</p>
                    <input defaultValue={userInfo.passwordConf} className="passwordInputSignUp" id="password-conf-signup" onChange={(e) => {
                        setUserInfo({...userInfo, passwordConf: e.target.value})
                    }} type="password" />
                </div>
                <div className='showPasswordContainer'>
                    <p style={{ color: 'rgb(84, 76, 59)' }}>Show Password</p>
                    <input className='showPasswordInput' onClick={togglePassword} type='checkbox'></input>
                </div>
            </div>
            <div className='progressContainer'>
                <span className='currentDot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
            </div>
            <div className="btnContainer">
                <button className="btnSignUp" onClick={() => {
                    checkUser()
                }}>Next</button>
            </div>
            <div className="signUpLinkContainer">
                <p>Already have an account? <Link id="sign-up-link" to='/' onClick={() => setShowAlert(false)}>Log in here!</Link></p>
            </div>
        </div>
    )
}