import { useState, useContext, useEffect } from 'react'
import TractorInput from '../../../components/TractorInput'

export default function AddTractors({ tractors, setTractors, currentSlide, setCurrentSlide }) {

    const [numOfTractors, setNumOfTractors] = useState(1)
    const [tractorInputs, setTractorInputs] = useState([<TractorInput key={0} num={0} tractors={tractors} setTractors={setTractors}
        numOfTractors={numOfTractors} setNumOfTractors={setNumOfTractors} />])

    useEffect(() => {
        const newArray = []
        for (let i = 0; i < numOfTractors; i++) {
            newArray.push(<TractorInput key={i} num={i} tractors={tractors} setTractors={setTractors} numOfTractors={numOfTractors}
                setNumOfTractors={setNumOfTractors} />)
        }
        setTractorInputs(newArray)
    }, [numOfTractors])


    return (
        <div className="pageContainer">
            <div className="slideTitle">
                <h3 style={{ color: 'orange' }}>Add Tractors</h3>
            </div>
            <div className="addDriversSlide">
                <p className="addDriversInstructions">Enter the information for your Tractors. Click the plus icon at the bottom to add more.</p>
                <div className="drivers">
                    {tractorInputs}
                    <div className="addDriverBtnContainer">
                        <button className="addDriverBtn" onClick={() => setNumOfTractors(numOfTractors + 1)}>+</button>
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
}