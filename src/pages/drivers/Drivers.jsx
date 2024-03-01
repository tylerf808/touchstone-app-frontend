import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './driversStyles.css'

const { apiUrl } = require('../../urls.json')

export default function Drivers({ user }) {

    const [users, setUsers] = useState([])
    const [edit, setEdit] = useState(false)

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
                        <><button>Confirm</button><button>Discard</button></>
                        :
                        <i id="edit-pencil" class="fa fa-pencil" style={{ fontSize: '2rem' }}></i>
                    }
                </div>
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
                    {edit ?
                        <div className="addNewDriverContainer">
                            <h1>+</h1>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}