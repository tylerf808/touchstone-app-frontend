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

let apiUrl

if(process.env.ENVIRONMENT === 'development'){
  apiUrl = process.env.DEVELOPMENT_API
} else {
  apiUrl = process.env.TEST_API
}

const library = ["places"];

export default function App() {

  const { user, setUser, loggedIn, setLoggedIn, showAlert, setShowAlert, alertMsg, setAlertMsg, userType, setUserType } = useUserContext()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token){
      setLoggedIn(false)
    } else {
      fetchUser(token)
    }
  }, [])

  const fetchUser = async (token) => {
    await fetch(apiUrl + '/api/user/getUser', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    }).then((res) => res.json()).then((data) => {
      setLoggedIn(true)
      setUser(data)
    })
  }

  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn, showAlert, setShowAlert, alertMsg, setAlertMsg, userType, setUserType }}>
      <Router>
        <Toolbar setShowAlert={setShowAlert} user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} userType={userType} setUserType={setUserType} />
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