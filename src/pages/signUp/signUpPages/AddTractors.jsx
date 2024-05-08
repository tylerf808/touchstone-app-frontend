import { useState, useContext } from 'react'
import UserContext from '../../../helpers/Context'

export default function AddTractors({ tractors, setTractors, currentSlide, setCurrentSlide }) {
    const [numOfTractors, setNumOfTractors] = useState(1)
    const [tractorInputs, setTractorInputs] = useState([<DriverInput key={0} num={0} drivers={drivers} setDrivers={setDrivers}
        numOfDrivers={numOfDrivers} setNumOfTractors={setNumOfTractors} />])

    useEffect(() => {
        const newArray = []
        for (let i = 0; i < numOfDrivers; i++) {
            newArray.push(<DriverInput key={i} num={i} drivers={drivers} setDrivers={setDrivers} numOfDrivers={numOfDrivers}
                setNumOfTractors={setNumOfTractors} />)
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
                        <button className="addDriverBtn" onClick={() => setNumOfTractors(numOfDrivers + 1)}>+</button>
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
            </div>
            <div className="btnContainerSignUp">
                <button className="btnSignUp" onClick={() => {
                    setCurrentSlide(currentSlide - 1)
                }}>Back</button>
                <button className="btnSignUp" onClick={() => setCurrentSlide(currentSlide + 1)}>Next</button>
            </div>
        </div>
    )

    return (
        <div className="pageContainer">

        </div>
    )
}