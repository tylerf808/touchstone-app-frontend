import { useState, useEffect } from "react"
import './driverInputStyles.css'

export default function DriverInput({ num, drivers, setDrivers, setNumDrivers, numOfDrivers }) {

    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isFirst, setIsFirst] = useState()

    const updateDriverInfo = () => {
        const currentDriver = { name: newName, email: newEmail, username: newUsername, password: newPassword, num: num }
        setDrivers([...drivers, currentDriver])
    }

    useEffect(() => {
        if (num === 0) {
            setIsFirst(true)
        } else {
            setIsFirst(false)
        }
    }, [])

    return (
        <div className="driverInputs">
            <div className="driverHeaderContainer" >
                <h3 style={{ color: 'orange', fontSize: '1.2rem', justifySelf: 'flex-end' }}>Driver {num + 1}</h3>
                {isFirst ?
                    null 
                    :
                    <span style={{ color: 'red' }} onClick={() => {
                        const newArray = drivers
                        newArray.pop()
                        setDrivers(newArray)
                        setNumDrivers(numOfDrivers - 1)
                    }}>&#10006;</span>
                }
            </div>
            <div className="addDriversInputContainer">
                <div className="addDriversInputRow">
                    <div className="addDriversItem">
                        <p>Drivers Email</p>
                        <input defaultValue={drivers[num]?.email} className="addDriversInput" type="email" onChange={(e) => {
                            setNewEmail(e.target.value)
                            updateDriverInfo()
                        }}></input>
                    </div>
                    <div className="addDriversItem">
                        <p>Drivers Username</p>
                        <input defaultValue={drivers[num]?.username} className="addDriversInput" type="text" onChange={(e) => {
                            setNewUsername(e.target.value)
                            updateDriverInfo()
                        }}></input>
                    </div>
                </div>
                <div className="addDriversInputRow">
                    <div className="addDriversItem">
                        <p>Drivers Name</p>
                        <input defaultValue={drivers[num]?.name} className="addDriversInput" type="text" onChange={(e) => {
                            setNewName(e.target.value)
                            updateDriverInfo()
                        }}></input>
                    </div>
                    <div className="addDriversItem">
                        <p>Drivers Password</p>
                        <input defaultValue={drivers[num]?.password} className="addDriversPassword" type="password" onChange={(e) => {
                            setNewPassword(e.target.value)
                            updateDriverInfo()
                        }}></input>
                    </div>
                </div>
            </div>
        </div>
    )
}