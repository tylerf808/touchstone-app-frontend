import Toolbar from "./components/Toolbar";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { Alert } from "@mui/material";
import AddJob from "./pages/addJob/AddJob";
import LogIn from "./pages/logIn/LogIn";
import LandingPage from "./pages/landingPage/LandingPage";
import CostsPage from "./pages/costsPage/CostsPage";
import SignUp from "./pages/signUp/SignUp";
import ViewJobs from './pages/viewJobs/ViewJobs'
import Drivers from './pages/drivers/Drivers'
import Dashboard from "./pages/dashboard/Dashboard";
import UserContext, { useUserContext } from "./helpers/Context";
import { useEffect } from "react";
import './components/toolbarStyles.css'
import Confirmation from "./pages/signUp/Confirmation";

export default function App() {

  const { setShowMenu, showMenu, user, setUser, loggedIn, setLoggedIn, showAlert, setShowAlert, alertMsg,
     setAlertMsg, userType, setUserType, apiUrl, costs, setCosts, fetchUser } = useUserContext()

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn, showAlert, setShowAlert, alertMsg,
     setAlertMsg, userType, setUserType, costs, setCosts, apiUrl }}>
      <Router>
        <Toolbar setShowMenu={setShowMenu} showMenu={showMenu} setShowAlert={setShowAlert} user={user}
         loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} userType={userType} setUserType={setUserType} />
        <div className="alertContainer"> {showAlert ? <Alert className="alertMsg" severity="error">{alertMsg}</Alert> : null} </div>
        <Routes>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path="addjob" element={<AddJob />} />
          <Route path="/" element={<LandingPage />} />
          <Route path='login' element={<LogIn />} />
          <Route path="jobs" element={<ViewJobs />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="costs" element={<CostsPage />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="confirmation" element={<Confirmation />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}