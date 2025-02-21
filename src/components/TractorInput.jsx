import { useState, useEffect } from "react"
import './tractorInputStyles.css'

export default function TractorInput({ num, tractors, setTractors, setNumOfTractors, numOfTractors }) {

    const [newMpg, setNewMpg] = useState('')
    const [newInsurance, setNewInsurance] = useState('')
    const [newVin, setNewVin] = useState('')
    const [newInternalNum, setInternalNum] = useState('')
    const [newHeight, setNewHeight] = useState('')
    const [newWidth, setNewWidth] = useState('')
    const [newWeight, setNewWeight] = useState('')
    const [isFirst, setIsFirst] = useState()

    const updateTractorInfo = () => {
        const currentTractor = {
            mpg: newMpg, insurance: newInsurance, vin: newVin, internalNum: newInternalNum, num: num, height: newHeight
            , weight: newWeight, width: newWidth
        }
        setTractors([...tractors, currentTractor])
    }

    useEffect(() => {
        if (num === 0) {
            setIsFirst(true)
        } else {
            setIsFirst(false)
        }
    }, [])

    return (
        <div className="tractorInputs">
            <div className="driverHeaderContainer" >
                <h3 style={{ color: 'orange', fontSize: '1.2rem', justifySelf: 'flex-end' }}>Tractor {num + 1}</h3>
                {isFirst ?
                    null
                    :
                    <span style={{ color: 'red' }} onClick={() => {
                        const newArray = tractors
                        newArray.pop()
                        setTractors(newArray)
                        setNumOfTractors(numOfTractors - 1)
                    }}>&#10006;</span>
                }
            </div>
            <div className="addTractorInputsContainer">
                <div className="addTractorsInputRow">
                    <div className="addDriversItem">
                        <p>MPG</p>
                        <input defaultValue={tractors[num]?.mpg} className="addDriversInput" type="number" onChange={(e) => {
                            setNewMpg(e.target.value)
                            updateTractorInfo()
                        }}></input>
                    </div>
                    <div className="addDriversItem">
                        <p>Annual Insurance Payment</p>
                        <input defaultValue={tractors[num]?.insurance} className="addDriversInput" type="number" onChange={(e) => {
                            setNewInsurance(e.target.value)
                            updateTractorInfo()
                        }}></input>
                    </div>
                </div>
                <div className="addTractorsInputRow">
                    <div className="addDriversItem">
                        <p>VIN</p>
                        <input defaultValue={tractors[num]?.vin} className="addDriversInput" type="number" onChange={(e) => {
                            setNewVin(e.target.value)
                            updateTractorInfo()
                        }}></input>
                    </div>
                    <div className="addDriversItem">
                        <p>Internal Number</p>
                        <input defaultValue={tractors[num]?.internalNum} className="addDriversPassword" type="number" onChange={(e) => {
                            setInternalNum(e.target.value)
                            updateTractorInfo()
                        }}></input>
                    </div>
                </div>
                <div className="addTractorsInputRow">
                    <div className="addDriversItem">
                        <p>Height in Feet and Inches (ft,in)</p>
                        <input placeholder="ft,in" defaultValue={tractors[num]?.height} className="addTractorNumber" type="number" onChange={(e) => {
                            setNewHeight(e.target.value)
                            updateTractorInfo()
                        }}></input>
                    </div>
                    <div className="addDriversItem">
                        <p>Width in Feet and Inches (ft,in)</p>
                        <input placeholder="ft,in" defaultValue={tractors[num]?.width} className="addTractorNumber" type="number" onChange={(e) => {
                            setNewWidth(e.target.value)
                            updateTractorInfo()
                        }}></input>
                    </div>
                    <div className="addDriversItem">
                        <p>Weight in Pounds</p>
                        <input defaultValue={tractors[num]?.weight} className="addTractorNumber" type="number" onChange={(e) => {
                            setNewWeight(e.target.value)
                            updateTractorInfo()
                        }}></input>
                    </div>

                </div>
            </div>
        </div>
    )
}