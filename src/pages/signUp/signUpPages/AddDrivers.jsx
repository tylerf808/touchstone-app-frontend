import { useState, useEffect } from "react"
import DriverInput from "../../../components/DriverInput"

export default function AddDrivers(props) {

    const [drivers, setDrivers] = useState([])
    const [numOfDrivers, setNumOfDrivers] = useState()
    const [driverInputs, setDriverInputs] = useState([])

    useEffect(() => {
        const newArray = []
        for (let i = 0; i < numOfDrivers; i++) {
            newArray.push(<DriverInput key={i} num={i} drivers={drivers} setDrivers={setDrivers} />)
        }
        setDriverInputs(newArray)
        driverInputs.forEach((el, i) => {
            console.log(driverInputs[i])
        })
    }, [numOfDrivers])

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
            <div className="slideTitle">
                <h3>Add Drivers</h3>
            </div>
            <div className="addDriversSlide">
                <div className="selectDriversAmount">
                    <p>
                        Select the number of drivers you would like to add.
                        You can add more drivers at anytime on the drivers page
                        or you can select 0 to skip this step
                        and add them at another time.
                    </p>
                    <select defaultValue={0} className="editNumOfDrivers" type="number" onChange={(e) => setNumOfDrivers(e.target.value)}>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                    </select>
                </div>
                <div className="drivers">
                    {driverInputs}
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