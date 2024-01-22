import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './driversStyles.css'

const { apiUrl } = require('../../urls.json')

export default function Drivers(props) {

    const [drivers, setDrivers] = useState([])
    const [dispatcher, setDispatcher] = useState()
    const [edit, setEdit] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (props.user === null || props.user === undefined) {
            navigate('/')
        }
        async function getDrivers() {
            const response = await fetch(apiUrl + '/api/user/getDrivers', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ manager: props.user })
            }).then((res) => res.json())
            setDrivers(response)
        }
        getDrivers()
    }, [])

    return (
        <div className="pageContainer">
            <div className="pageHeaderContainer" style={{marginBottom: '1rem'}}>
                <h1 style={{ color: 'orange', fontWeight: 'bolder' }}>Users</h1>
            </div>
            <div className="usersDisplay">
                <div className="driversDisplay">
                    <div className="headerContainer" style={{marginBottom: '1rem'}}>
                        <h2 style={{ color: "orange", justifySelf: 'flex-start',  }}>Drivers</h2>
                    </div>
                    {edit ?
                        <>
                            {drivers.map((el) => {
                                return (
                                    <div key={el.driver_id} className="displayDriversItem">
                                        <input className="editDriversInput" defaultValue={el.email}></input>
                                        <input className="editDriversInput" defaultValue={el.username}></input>
                                    </div>
                                )
                            })}
                        </>
                        :
                        <>
                            {drivers.map((el) => {
                                return (
                                    <div key={el.driver_id} className="displayDriversItem">
                                        <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Email:</span> {el.email}</p>
                                        <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Username:</span> {el.username}</p>
                                        <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Name:</span> {el.name}</p>
                                        <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Available:</span> {el?.available}</p>
                                    </div>
                                )
                            })}
                        </>}
                </div>
                <div className="dispatcherDisplay">
                    <div className="headerContainer" style={{marginBottom: '1rem'}}>
                        <h2 style={{ color: "orange", justifySelf: 'flex-start' }}>Dispatcher</h2>
                    </div>
                    {edit ?
                        <>
                        </>
                        :
                        <div className="dispatcherItem">
                            <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Email:</span></p>
                            <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Username:</span></p>
                            <p><span style={{ fontWeight: 'bold', margin: '1rem' }}>Name:</span></p>
                        </div>
                    }
                </div>
            </div>
            <div className="btnContainer">
                {edit ?
                    <button className="logInBtn" onClick={() => setEdit(false)}>Submit</button>
                    :
                    <button className="logInBtn" onClick={() => setEdit(true)}>Edit Users</button>
                }
            </div>
        </div>
    )
}