import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import UserInfo from "./signUpPages/UserInfo";
import Instructions from "./signUpPages/Instructions";
import FixedCosts from "./signUpPages/FixedCosts";
import OperationalCosts from "./signUpPages/OperationalCosts";
import AddDrivers from "./signUpPages/AddDrivers";
import AccountSelection from "./signUpPages/AccountSelection";
import ConfirmDetails from "./signUpPages/ConfirmDetails";
import AddDispatcher from "./signUpPages/AddDispatcher";
import UserContext from "../../helpers/Context"
import './signUpStyles.css'
import AddTractors from "./signUpPages/AddTractors";

export default function SignUp() {

  const { alertMsg, setAlertMsg, showAlert, setShowAlert, setCosts, setLoggedIn, user, setUser, apiUrl } = useContext(UserContext)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [userInfo, setUserInfo] = useState({ name: '', email: '', username: '', password: '', accountType: '' })
  const [drivers, setDrivers] = useState([])
  const [tractors, setTractors] = useState([])
  const [newCosts, setNewCosts] = useState()
  const [submitted, setSubmitted] = useState(false)
  const [dispatcher, setDispatcher] = useState({ email: '', username: '', name: '', company: '', password: '' })

  const navigate = useNavigate();

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

    if (userInfo.email === '' || userInfo.username === '' || userInfo.password === '' || userInfo.passwordConf === '' || userInfo.name === '') {
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

  const createAccount = async () => {

    setShowAlert(false)

    if (userInfo.password !== userInfo.passwordConf) {
      setAlertMsg('Password do not match')
      setShowAlert(true)
      return
    }

    if (showAlert === false) {
      if (userInfo.accountType === 'owner') {
        const response = await fetch(apiUrl + "/api/user/newOwner", {
          method: "POST",
          body: JSON.stringify({
            name: userInfo.name,
            email: userInfo.email,
            password: userInfo.password,
            username: userInfo.username,
            tractorLease: (newCosts.tractorAmount / 30).toFixed(2),
            trailerLease: (newCosts.trailerAmount / 30).toFixed(2),
            dispatch: (newCosts.dispatchAmount / 100).toFixed(2),
            mpg: newCosts.mpgAmount,
            laborRate: (newCosts.laborRate / 100).toFixed(2),
            payrollTax: (newCosts.payrollAmount / 100).toFixed(2),
            factor: (newCosts.factorAmount / 100).toFixed(2),
            odc: (newCosts.odcAmount / 100).toFixed(2),
            overhead: (newCosts.overheadAmount / 100).toFixed(2),
            gAndA: (newCosts.gandaAmount / 30).toFixed(2),
            loan: (newCosts.loanAmount / 30).toFixed(2),
            repairs: (newCosts.repairsAmount / 30).toFixed(2),
            parking: (newCosts.parkingAmount / 30).toFixed(2)
          }),
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json())
        setUser(response[0]);
        setNewCosts(response[1])
        setLoggedIn(true)
        navigate('/dashboard')
      } else {
        const response = await fetch(apiUrl + "/api/user/newAdmin", {
          method: "POST",
          body: JSON.stringify({
            name: userInfo.name,
            email: userInfo.email,
            password: userInfo.password,
            username: userInfo.username,
            tractorLease: (newCosts.tractorAmount / 30).toFixed(2),
            trailerLease: (newCosts.trailerAmount / 30).toFixed(2),
            dispatch: (newCosts.dispatchAmount / 100).toFixed(2),
            mpg: newCosts.mpgAmount,
            laborRate: (newCosts.laborRate / 100).toFixed(2),
            payrollTax: (newCosts.payrollAmount / 100).toFixed(2),
            factor: (newCosts.factorAmount / 100).toFixed(2),
            odc: (newCosts.odcAmount / 100).toFixed(2),
            overhead: (newCosts.overheadAmount / 100).toFixed(2),
            gAndA: (newCosts.gandaAmount / 30).toFixed(2),
            loan: (newCosts.loanAmount / 30).toFixed(2),
            repairs: (newCosts.repairsAmount / 30).toFixed(2),
            parking: (newCosts.parkingAmount / 30).toFixed(2),
            drivers: drivers,
            dispatcher: dispatcher,
            tractors: tractors
          }),
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json())
        setLoggedIn(true)
        localStorage.setItem('token', response)
        navigate('/dashboard')
      }
    } else {
      const response = await fetch(apiUrl + "/api/user/newDispatcher", {
        method: "POST",
        body: JSON.stringify({
          email: userInfo.email,
          password: userInfo.password,
          username: userInfo.username
        }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json())
      setLoggedIn(true)
      localStorage.setItem('token', response)
      navigate('/dashboard')
    }
  }


  return (


    <div className="sign-up-container">
      {submitted ?
        <div style={{justifySelf: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem'}}>
          <h3>Email Sent</h3>
          <p>Check you email to continue the sign up process</p>
        </div>
        :
        <>
          <div className="slideTitle" style={{ justifySelf: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: 'orange' }}>Create an Account</h3>
            <p style={{ fontSize: '1.2rem', }}>Enter your information and a confirmation email will be sent to the provided email</p>
          </div>
          <div className="userInfoSlide">
            <div className="slideItemInfo">
              <p className="slideLabel" style={{ alignSelf: 'center' }}>Account Type</p>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}>
                <div className="radioItem">
                  <p className="radioLabel">Owner/Operator</p>
                  <input id="owner" className="radioInput" type="radio" name="accountType" value='owner' onClick={(e) => {
                    setUserInfo({ ...userInfo, accountType: e.target.value })
                  }}></input>
                </div>
                <div className="radioItem">
                  <p className="radioLabel">Administrator</p>
                  <input id="admin" className="radioInput" type="radio" name="accountType" value='admin' onClick={(e) => {
                    setUserInfo({ ...userInfo, accountType: e.target.value })
                  }}></input>
                </div>
              </div>
            </div>
            <div className="slideItemInfo">
              <p className="slideLabel">Full Name</p>
              <input defaultValue={userInfo.name} className="emailInputSignUp" onChange={(e) => {
                setUserInfo({ ...userInfo, name: e.target.value })
              }} type="email" />
            </div>
            <div className="slideItemInfo">
              <p className="slideLabel">Email</p>
              <input defaultValue={userInfo.email} className="emailInputSignUp" onChange={(e) => {
                setUserInfo({ ...userInfo, email: e.target.value })
              }} type="email" />
            </div>
            <div className="slideItemInfo">
              <p className="slideLabel">Username</p>
              <input defaultValue={userInfo.username} className="emailInputSignUp" onChange={(e) => {
                setUserInfo({ ...userInfo, username: e.target.value })
              }} type="text" />
            </div>
            <div className="slideItemInfo">
              <p className="slideLabel">Password</p>
              <input defaultValue={userInfo.password} className="passwordInputSignUp" id='password-signup' onChange={(e) => {
                setUserInfo({ ...userInfo, password: e.target.value })
              }} type="password" />
            </div>
            <div className="slideItemInfo">
              <p className="slideLabel">Confirm Password</p>
              <input defaultValue={userInfo.passwordConf} className="passwordInputSignUp" id="password-conf-signup" onChange={(e) => {
                setUserInfo({ ...userInfo, passwordConf: e.target.value })
              }} type="password" />
            </div>
            <div className='showPasswordContainer'>
              <p style={{ color: 'rgb(84, 76, 59)' }}>Show Password</p>
              <input className='showPasswordInput' onClick={togglePassword} type='checkbox'></input>
            </div>
          </div>
          <div className="btnContainer">
            <button className="btnSignUp" onClick={() => {
              checkUser()
            }}>Submit</button>
          </div>
          <div className="signUpLinkContainer">
            <p>Already have an account? <Link id="sign-up-link" to='/login' onClick={() => setShowAlert(false)}>Log in here!</Link></p>
          </div>
        </>
      }
    </div>
  )
}