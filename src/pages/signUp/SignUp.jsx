import { useState, useContext } from "react";
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

const { apiUrl } = require('../../urls.json')

export default function SignUp() {

  const {alertMsg, setAlertMsg, showAlert, setShowAlert, costs, setCosts, setLoggedIn, user, setUser} = useContext(UserContext)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [userInfo, setUserInfo] = useState({name: '', email: '', username: '', password: '', accountType: ''})
  const [drivers, setDrivers] = useState([])
  const [dispatcher, setDispatcher] = useState({email: '', username: '', name: '', company: '', password: '', accountType: 'dispatcher'})

  const navigate = useNavigate();

  const createAccount = async () => {

    setShowAlert(false)

    if (userInfo.password !== userInfo.passwordConf) {
      setAlertMsg('Password do not match')
      setShowAlert(true)
      return
    }

    const dailyInsurance = (costs.insuranceAmount / 240) / costs.tractorNum

    if (showAlert === false) {
      if (userInfo.accountType === 'owner') {
        const response = await fetch(apiUrl + "/api/user/newOwner", {
          method: "POST",
          body: JSON.stringify({
            email: userInfo.email,
            password: userInfo.password,
            username: userInfo.username,
            insurance: dailyInsurance.toFixed(2),
            tractorLease: (costs.tractorAmount / 30).toFixed(2),
            trailerLease: (costs.trailerAmount / 30).toFixed(2),
            dispatch: (costs.dispatchAmount / 100).toFixed(2),
            mpg: costs.mpgAmount,
            laborRate: (costs.laborAmount / 100).toFixed(2),
            payrollTax: (costs.payrollAmount / 100).toFixed(2),
            factor: (costs.factorAmount / 100).toFixed(2),
            odc: (costs.odcAmount / 100).toFixed(2),
            overhead: (costs.overheadAmount / 100).toFixed(2),
            gAndA: (costs.gandaAmount / 30).toFixed(2),
            loan: (costs.loanAmount / 30).toFixed(2),
            repairs: (costs.repairsAmount / 30).toFixed(2),
            parking: (costs.parkingAmount / 30).toFixed(2),
            tractorNum: costs.tractorNum
          }),
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json())
        setUser(response[0]);
        setCosts(response[1])
        setLoggedIn(true)
        navigate('/dashboard')
      } else {
        const response = await fetch(apiUrl + "/api/user/newAdmin", {
          method: "POST",
          body: JSON.stringify({
            email: userInfo.email,
            password: userInfo.password,
            username: userInfo.username,
            insurance: dailyInsurance.toFixed(2),
            tractorLease: (costs.tractorAmount / 30).toFixed(2),
            trailerLease: (costs.trailerAmount / 30).toFixed(2),
            dispatch: (costs.dispatchAmount / 100).toFixed(2),
            mpg: costs.mpgAmount,
            laborRate: (costs.laborAmount / 100).toFixed(2),
            payrollTax: (costs.payrollAmount / 100).toFixed(2),
            factor: (costs.factorAmount / 100).toFixed(2),
            odc: (costs.odcAmount / 100).toFixed(2),
            overhead: (costs.overheadAmount / 100).toFixed(2),
            gAndA: (costs.gandaAmount / 30).toFixed(2),
            loan: (costs.loanAmount / 30).toFixed(2),
            repairs: (costs.repairsAmount / 30).toFixed(2),
            parking: (costs.parkingAmount / 30).toFixed(2),
            tractorNum: costs.tractorNum,
            drivers: drivers,
            dispatcher: dispatcher
          }),
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json()).then((data) => {return data})
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
          userInfo={userInfo} setUserInfo={setUserInfo} setAlertMsg={setAlertMsg} setShowAlert={setShowAlert} />
      )
    case 1:
      return (
        <Instructions currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
      )
    case 2:
      return (
        <AccountSelection currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}
          setShowAlert={setShowAlert} setAlertMsg={setAlertMsg} userInfo={userInfo} setUserInfo={setUserInfo}/>
      )
    case 3:
      return (
        <FixedCosts currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} costs={costs} setCosts={setCosts}
          setAlertMsg={setAlertMsg} setShowAlert={setShowAlert} userInfo={userInfo} setUserInfo={setUserInfo}/>
      )
    case 4:
      return (
        <OperationalCosts currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}
          setAlertMsg={setAlertMsg} setShowAlert={setShowAlert} costs={costs} setCosts={setCosts}
          userInfo={userInfo} createAccount={createAccount}/>
      )
    case 5:
      return (
        <AddDrivers currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}
          setAlertMsg={setAlertMsg} setShowAlert={setShowAlert}
          drivers={drivers} setDrivers={setDrivers} />
      )
    case 6:
      return (
        <AddDispatcher currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} setAlertMsg={setAlertMsg} setShowAlert={setShowAlert}
        dispatcher={dispatcher} setDispatcher={setDispatcher} userInfo={userInfo} />
      )
    case 7:
      return (
        <ConfirmDetails currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}
        userInfo={userInfo} costs={costs} drivers={drivers} createAccount={createAccount} dispatcher={dispatcher}/>
      )
  }
}