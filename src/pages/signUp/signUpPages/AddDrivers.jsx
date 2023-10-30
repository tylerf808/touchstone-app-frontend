import { useState, useEffect } from "react"
import DriverInput from "../../../components/DriverInput"

export default function AddDrivers(props) {

    const [drivers, setDrivers] = useState([{ email: '', username: '', name: '', password: '', num: 0, admin: props.user }])
    const [driverInputs, setDriverInputs]= useState()

    const togglePassword = () => {
        const passwords = Array.from(document.getElementsByClassName('addDriversPassword'))
        passwords.forEach((el) => {
            if (el.type === 'password') {
                el.type = 'text'
            } else {
                el.type = 'password'
            }
        })
    }

    return (
        <div className="pageContainer">
            <div className="slider">
                <div className="slide">
                    <div className="slideTitle">
                        <h1>Add Drivers</h1>
                    </div>
                    <div className="addDriversContainer">
                        <div className="selectDriversAmount">
                            <p>Select the number of drivers you would like to add. 
                                You can add more drivers at anytime on the drivers page.</p>
                        </div>
                        <div className="drivers">
                            {driverInputs}
                        </div>
                    </div>
                </div>
            </div>
            <div className="btnContainerSignUp">
                <button className="btnSignUp" onClick={() => {
                    props.setCurrentSlide(props.currentSlide - 1)
                }}>Back</button>
                <button className="btnSignUp" onClick={props.createAccount}>Submit</button>
            </div>
        </div>
    )
}