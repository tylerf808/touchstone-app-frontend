import { useState } from "react"
import './driverInputStyles.css'

export default function DriverInput({ num, drivers, setDrivers }) {

    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const updateDriverInfo = () => {
        const currentDriver = {name: newName, email: newEmail, username: newUsername, password: newPassword, num: num}
        const oldArray = drivers
        oldArray.splice(num, 1, currentDriver)
        setDrivers(oldArray)
    }

    return (
        <div className="driverInputs">
            <div className="driverHeaderContainer">
                <h3>Driver {num + 1}</h3>
            </div>
            <div className="addDriversInputContainer">
                <div className="addDriversInputRow">
                    <div className="addDriversItem">
                        <p>Drivers Email</p>
                        <input className="addDriversInput" type="email" onChange={(e) => {
                            setNewEmail(e.target.value)
                            updateDriverInfo()
                        }}></input>
                    </div>
                    <div className="addDriversItem">
                        <p>Drivers Username</p>
                        <input className="addDriversInput" type="text" onChange={(e) => {
                            setNewUsername(e.target.value)
                            updateDriverInfo()
                        }}></input>
                    </div>
                </div>
                <div className="addDriversInputRow">
                    <div className="addDriversItem">
                        <p>Drivers Name</p>
                        <input className="addDriversInput" type="text" onChange={(e) => {
                            setNewName(e.target.value)
                            updateDriverInfo()
                        }}></input>
                    </div>
                    <div className="addDriversItem">
                        <p>Drivers Password</p>
                        <input className="addDriversPassword" type="password" onChange={(e) => {
                            setNewPassword(e.target.value)
                            updateDriverInfo()
                        }}></input>
                    </div>
                </div>
            </div>
        </div>
    )
}