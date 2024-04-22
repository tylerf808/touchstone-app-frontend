import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './driversStyles.css'
import UserContext from "../../helpers/Context";

const { apiUrl } = require('../../urls.json')

export default function Drivers() {

    const [users, setUsers] = useState([])
    const [edit, setEdit] = useState(false)
    const [showNewUser, setShowNewUser] = useState(false)
    const [newUser, setNewUser] = useState({ email: '', username: '', name: '', password: '' })

    const token = localStorage.getItem('token')

    const navigate = useNavigate()

    useEffect(() => {

        if (!token) {
            navigate('/')
        }
        async function getUsers() {
            const response = await fetch(apiUrl + '/api/user/getUsers', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            }).then((res) => res.json())
            setUsers(response)
        }
        getUsers()
    }, [])

    const updateUsers = async () => {
        
    }

    return (
        <div className="pageContainer">
            <div className="usersContainer">
                <div className="editButtonsContainer">
                    <h2 style={{ color: 'orange' }}>Drivers & Dispatcher</h2>
                    {edit ?
                        <div className="confirmBtnContainer">
                            <button className="confirmBtn" onClick={() => setEdit(false)}>Confirm</button>
                            <button className="discardBtn" onClick={() => {
                                setUsers(users.filter((user) => user.username !== newUser.username))
                                setEdit(false)
                                }}>Discard</button>
                        </div>
                        :
                        <i id="edit-pencil" class="fa fa-pencil" style={{ fontSize: '2rem' }} onClick={() => {
                            setEdit(true)
                        }}></i>
                    }
                </div>
                {edit ?
                    <div className="userGrid">
                        {users.map((el, i) => {
                            if (el.accountType === 'driver') {
                                if (i % 2 === 0) {
                                    return (
                                        <div key={el.driver_id} className="displayDriversItem" style={{ borderRight: '.1rem solid black' }}>
                                            <h3 style={{ justifySelf: 'center' }}>{el.name}</h3>
                                            <div className="driverInfo">
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Email:</span> {el.email}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Username:</span> {el.username}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Full Name:</span> {el.name}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>User Type:</span> {el.accountType}</p>
                                            </div>
                                            <button className="userDeleteBtn">Delete</button>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={el.driver_id} className="displayDriversItem">
                                            <h3 style={{ justifySelf: 'center' }}>{el.name}</h3>
                                            <div className="driverInfo">
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Email:</span> {el.email}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Username:</span> {el.username}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Full Name:</span> {el.name}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>User Type:</span> {el.accountType}</p>
                                            </div>
                                            <button className="userDeleteBtn">Delete</button>
                                        </div>
                                    )
                                }
                            } else {
                                if (i % 2 === 0) {
                                    return (
                                        <div key={el.driver_id} className="displayDriversItem" style={{ borderRight: '.1rem solid black' }}>
                                            <h3 style={{ justifySelf: 'center' }}>{el.name}</h3>
                                            <div className="driverInfo">
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Email:</span> {el.email}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Username:</span> {el.username}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Full Name:</span> {el.name}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>User Type:</span> {el.accountType}</p>
                                            </div>
                                            <button className="userDeleteBtn">Delete</button>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={el.driver_id} className="displayDriversItem">
                                            <h3 style={{ justifySelf: 'center' }}>{el.name}</h3>
                                            <div className="driverInfo">
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Email:</span> {el.email}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Username:</span> {el.username}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Full Name:</span> {el.name}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>User Type:</span> {el.accountType}</p>
                                            </div>
                                            <button className="userDeleteBtn">Delete</button>
                                        </div>
                                    )
                                }
                            }
                        })}
                    </div>
                    :
                    <div className="userGrid">
                        {users.map((el, i) => {
                            if (el.accountType === 'driver') {
                                if (i % 2 === 0) {
                                    return (
                                        <div key={el.driver_id} className="displayDriversItem" style={{ borderRight: '.1rem solid black' }}>
                                            <h3 style={{ justifySelf: 'center' }}>{el.name}</h3>
                                            <div className="driverInfo">
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Email:</span> {el.email}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Username:</span> {el.username}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Full Name:</span> {el.name}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>User Type:</span> {el.accountType}</p>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={el.driver_id} className="displayDriversItem">
                                            <h3 style={{ justifySelf: 'center' }}>{el.name}</h3>
                                            <div className="driverInfo">
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Email:</span> {el.email}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Username:</span> {el.username}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Full Name:</span> {el.name}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>User Type:</span> {el.accountType}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            } else {
                                if (i % 2 === 0) {
                                    return (
                                        <div key={el.driver_id} className="displayDriversItem" style={{ borderRight: '.1rem solid black' }}>
                                            <h3 style={{ justifySelf: 'center' }}>{el.name}</h3>
                                            <div className="driverInfo">
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Email:</span> {el.email}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Username:</span> {el.username}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Full Name:</span> {el.name}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>User Type:</span> {el.accountType}</p>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={el.driver_id} className="displayDriversItem">
                                            <h3 style={{ justifySelf: 'center' }}>{el.name}</h3>
                                            <div className="driverInfo">
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Email:</span> {el.email}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Username:</span> {el.username}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Full Name:</span> {el.name}</p>
                                                <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>User Type:</span> {el.accountType}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                        })}
                    </div>
                }
                {edit ?
                    <div className="addNewUserContainer" style={{ borderTop: '.1rem solid black' }}>
                        {showNewUser ?
                            <div className="newUserInputContainer">
                                <div className="newUserInputItem"><p>Email:</p><input onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} type="text"></input></div>
                                <div className="newUserInputItem"><p>Username:</p><input onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} type="text"></input></div>
                                <div className="newUserInputItem"><p>Name:</p><input onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} type="text"></input></div>
                                <div className="newUserInputItem"><p>Password:</p><input onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} type="text"></input></div>
                                <div className="newUserBtnContainer">
                                    <button onClick={() => {
                                        setUsers([...users, newUser])
                                        setShowNewUser(false)
                                    }}>Confirm</button>
                                    <button onClick={() => setShowNewUser(false)}>Cancel</button>
                                </div>
                            </div>
                            :
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onClick={() => setShowNewUser(true)}>
                                <h1 style={{ color: 'green' }}>+</h1><p style={{ marginLeft: '1rem' }} >Add User</p>
                            </div>
                        }
                    </div>
                    :
                    null
                }
            </div>
        </div>
    )
}