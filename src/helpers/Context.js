import React from 'react'
import { useState } from "react";

const UserContext = React.createContext()

export const useUserContext = () => {

    let apiUrl

    if (process.env.REACT_APP_ENVIRONMENT === 'development') {
        apiUrl = process.env.REACT_APP_DEVELOPMENT_API
    } else {
        apiUrl = process.env.REACT_APP_TEST_API
    }

    const [user, setUser] = useState()
    const [userType, setUserType] = useState()
    const [costs, setCosts] = useState()
    const [loggedIn, setLoggedIn] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState("")

    return {
        user, setUser, userType, setUserType, costs, setCosts, loggedIn, setLoggedIn,
        showAlert, setShowAlert, alertMsg, setAlertMsg, apiUrl
    }
}

export default UserContext