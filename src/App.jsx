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
import UserContext, { useUserContext } from "./helpers/Context";
import { useEffect } from "react";
import './components/toolbarStyles.css'

const library = ["places"];

export default function App() {

  const { user, setUser, loggedIn, setLoggedIn, showAlert, setShowAlert, alertMsg, setAlertMsg, userType, setUserType, apiUrl, costs, setCosts, fetchUser } = useUserContext()

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn, showAlert, setShowAlert, alertMsg, setAlertMsg, userType, setUserType, costs, setCosts, apiUrl }}>
      <Router>
        {loggedIn ? <Toolbar setShowAlert={setShowAlert} user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} userType={userType} setUserType={setUserType} />
          :
          <div className="toolbar"><h1 className='toolbarHeader' id='toolbar-header'>TOUCHSTONE LOGISTICS</h1></div>}
        <div className="alertContainer"> {showAlert ? <Alert className="alertMsg" severity="error">{alertMsg}</Alert> : null} </div>
        <Routes>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path="addjob" element={<AddJob library={library} />} />
          <Route path="/" element={<LogIn />} />
          <Route path="jobs" element={<ViewJobs />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="costs" element={<CostsPage />} />
          <Route path="drivers" element={<Drivers />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}