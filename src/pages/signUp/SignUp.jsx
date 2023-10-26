import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "./signUpPages/UserInfo";
import Instructions from "./signUpPages/Instructions";
import FixedCosts from "./signUpPages/FixedCosts";
import OperationalCosts from "./signUpPages/OperationalCosts";
import AddDrivers from "./signUpPages/AddDrivers";
import AccountSelection from "./signUpPages/AccountSelection";
import SelectManager from "./signUpPages/SelectManger";
import './signUpStyles.css'

const {apiUrl} = require('../../urls.json')

export default function SignUp({ showAlert, setLoggedIn, setUser, setCosts, setAlertMsg, setShowAlert }) {

  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAdmin, setSelectedAdmin] = useState('')
  const [accountType, setAccountType] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [insuranceType, setInsuranceType] = useState()
  const [insuranceAmount, setInsuranceAmount] = useState()
  const [tractorAmount, setTractorAmount] = useState()
  const [trailerAmount, setTrailerAmount] = useState()
  const [dispatchAmount, setDispatchAmount] = useState()
  const [factorAmount, setFactorAmount] = useState()
  const [odcAmount, setOdcAmount] = useState()
  const [loanAmount, setLoanAmount] = useState()
  const [repairsAmount, setRepairsAmount] = useState()
  const [mpgAmount, setMpgAmount] = useState()
  const [laborAmount, setLaborAmount] = useState()
  const [payrollAmount, setPayrollAmount] = useState()
  const [gandaAmount, setGandaAmount] = useState()
  const [parkingAmount, setParkingAmount] = useState()
  const [overheadAmount, setOverheadAmount] = useState()
  const [tractorNum, setTractorNum] = useState()

  const navigate = useNavigate();

  const createAccount = async (drivers, setDrivers) => {

    setShowAlert(false)

    const newDrivers = drivers
    newDrivers.pop()
    setDrivers(newDrivers)

    if (password !== passwordConf) {
      setAlertMsg('Password do not match')
      setShowAlert(true)
      return
    }

    let insurance

    switch (insuranceType) {
      case 'monthly':
        insurance = insuranceAmount / 30
        break;
      case 'bi-monthly':
        insurance = insuranceAmount / 15
        break;
      case 'quarterly':
        insurance = insuranceAmount / 91
        break;
      default:
        insurance = insuranceAmount / 365
        break;
    }

    if (showAlert === false) {
      if (accountType === 'owner') {
        const response = await fetch(apiUrl + "/api/user/newOwner", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            username: username,
            insurance: insurance.toFixed(2),
            tractorLease: (tractorAmount / 30).toFixed(2),
            trailerLease: (trailerAmount / 30).toFixed(2),
            dispatch: (dispatchAmount / 100).toFixed(2),
            mpg: mpgAmount,
            laborRate: (laborAmount / 100).toFixed(2),
            payrollTax: (payrollAmount / 100).toFixed(2),
            factor: (factorAmount / 100).toFixed(2),
            odc: (odcAmount / 100).toFixed(2),
            overhead: (overheadAmount / 100).toFixed(2),
            gAndA: (gandaAmount / 100).toFixed(2),
            loan: (loanAmount / 30).toFixed(2),
            repairs: (repairsAmount / 30).toFixed(2),
            parking: (parkingAmount / 30).toFixed(2),
            insuranceType: insuranceType,
            tractorNum: tractorNum
          }),
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json())
        setUser(response[0].username);
        setCosts(response[1])
        setLoggedIn(true)
        navigate('/addjob')
      } else {
        const response = await fetch(apiUrl + "/api/user/newAdmin", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            username: username,
            insuranceType: insuranceType,
            insurance: insurance.toFixed(2),
            tractorLease: (tractorAmount / 30).toFixed(2),
            trailerLease: (trailerAmount / 30).toFixed(2),
            dispatch: (dispatchAmount / 100).toFixed(2),
            mpg: mpgAmount,
            laborRate: (laborAmount / 100).toFixed(2),
            payrollTax: (payrollAmount / 100).toFixed(2),
            factor: (factorAmount / 100).toFixed(2),
            odc: (odcAmount / 100).toFixed(2),
            overhead: (overheadAmount / 100).toFixed(2),
            gAndA: (gandaAmount / 30).toFixed(2),
            loan: (loanAmount / 30).toFixed(2),
            repairs: (repairsAmount / 30).toFixed(2),
            parking: (parkingAmount / 30).toFixed(2),
            drivers: drivers,
            tractorNum: tractorNum
          }),
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json())
        setUser(response[0].username);
        setCosts(response[1])
        setLoggedIn(true)
        navigate('/addjob')
      }
    } else {
      const response = await fetch(apiUrl + "/api/user/newDispatcher", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          username: username,
          admin: selectedAdmin
        }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json())
      setUser(response[0]);
      setCosts(response[1])
      setLoggedIn(true)
      navigate('/addjob')
    }
  }

  switch (currentSlide) {
    case 0:
      return (
        <UserInfo currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} password={password}
          setUser={setUser} setAlertMsg={setAlertMsg} setShowAlert={setShowAlert}
          setPassword={setPassword} passwordConf={passwordConf} setPasswordConf={setPasswordConf}
          email={email} setEmail={setEmail} accountType={accountType} setAccountType={setAccountType}
          username={username} setUsername={setUsername}
        />
      )
    case 1:
      return (
        <Instructions currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
      )
    case 2:
      return (
        <AccountSelection currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} accountType={accountType}
          setAccountType={setAccountType} setShowAlert={setShowAlert} setAlertMsg={setAlertMsg}
        />
      )
    case 3:
      return (
        <FixedCosts currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}
          laborAmount={laborAmount} payrollAmount={payrollAmount} dispatchAmount={dispatchAmount}
          factorAmount={factorAmount} mpgAmount={mpgAmount} odcAmount={odcAmount}
          setAlertMsg={setAlertMsg} setShowAlert={setShowAlert} setAccountType={setAccountType}
          setLaborAmount={setLaborAmount} setPayrollAmount={setPayrollAmount} setDispatchAmount={setDispatchAmount}
          setFactorAmount={setFactorAmount} setMpgAmount={setMpgAmount} setOdcAmount={setOdcAmount} overheadAmount={overheadAmount}
          setOverheadAmount={setOverheadAmount} tractorNum={tractorNum} setTractorNum={setTractorNum}
        />
      )
    case 4:
      return (
        <OperationalCosts currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}
          insuranceType={insuranceType} setInsuranceType={setInsuranceType} insuranceAmount={insuranceAmount}
          setInsuranceAmount={setInsuranceAmount} trailerAmount={trailerAmount} setTrailerAmount={setTrailerAmount}
          tractorAmount={tractorAmount} setTractorAmount={setTractorAmount} parkingAmount={parkingAmount}
          setParkingAmount={setParkingAmount} gandaAmount={gandaAmount} setGandaAmount={setGandaAmount}
          createAccount={createAccount} accountType={accountType} setShowAlert={setShowAlert} setAlertMsg={setAlertMsg}
          repairsAmount={repairsAmount} setRepairsAmount={setRepairsAmount} loanAmount={loanAmount} setLoanAmount={setLoanAmount}
        />
      )
    case 5:
      return (
        <AddDrivers currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}
          createAccount={createAccount}  />
      )
    case 6:
      return (
        <SelectManager selectedAdmin={selectedAdmin} setSelectedAdmin={setSelectedAdmin} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}
          createAccount={createAccount} />
      )
  }
}