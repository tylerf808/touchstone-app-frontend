import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './driversStyles.css'
import UserContext from "../../helpers/Context";

const { apiUrl } = require('../../urls.json')

export default function Drivers() {

    const [users, setUsers] = useState([])
    const [addNewUser, setAddNewUser] = useState(false)
    const [edit, setEdit] = useState(false)

    const {user, loggedIn} = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (user === null || user === undefined) {
            navigate('/')
        }
        async function getUsers() {
            const response = await fetch(apiUrl + '/api/user/getUsers', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ admin: user.username })
            }).then((res) => res.json())
            setUsers(response)
        }
        getUsers()
    }, [])

    return (
        <div className="pageContainer">
            <div className="usersContainer">
                <div className="editButtonsContainer">
                    <h2 style={{ color: 'orange' }}>Drivers & Dispatcher</h2>
                    {edit ?
                        <div className="confirmBtnContainer">
                            <button className="confirmBtn" onClick={() => setEdit(false)}>Confirm</button>
                            <button className="discardBtn" onClick={() => setEdit(false)}>Discard</button>
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
                    <div className="addNewUserContainer" style={{borderTop: '.1rem solid black', height: '4rem'}}>
                        {addNewUser ?
                        <></>
                        :
                        <><h1 style={{ color: 'green'}}>+</h1><p style={{marginLeft: '1rem'}}>Add User</p></>
                    } 
                    </div>
                    :
                    null
                }
            </div>
        </div>
    )
}