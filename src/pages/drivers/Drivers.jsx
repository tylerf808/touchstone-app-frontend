import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './driversStyles.css'
import UserContext from "../../helpers/Context";

export default function Drivers() {

    const { user, apiUrl } = useContext(UserContext)

    const [dispatchers, setDispatchers] = useState([])
    const [drivers, setDrivers] = useState([])
    const [tractors, setTractors] = useState([])
    const [edit, setEdit] = useState(false)

    const token = localStorage.getItem('token')

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/')
        } else {
            getUsers()
            getTractors()
        }
    }, [])

    const getUsers = async () => {
        const response = await fetch(apiUrl + '/api/user/getUsers', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        }).then((res) => res.json())
        response.forEach((user) => {
            if (user.accountType === 'driver') {
                setDrivers((prev) => [...prev, user])
            } else {
                setDispatchers((prev) => [...prev, user])
            }
        })
        console.log(drivers)
    }

    const getTractors = async () => {
        const response = await fetch(apiUrl + '/api/tractor/getTractors', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        }).then((res) => res.json())
        setTractors(response)
    }


    // const updateUsers = async () => {

    //     await fetch(apiUrl + '/api/user/setUsers', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": token
    //         },
    //         body: JSON.stringify([...users, newUser])
    //     }).then((res) => res.json()).then((data) => setUsers(data))
    // }

    return (
        <div className="pageContainer">
            <div className="usersContainer">
                <div className="editContainer">

                </div>
                <div className="container" id="tractors-container">
                    <div className="header" id="tractors-header">
                        <h1 style={{ color: 'orange' }}>Tractors</h1>
                        {edit ?
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '1rem' }}>
                                <span id="edit-btn" className="cancelX" onClick={() => {
                                    setEdit(false)
                                }}>&#10006;</span>
                                <span id="edit-btn" className="confirmCheck" onClick={() => {
                                    document.getElementById('confirm-changes-container').style.display = 'block'
                                }}>&#10003;</span>
                                <div className="confirmChangesContainer" id="confirm-changes-container" style={{ position: 'absolute', backgroundColor: 'white', display: 'none' }}>
                                    <p style={{ fontWeight: 'bold' }}>Confirm Changes:</p><button style={{ color: 'white', backgroundColor: 'green', marginLeft: '1rem' }} onClick={() => {
                                        setEdit(false)
                                        document.getElementById('confirm-changes-container').style.display = 'none'
                                    }}>Confirm</button><button style={{ color: 'white', backgroundColor: 'red', marginLeft: '1rem' }} onClick={() => {
                                        document.getElementById('confirm-changes-container').style.display = 'none'
                                        setEdit(false)
                                    }}>Discard</button>
                                </div>
                            </div>
                            :
                            <i id="edit-btn" className="fa fa-pencil" style={{ fontSize: '1.5em' }} onClick={() => {
                                setEdit(true)
                            }}></i>
                        }
                    </div>
                    <div className="list">
                        {tractors.map((tractor) => {
                            return (
                                <div className="item" id="tractor-itme">
                                    <p className="label" id="tractor-label">Internal Num:</p><span>{tractor.internalNum}</span>
                                    <p className="label" id="tractor-label">VIN:</p><span>{tractor.vin}</span>
                                    <p className="label" id="tractor-label">MPG:</p><span>{tractor.mpg}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="container">
                    <div className="header">
                        <h1 style={{ color: 'orange' }}>Drivers</h1>
                    </div>
                    <div className="list">
                        {drivers.map((driver) => {
                            return (
                                <div className="item">
                                    <p className="label">Name: </p><span>{driver.name}</span>
                                    <p className="label">Email: </p><span>{driver.email}</span>
                                    <p className="label">Username: </p><span>{driver.username}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="container" style={{ borderBottom: 'none' }}>
                    <div className="header">
                        <h1 style={{ color: 'orange' }}>Dispatchers</h1>
                    </div>
                    <div className="list">
                        {dispatchers.map((dispatcher) => {
                            return (
                                <div className="item">
                                    <p className="label">Name: </p><span>{dispatcher.name}</span>
                                    <p className="label">Email: </p><span>{dispatcher.email}</span>
                                    <p className="label">Username: </p><span>{dispatcher.username}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}