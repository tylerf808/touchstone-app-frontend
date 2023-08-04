import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Drivers(props) {

    const [drivers, setDrivers] = useState([])
    const [edit, setEdit] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (props.user === null || props.user === undefined) {
            navigate('/')
        }
        async function getDrivers() {
            const response = await fetch('http://localhost:3001/api/user/getDrivers', {
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
            <div className="driversDisplay">
                {edit ?
                    <div className="horizontalContainer">
                        {drivers.map((el) => {
                            return (
                                <div key={el.driver_id} className="displayDriversItem">
                                    <input className="editDriversInput" defaultValue={el.email}></input>
                                    <input className="editDriversInput" defaultValue={el.username}></input>
                                </div>
                            )
                        })}
                    </div>
                    :
                    <div className="horizontalContainer">
                        {drivers.map((el) => {
                            return (
                                <div key={el.driver_id} className="displayDriversItem">
                                    <p>{el.email}</p>
                                    <p>{el.username}</p>
                                </div>
                            )
                        })}
                    </div>}
            </div>
            <div className="btnContainer">
                {edit ?
                    <button className="logInBtn" onClick={() => setEdit(false)}>Submit</button>
                    :
                    <button className="logInBtn" onClick={() => setEdit(true)}>Edit Drivers</button>
                }
            </div>
        </div>
    )
}