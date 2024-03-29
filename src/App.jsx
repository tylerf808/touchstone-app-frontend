import { useState, useEffect, StrictMode } from "react";
import Toolbar from "./components/Toolbar";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import { Alert } from "@mui/material";
import AddJob from "./pages/addJob/AddJob";
import LogIn from "./pages/logIn/LogIn";
import CostsPage from "./pages/costsPage/CostsPage";
import SignUp from "./pages/signUp/SignUp";
import ViewJobs from './pages/viewJobs/ViewJobs'
import Drivers from './pages/drivers/Drivers'
import Dashboard from "./pages/dashboard/Dashboard";

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


  return (
      <Router>
        <Toolbar setShowAlert={setShowAlert} user={user} costs={costs} userType={userType} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} setCosts={setCosts} />
        <div className="alertContainer"> {showAlert ? <Alert className="alertMsg" severity="error">{alertMsg}</Alert> : null} </div>
        <Routes>
          <Route path='dashboard' element={<Dashboard user={user} loggedIn={loggedIn} userType={userType}/>} />
          <Route path="addjob" element={<AddJob loggedIn={loggedIn} library={library} user={user} setAlertMsg={setAlertMsg} setShowAlert={setShowAlert} />} />
          <Route path="/" element={<LogIn setAlertMsg={setAlertMsg} setShowAlert={setShowAlert} user={user} setUser={setUser} userType={userType} setUserType={setUserType} costs={costs}
           setCosts={setCosts} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="jobs" element={<ViewJobs user={user} costs={costs} setCosts={setCosts} userType={userType} loggedIn={loggedIn}/>} />
          <Route path="signup"  element={<SignUp setUserType={setUserType} userType={userType} user={user} showAlert={showAlert} setAlertMsg={setAlertMsg} setShowAlert={setShowAlert}
           setCosts={setCosts} setUser={setUser} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
          <Route path="costs"  element={<CostsPage userType={userType} insuranceType={insuranceType} setInsuranceType={setInsuranceType}
          insuranceValue={insuranceValue} setInsuranceValue={setInsuranceValue}
          tractorValue={tractorValue} setTractorValue={setTractorValue} trailerValue={trailerValue}
          setTrailerValue={setTrailerValue} mpgValue={mpgValue} setMpgValue={setMpgValue}
          laborValue={laborValue} setLaborValue={setLaborValue} payrollValue={payrollValue}
          setPayrollValue={setPayrollValue} dispatchValue={dispatchValue} setDispatchValue={setDispatchValue}
          factorValue={factorValue} setFactorValue={setFactorValue} odcValue={odcValue} setOdcValue={setOdcValue}
          gAndAValue={gAndAValue} setGAndAValue={setGAndAValue} loanValue={loanValue} setLoanValue={setLoanValue}
          repairsValue={repairsValue} setRepairsValue={setRepairsValue}
          loggedIn={loggedIn} user={user} />} />
          <Route path="drivers" element={<Drivers userType={userType} user={user}/>} />
        </Routes>
        
      </Router>
  );
}