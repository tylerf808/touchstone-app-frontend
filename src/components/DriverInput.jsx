import { useState } from "react"

export default function DriverInput({num, setDrivers, drivers}) {

    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const editDriver = () => {
        const currentDriverIndex = drivers.findIndex((driver) => driver.num === num)
        const currentDriver = drivers[currentDriverIndex]
        currentDriver.name = newName
        currentDriver.email = newEmail
        currentDriver.username = newUsername
        currentDriver.password = newPassword
        const newDrivers = [...drivers, {email: '', username: '', name: '', password: '', num: num+1}]
        newDrivers[currentDriverIndex] = currentDriver
        setDrivers(newDrivers)
    }

    return (
        <div className="driverInputs">
            <div className="driverHeaderContainer">
                <h3>Driver {num+1}</h3>
            </div>
            <div className="addDriversItem">
                <p>Drivers Email</p>
                <input className="addDriversInput" type="email" onChange={(e) => {
                    setNewEmail(e.target.value)
                    editDriver()
                }}></input>
            </div>
            <div className="addDriversItem">
                <p>Drivers Username</p>
                <input className="addDriversInput" type="text" onChange={(e) => {
                    setNewUsername(e.target.value)
                    editDriver()
                }}></input>
            </div>
            <div className="addDriversItem">
                <p>Drivers Name</p>
                <input className="addDriversInput" type="text"onChange={(e) => {
                    setNewName(e.target.value)
                    editDriver()
                }}></input>
            </div>
            <div className="addDriversItem">
                <p>Drivers Password</p>
                <input className="addDriversPassword" type="password" onChange={(e) => {
                    setNewPassword(e.target.value)
                    editDriver()
                }}></input>
            </div>
        </div>
    )
}