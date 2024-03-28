import { useState } from "react";
import Toolbar from "./components/Toolbar";
import {
  BrowserRouter as Router,
  Route,
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
          <Route path="costs"  element={<CostsPage loggedIn={loggedIn} user={user} />} />
          <Route path="drivers" element={<Drivers userType={userType} user={user}/>} />
        </Routes>
        
      </Router>
  );
}