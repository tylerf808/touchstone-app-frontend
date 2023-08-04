import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "./signup_pages/UserInfo";
import Instructions from "./signup_pages/Instructions";
import FixedCosts from "./signup_pages/FixedCosts";
import OperationalCosts from "./signup_pages/OperationalCosts";
import AddDrivers from "./signup_pages/AddDrivers";
import AccountSelection from "./signup_pages/AccountSelection";
import SelectManager from "./signup_pages/SelectManger";

export default function SignUp({ showAlert, loggedIn, setLoggedIn, setUser, setCosts, user, setAlertMsg, setShowAlert }) {

  const [currentSlide, setCurrentSlide] = useState(0)
  const [accountType, setAccountType] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [insuranceType, setInsuranceType] = useState()
  const [insuranceAmount, setInsuranceAmount] = useState(0)
  const [tractorAmount, setTractorAmount] = useState(0)
  const [trailerAmount, setTrailerAmount] = useState(0)
  const [dispatchAmount, setDispatchAmount] = useState(0)
  const [factorAmount, setFactorAmount] = useState(0)
  const [odcAmount, setOdcAmount] = useState(0)
  const [loanAmount, setLoanAmount] = useState(0)
  const [repairsAmount, setRepairsAmount] = useState(0)
  const [mpgAmount, setMpgAmount] = useState(0)
  const [laborAmount, setLaborAmount] = useState(0)
  const [payrollAmount, setPayrollAmount] = useState(0)
  const [gandaAmount, setGandaAmount] = useState(0)
  const [parkingAmount, setParkingAmount] = useState(0)
  const [drivers, setDrivers] = useState([{email: '', username: '', name: '', password: '', num: 0}])

  const navigate = useNavigate();

  const createAccount = async (account) => {

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
        const response = await fetch("http://localhost:3001/api/user/driver", {
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
            gAndA: (gandaAmount / 30).toFixed(2),
            loan: (loanAmount / 30).toFixed(2),
            repairs: (repairsAmount / 30).toFixed(2),
            parking: (parkingAmount / 30).toFixed(2)
          }),
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json())
        setUser(response[0].user_id);
        setCosts(response[1])
        setLoggedIn(true)
        console.log(response[1])
        navigate('/addjob')
      } else {
        const response = await fetch("http://localhost:3001/api/user/manager", {
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
            gAndA: (gandaAmount / 30).toFixed(2),
            loan: (loanAmount / 30).toFixed(2),
            repairs: (repairsAmount / 30).toFixed(2),
            parking: (parkingAmount / 30).toFixed(2),
            drivers: drivers
          }),
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json())
        setUser(response[0].user_id);
        setCosts(response[1])
        setLoggedIn(true)
        console.log(response[1])
        navigate('/addjob')
      }
    } else {
      return
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
          setFactorAmount={setFactorAmount} setMpgAmount={setMpgAmount} setOdcAmount={setOdcAmount}
        />
      )
    case 4:
      return (
        <OperationalCosts currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}
          insuranceType={insuranceType} setInsuranceType={setInsuranceType} insuranceAmount={insuranceAmount}
          setInsuranceAmount={setInsuranceAmount} trailerAmount={trailerAmount} setTrailerAmount={setTrailerAmount}
          tractorAmount={tractorAmount} setTractorAmount={setTractorAmount} parkingAmount={parkingAmount}
          setParkingAmount={setParkingAmount} gandaAmount={gandaAmount} setGandaAmount={setGandaAmount}
          createAccount={createAccount} accountType={accountType} setShowAlert={setShowAlert}
        />
      )
    case 5:
      return (
        <AddDrivers currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}
          createAccount={createAccount} drivers={drivers} setDrivers={setDrivers}/>
      )
      case 6:
      return (
        <SelectManager currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}
          createAccount={createAccount}/>
      )
  }
}