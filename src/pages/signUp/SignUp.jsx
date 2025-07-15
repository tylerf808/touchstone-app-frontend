import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import signupImage from '../../images/signup-image.png'
import UserContext from "../../helpers/Context"
import './signUpStyles.css'

export default function SignUp() {

  const { alertMsg, setAlertMsg, showAlert, setShowAlert, apiUrl } = useContext(UserContext)
  const [userInfo, setUserInfo] = useState({ name: '', email: '', username: '', accountType: '' })
  const [submitted, setSubmitted] = useState(false)

  const checkUser = async () => {

    setShowAlert(false)

    if (userInfo.email === '' || userInfo.username === '' || userInfo.name === '' || userInfo.accountType === '') {
      setAlertMsg('Missing an Entry')
      setShowAlert(true)
      return
    }

    await fetch(apiUrl + '/api/user/check', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userInfo.email,
        username: userInfo.username,
        accountType: userInfo.accountType,
        name: userInfo.name
      })
    }).then((response) => {
      if (response.status === 404) {
        setShowAlert(false)
        setSubmitted(true)
        return
      } else {
        setAlertMsg('User with that email and/or username already exists')
        setShowAlert(true)
        return
      }
    }).catch((err) => console.log(err))
  }

  return (
    <>
      {submitted ?
        <div className="signup-container" style={{width: '20rem', height: '12rem', display: 'flex',
        flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'center'}}>
          <h3 style={{alignSelf: 'center', marginTop: '2rem'}}>Email Sent</h3>
          <p style={{marginTop: '3rem', textAlign: 'center'}}>Check you email to continue the sign up process</p>
        </div>
        :
        <div className="signup-container">
          <div className="signup-image-container">
            <img style={{scale: '50%', position: 'relative', top: '5rem'}} src={signupImage}></img>
          </div>
          <div className="signup-form">
            <div className="signup-header-container">
              <h2 style={{ color: 'orange', fontSize: '2rem' }}>Create an Account</h2>
              <p>Already have an account? <Link to='/login'>Log In here!</Link></p>
            </div>
            <div className="signup-input-row">
              <p style={{ alignSelf: 'center' }}>Account Type</p>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                <div style={{display: 'flex', flexDirection: 'row', marginBottom: '.5rem'}}>
                  <p style={{ marginRight: '.5rem' }}>Owner/Operator</p>
                  <input id="owner" className="radio-input" type="radio" name="accountType" value='owner' onClick={(e) => {
                    setUserInfo({ ...userInfo, accountType: e.target.value })
                  }}></input>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <p style={{ marginRight: '.5rem' }}>Administrator</p>
                  <input id="admin" className="radio-input" type="radio" name="accountType" value='admin' onClick={(e) => {
                    setUserInfo({ ...userInfo, accountType: e.target.value })
                  }}></input>
                </div>
              </div>
            </div>
            <div className="signup-input-row">
              <p>Full Name</p>
              <input defaultValue={userInfo.name} className="signup-input" onChange={(e) => {
                setUserInfo({ ...userInfo, name: e.target.value })
              }} type="text" />
            </div>
            <div className="signup-input-row">
              <p>Email</p>
              <input defaultValue={userInfo.email} className="signup-input" onChange={(e) => {
                setUserInfo({ ...userInfo, email: e.target.value })
              }} type="email" />
            </div>
            <div className="signup-input-row">
              <p>Username</p>
              <input defaultValue={userInfo.username} className="signup-input" onChange={(e) => {
                setUserInfo({ ...userInfo, username: e.target.value })
              }} type="text" />
            </div>
            <div style={{marginTop: '2rem'}}>
              <button className="modal-save-btn" style={{ backgroundColor: 'orange' }} onClick={() => {
                checkUser()
              }}>Submit</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}