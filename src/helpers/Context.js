import React from 'react'
import { useState } from "react";

const UserContext = React.createContext()

export const useUserContext = () => {
    const [user, setUser] = useState()
    const [userType, setUserType] = useState()
    const [costs, setCosts] = useState()
    const [loggedIn, setLoggedIn] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState("")

    return {
        user, setUser, userType, setUserType, costs, setCosts, loggedIn, setLoggedIn,
        showAlert, setShowAlert, alertMsg, setAlertMsg
    }
}

export default UserContext