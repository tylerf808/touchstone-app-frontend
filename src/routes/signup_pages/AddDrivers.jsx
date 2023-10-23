import { useState } from "react"
import DriverInput from "../../components/DriverInput"

export default function AddDrivers(props) {

    const [drivers, setDrivers] = useState([{ email: '', username: '', name: '', password: '', num: 0, admin: props.user }])
    const [inputList, setInputList] = useState([<DriverInput key={0} num={0} setDrivers={setDrivers} drivers={drivers} user={props.user}/>])

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
                        <h1>Drivers</h1>
                    </div>
                    <div className="addDriversContainer">
                        {inputList}
                        <div className="showPasswordContainerDrivers">
                            <p className="showPasswordLabel">Show Passwords</p>
                            <input className='showPasswordInput' onClick={togglePassword} type='checkbox'></input>
                        </div>
                        <div className="addDriverBtnContainer">
                            <button className="btnAddDriver" onClick={() => {
                                setInputList(inputList.concat([<DriverInput key={inputList.length -1} num={inputList.length - 1}
                                    setDrivers={setDrivers} drivers={drivers} user={props.user}/>]))
                            }}>+ Driver</button>
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