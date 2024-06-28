import { useState, useContext, useEffect } from "react";
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

  const { alertMsg, setAlertMsg, showAlert, setShowAlert, costs, setCosts, setLoggedIn, user, setUser } = useContext(UserContext)

  let apiUrl

    if (process.env.REACT_APP_ENVIRONMENT === 'development') {
        apiUrl = process.env.REACT_APP_DEVELOPMENT_API
    } else {
        apiUrl = process.env.REACT_APP_TEST_API
    }


  const [currentSlide, setCurrentSlide] = useState(0)
  const [userInfo, setUserInfo] = useState({ name: '', email: '', username: '', password: '', accountType: '' })
  const [drivers, setDrivers] = useState([])
  const [tractors, setTractors] = useState([])
  const [newCosts, setNewCosts] = useState()
  const [dispatcher, setDispatcher] = useState({ email: '', username: '', name: '', company: '', password: ''})

  const navigate = useNavigate();

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
            dispatcher: dispatcher
          }),
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json()).then((data) => { return data })
        setUser(response[0]);
        setCosts(response[1])
        setLoggedIn(true)
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
      setUser(response[0]);
      setCosts(response[1])
      setLoggedIn(true)
      navigate('/dashboard')
    }
  }

  switch (currentSlide) {
    case 0:
      return (
        <UserInfo currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} 
          userInfo={userInfo} setUserInfo={setUserInfo} setAlertMsg={setAlertMsg} setShowAlert={setShowAlert} apiUrl={apiUrl} />
      )
    case 1:
      return (
        <Instructions currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
      )
    case 2:
      return (
        <AccountSelection currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}
          setShowAlert={setShowAlert} setAlertMsg={setAlertMsg} userInfo={userInfo} setUserInfo={setUserInfo} />
      )
    case 3:
      return (
        <FixedCosts currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} newCosts={newCosts} setNewCosts={setNewCosts}
          setAlertMsg={setAlertMsg} setShowAlert={setShowAlert} userInfo={userInfo} setUserInfo={setUserInfo} />
      )
    case 4:
      return (
        <OperationalCosts currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}
          setAlertMsg={setAlertMsg} setShowAlert={setShowAlert} newCosts={newCosts} setNewCosts={setNewCosts}
          userInfo={userInfo} createAccount={createAccount} />
      )
    case 5:
      return (
        <AddDrivers currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}
          setAlertMsg={setAlertMsg} setShowAlert={setShowAlert}
          drivers={drivers} setDrivers={setDrivers} />
      )
    case 6:
      return (
        <AddTractors currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}
          setAlertMsg={setAlertMsg} setShowAlert={setShowAlert}
          tractors={tractors} setTractors={setTractors} />
      )
    case 7:
      return (
        <AddDispatcher currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} setAlertMsg={setAlertMsg} setShowAlert={setShowAlert}
          dispatcher={dispatcher} setDispatcher={setDispatcher} userInfo={userInfo} />
      )
    case 8:
      return (
        <ConfirmDetails currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} tractors={tractors}
          userInfo={userInfo} newCosts={newCosts} drivers={drivers} createAccount={createAccount} dispatcher={dispatcher} />
      )
  }
}