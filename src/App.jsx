import { useState, useEffect, StrictMode } from "react";
import Toolbar from "./routes/Toolbar";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import { Alert } from "@mui/material";
import AddJob from "./routes/AddJob";
import LogIn from "./routes/LogIn";
import CostsPage from "./routes/CostsPage";
import SignUp from "./routes/SignUp";
import ViewJobs from './routes/ViewJobs'
import Drivers from './routes/Drivers'

const library = ["places"];

export default function App() {

  const [user, setUser] = useState();
  const [userType, setUserType] = useState()
  const [costs, setCosts] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [insuranceType, setInsuranceType] = useState()
  const [insuranceValue, setInsuranceValue] = useState()
  const [tractorValue, setTractorValue] = useState()
  const [trailerValue, setTrailerValue] = useState()
  const [mpgValue, setMpgValue] = useState()
  const [laborValue, setLaborValue] = useState()
  const [payrollValue, setPayrollValue] = useState()
  const [dispatchValue, setDispatchValue] = useState()
  const [factorValue, setFactorValue] = useState()
  const [odcValue, setOdcValue] = useState()
  const [gAndAValue, setGAndAValue] = useState()
  const [loanValue, setLoanValue] = useState()
  const [repairsValue, setRepairsValue] = useState()

  const signUp = async () => {
    const email = document.getElementById("email-signup").value;
    const password = document.getElementById("password-signup").value;
    const passwordConf = document.getElementById("password-signup-conf").value;

    if (email || password === '' || passwordConf === '') {
      return
    }

    if (password !== passwordConf) {
      return
    }

    const response = await fetch("http://localhost:3001/api/user", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
    setUser(response.user_id);
  };

  return (
      <Router>
        <Toolbar user={user} costs={costs} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} setCosts={setCosts} />
        <div className="alertContainer"> {showAlert ? <Alert className="alertMsg" severity="error">{alertMsg}</Alert> : null} </div>
        <Routes>
          <Route path="addjob" element={<AddJob loggedIn={loggedIn} library={library} user={user} setAlertMsg={setAlertMsg} setShowAlert={setShowAlert} />} />
          <Route path="/" element={<LogIn setAlertMsg={setAlertMsg} setShowAlert={setShowAlert} user={user} setUser={setUser} userType={userType} setUserType={setUserType} costs={costs} setCosts={setCosts} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="jobs" element={<ViewJobs user={user} costs={costs} setCosts={setCosts} userType={userType}/>} />
          <Route path="signup" setUserType={setUserType} userType={userType} user={user} element={<SignUp showAlert={showAlert} setAlertMsg={setAlertMsg} setShowAlert={setShowAlert} setCosts={setCosts} setUser={setUser} setLoggedIn={setLoggedIn} signUp={signUp} loggedIn={loggedIn} />} />
          <Route path="costs" userType={userType} element={<CostsPage insuranceType={insuranceType} setInsuranceType={setInsuranceType}
          insuranceValue={insuranceValue} setInsuranceValue={setInsuranceValue}
          tractorValue={tractorValue} setTractorValue={setTractorValue} trailerValue={trailerValue}
          setTrailerValue={setTrailerValue} mpgValue={mpgValue} setMpgValue={setMpgValue}
          laborValue={laborValue} setLaborValue={setLaborValue} payrollValue={payrollValue}
          setPayrollValue={setPayrollValue} dispatchValue={dispatchValue} setDispatchValue={setDispatchValue}
          factorValue={factorValue} setFactorValue={setFactorValue} odcValue={odcValue} setOdcValue={setOdcValue}
          gAndAValue={gAndAValue} setGAndAValue={setGAndAValue} loanValue={loanValue} setLoanValue={setLoanValue}
          repairsValue={repairsValue} setRepairsValue={setRepairsValue}
          loggedIn={loggedIn} user={user} costs={costs} setCosts={setCosts} />} />
          <Route path="drivers" element={<Drivers userType={userType} user={user}/>} />
        </Routes>
        
      </Router>
  );
}