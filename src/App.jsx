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
import Users from './pages/users/Users'
import Dashboard from "./pages/dashboard/Dashboard";
import UserContext, { useUserContext } from "./helpers/Context";
import { useEffect } from "react";
import './components/toolbarStyles.css'
import ConfirmationPage from "./pages/confirmationPage/ConfirmationPage";
import Tractors from "./pages/tractors/Tractors";
import EnterDetails from "./pages/signUp/EnterDetails"

export default function App() {

  const { setShowMenu, showMenu, user, setUser, loggedIn, setLoggedIn, showAlert, setShowAlert, alertMsg,
    setAlertMsg, userType, setUserType, apiUrl, costs, setCosts, fetchUser, location, setLocation } = useUserContext()

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{
      user, setUser, loggedIn, setLoggedIn, showAlert, setShowAlert, alertMsg,
      setAlertMsg, userType, setUserType, costs, setCosts, apiUrl
    }}>
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
          <Route path="users" element={<Users />} />
          <Route path="tractors" element={<Tractors />} />
          <Route path="confirm" element={<ConfirmationPage />} />
          <Route path="confirmSignUp" element={<EnterDetails />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}