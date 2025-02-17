import React from 'react'
import { useState, useEffect } from "react";

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
    const [showMenu, setShowMenu] = useState(false)
    const [location, setLocation] = useState()

    const fetchUser = async () => {

        const token = localStorage.getItem('token')

        if (!token) {
            setLoggedIn(false)
        } else {
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
    }

    return {
        user, setUser, userType, setUserType, costs, setCosts, loggedIn, setLoggedIn,
        showAlert, setShowAlert, alertMsg, setAlertMsg, apiUrl, fetchUser, showMenu, setShowMenu, location, setLocation
    }
}

export default UserContext