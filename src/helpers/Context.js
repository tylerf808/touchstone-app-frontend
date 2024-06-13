import React from 'react'
import { useState } from "react";

const UserContext = React.createContext()

export const useUserContext = () => {

    let apiUrl

    if (process.env.ENVIRONMENT === 'development') {
        apiUrl = process.env.DEVELOPMENT_API
    } else {
        apiUrl = process.env.TEST_API
    }

    const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY

    const [user, setUser] = useState()
    const [userType, setUserType] = useState()
    const [costs, setCosts] = useState()
    const [loggedIn, setLoggedIn] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState("")

    return {
        user, setUser, userType, setUserType, costs, setCosts, loggedIn, setLoggedIn,
        showAlert, setShowAlert, alertMsg, setAlertMsg, apiUrl, googleMapsApiKey
    }
}

export default UserContext