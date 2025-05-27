import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
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
    <div className="tabbed-container">
      {submitted ?
        <div style={{ justifySelf: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem' }}>
          <h3>Email Sent</h3>
          <p>Check you email to continue the sign up process</p>
        </div>
        :
        <>
          <div style={{ justifySelf: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem'}}>
            <h3 style={{ color: 'orange', fontSize: '1.5rem' }}>Create an Account</h3>
            <p className="input-label" style={{ fontSize: '1.1rem', }}>Enter your information and a confirmation email will be sent to the provided email</p>
          </div>

          <div className="tab-content" >
            <div className="input-group" style={{gridTemplateColumns: "40% 60%"}}>
              <p className="input-label" style={{ alignSelf: 'center' }}>Account Type</p>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: '2rem'}}>
                  <p className="radioLabel" style={{marginRight: '.5rem'}}>Owner/Operator</p>
                  <input id="owner" className="radioInput" type="radio" name="accountType" value='owner' onClick={(e) => {
                    setUserInfo({ ...userInfo, accountType: e.target.value })
                  }}></input>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <p className="radioLabel" style={{marginRight: '.5rem'}}>Administrator</p>
                  <input id="admin" className="radioInput" type="radio" name="accountType" value='admin' onClick={(e) => {
                    setUserInfo({ ...userInfo, accountType: e.target.value })
                  }}></input>
                </div>
              </div>
            </div>
            <div className="input-group">
              <p className="input-label">Full Name</p>
              <input defaultValue={userInfo.name} className="emailInputSignUp" onChange={(e) => {
                setUserInfo({ ...userInfo, name: e.target.value })
              }} type="email" />
            </div>
            <div className="input-group">
              <p className="input-label">Email</p>
              <input defaultValue={userInfo.email} className="emailInputSignUp" onChange={(e) => {
                setUserInfo({ ...userInfo, email: e.target.value })
              }} type="email" />
            </div>
            <div className="input-group">
              <p className="input-label">Username</p>
              <input defaultValue={userInfo.username} className="emailInputSignUp" onChange={(e) => {
                setUserInfo({ ...userInfo, username: e.target.value })
              }} type="text" />
            </div>
          </div>
          <div className="btnContainer">
            <button className="btnSignUp" style={{backgroundColor: 'orange'}} onClick={() => {
              checkUser()
            }}>Submit</button>
          </div>
        </>
      }
    </div>
  )
}