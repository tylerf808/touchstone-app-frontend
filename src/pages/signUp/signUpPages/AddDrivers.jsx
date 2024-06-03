import { useState, useEffect } from "react"
import DriverInput from "../../../components/DriverInput"

export default function AddDrivers(props) {

    const [numOfDrivers, setNumOfDrivers] = useState(1)
    const [driverInputs, setDriverInputs] = useState([<DriverInput key={0} num={0} drivers={props.drivers} setDrivers={props.setDrivers}
        numOfDrivers={numOfDrivers} setNumDrivers={setNumOfDrivers} />])

    useEffect(() => {
        const newArray = []
        for (let i = 0; i < numOfDrivers; i++) {
            newArray.push(<DriverInput key={i} num={i} drivers={props.drivers} setDrivers={props.setDrivers} numOfDrivers={numOfDrivers}
                setNumDrivers={setNumOfDrivers} />)
        }
        setDriverInputs(newArray)
    }, [numOfDrivers])


    return (
        <div className="pageContainer">
            <div className="slideTitle">
                <h3 style={{ color: 'orange' }}>Add Drivers</h3>
            </div>
            <div className="addDriversSlide">
                <p className="addDriversInstructions">Enter the information for your drivers. Click the plus icon at the bottom to add more.</p>
                <div className="drivers">
                    {driverInputs}
                    <div className="addDriverBtnContainer">
                        <button className="addDriverBtn" onClick={() => setNumOfDrivers(numOfDrivers + 1)}>+</button>
                    </div>
                </div>
            </div>
            <div className='progressContainer'>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='currentDot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
            </div>
            <div className="btnContainerSignUp">
                <button className="btnSignUp" onClick={() => {
                    props.setCurrentSlide(props.currentSlide - 1)
                }}>Back</button>
                <button className="btnSignUp" onClick={() => props.setCurrentSlide(props.currentSlide + 1)}>Next</button>
            </div>
        </div>
    )
}