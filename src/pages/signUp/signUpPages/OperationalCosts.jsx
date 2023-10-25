import { useEffect, useState } from "react"

export default function FourthPage(props) {

    const [isManager, setIsManager] = useState(false)

    useEffect(() => {
        if (props.accountType === 'admin') {
            setIsManager(true)
        }
    }, [])

    const checkForm = () => {
        props.setShowAlert(false)
        let missingItems
        const inputs = Array.from(document.getElementsByClassName('newCostInput'))
        inputs.forEach((el) => {
            if (el.value === '') {
                props.setAlertMsg('Missing an entry')
                props.setShowAlert(true)
                missingItems = true
                return
            }
        })
        if (missingItems !== true) {
            props.setCurrentSlide(props.currentSlide + 1)
        }
    }


    return (
        <div className="pageContainer">
            <div className="slider">
                <div className="slide">
                    <div className="slideTitle">
                        <h3>Operational Costs</h3>
                    </div>
                    <div className="slideInputs">
                        <div className="slideItem">
                            <div className="slideLabelContainerCreateAcct">
                                <p className="slideLabel">Select your Insurance payment frequency</p>
                            </div>
                            <select className="newCostInput" defaultValue={props.insuranceType} onChange={(e) => props.setInsuranceType(e.target.value)}>
                                <option value='monthly' className="selectOption" type="radio" name="insuranceType">Monthly</option>
                                <option value='bi-monthly' className="selectOption" type="radio" name="insuranceType">Bi-Monthly</option>
                                <option value='quarterly' className="selectOption" type="radio" name="insuranceType">Quarterly</option>
                                <option value='annually' className="selectOption" type="radio" name="insuranceType">Annually</option>
                            </select>
                        </div>
                        <div className="slideItem">
                            <div className="slideLabelContainer">
                                <p className="slideLabel">Enter your Insurance payment</p>
                            </div>
                            <input className="newCostInput" type="number" onChange={(e) => props.setInsuranceAmount(e.target.value)} />
                        </div>
                        <div className="slideItem">
                            <div className="slideLabelContainer">
                                <p className="slideLabel">Enter your monthly trailer lease payment</p>
                            </div>
                            <input className="newCostInput" type="number" onChange={(e) => props.setTrailerAmount(e.target.value)} />
                        </div>
                        <div className="slideItem">
                            <div className="slideLabelContainer">
                                <p className="slideLabel">Enter your monthly tractor lease payment</p>
                            </div>
                            <input className="newCostInput" type="number" onChange={(e) => props.setTractorAmount(e.target.value)} />
                        </div>
                        <div className="slideItem">
                            <div className="slideLabelContainer">
                                <p className="slideLabel">Enter your monthly parking cost</p>
                            </div>
                            <input className="newCostInput" type="number" onChange={(e) => props.setParkingAmount(e.target.value)} />
                        </div>
                        <div className="slideItem">
                            <div className="slideLabelContainer">
                                <p className="slideLabel">Enter your monthly G&A cost</p>
                            </div>
                            <input className="newCostInput" type="number" onChange={(e) => props.setGandaAmount(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="btnContainerSignUp">
                <button className="btnSignUp" onClick={() => {
                    props.setShowAlert(false)
                    props.setCurrentSlide(props.currentSlide - 1)
                }}>Back</button>
                {isManager ?
                    <button className="btnSignUp" onClick={() => {
                        checkForm()
                    }}>Next</button>
                    :
                    <button className="btnSignUp" onClick={() => {
                        checkForm()
                        props.createAccount(props.accountType)
                    }}>Submit</button>
                }
            </div>
        </div>
    )
}