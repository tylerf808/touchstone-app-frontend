import { useEffect, useState } from "react"

export default function FourthPage(props) {

    const [isManager, setIsManager] = useState(false)

    useEffect(() => {
        if (props.accountType === 'manager') {
            setIsManager(true)
        }
    }, [])

    const checkForm = () => {
        if (props.insuranceType === '' || props.insuranceAmount === '' ||
            props.trailerAmount === '' || props.setTractorAmount === '' ||
            props.parkingAmount === '' || props.gandaAmount === '') {
            return false
        } else {
            return true
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
                            <div className="radioMenu">
                                <div className="radioItem">
                                    <p className="radioLabel">Monthly</p>
                                    <input value='monthly' className="radioInput" type="radio" name="insuranceType"
                                        onClick={(e) => props.setInsuranceType(e.target.value)} />
                                </div>
                                <div className="radioItem">
                                    <p className="radioLabel">Bi-Monthly</p>
                                    <input value='bi-monthly' className="radioInput" type="radio" name="insuranceType"
                                        onClick={(e) => props.setInsuranceType(e.target.value)} />
                                </div>
                                <div className="radioItem">
                                    <p className="radioLabel">Quarterly</p>
                                    <input value='quarterly' className="radioInput" type="radio" name="insuranceType"
                                        onClick={(e) => props.setInsuranceType(e.target.value)} />
                                </div>
                                <div className="radioItem">
                                    <p className="radioLabel">Annually</p>
                                    <input value='annually' className="radioInput" type="radio" name="insuranceType"
                                        onClick={(e) => props.setInsuranceType(e.target.value)} />
                                </div>
                            </div>
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
                        props.setCurrentSlide(props.currentSlide + 1)
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