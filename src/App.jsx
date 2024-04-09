import { useState, createContext } from "react";
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
import UserContext from "./helpers/Context";

const library = ["places"];

export default function App() {

  const [user, setUser] = useState();
  const [userType, setUserType] = useState()
  const [costs, setCosts] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  return (
    <UserContext.Provider value={{user, setUser, loggedIn, setLoggedIn, showAlert, setShowAlert, alertMsg, setAlertMsg, userType, setUserType}}>
      <Router>
        <Toolbar setShowAlert={setShowAlert} user={user} costs={costs} userType={userType} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} setCosts={setCosts} />
        <div className="alertContainer"> {showAlert ? <Alert className="alertMsg" severity="error">{alertMsg}</Alert> : null} </div>
        <Routes>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path="addjob" element={<AddJob library={library} />} />
          <Route path="/" element={<LogIn />} />
          <Route path="jobs" element={<ViewJobs user={user} costs={costs} setCosts={setCosts} userType={userType} loggedIn={loggedIn} />} />
          <Route path="signup" element={<SignUp costs={costs} setCosts={setCosts} setUserType={setUserType} userType={userType} user={user} showAlert={showAlert} setAlertMsg={setAlertMsg} setShowAlert={setShowAlert}
            setUser={setUser} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
          <Route path="costs" element={<CostsPage loggedIn={loggedIn} user={user} />} />
          <Route path="drivers" element={<Drivers userType={userType} user={user} />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}