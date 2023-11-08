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
            if (isManager === true) {
                props.setCurrentSlide(props.currentSlide + 1)
            } else {
                props.setCurrentSlide(props.currentSlide + 2)
            }
        }
    }

    return (
        <div className="pageContainer">
            <div className="slideTitle">
                <h3>Operational Costs</h3>
            </div>
            <div className="operationalCostsSlide">
                <div className="slideItemGroup">
                    <p className="slideGroupLabel">Insurance</p>
                    <div className="slideItem">
                        <div className="slideLabelContainer">
                            <p className="slideLabel">Enter your annual Insurance payment (it will calculate per tractor).</p>
                        </div>
                        <div className="slideInputContainer">
                            <input defaultValue={props.insuranceAmount} className="newCostInput" type="number" onChange={(e) => props.setInsuranceAmount(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="slideItemGroup">
                    <p className="slideGroupLabel">Tractor & Trailer</p>
                    <div className="slideItem">
                        <div className="slideLabelContainer">
                            <p className="slideLabel">Enter your monthly trailer lease payment</p>
                        </div>
                        <div className="slideInputContainer">
                            <input defaultValue={props.trailerAmount} className="newCostInput" type="number" onChange={(e) => props.setTrailerAmount(e.target.value)} />
                        </div>
                    </div>
                    <div className="slideItem">
                        <div className="slideLabelContainer">
                            <p className="slideLabel">Enter your monthly tractor lease payment</p>
                        </div>
                        <div className="slideInputContainer">
                            <input defaultValue={props.tractorAmount} className="newCostInput" type="number" onChange={(e) => props.setTractorAmount(e.target.value)} />
                        </div>
                    </div>
                    <div className="slideItem">
                        <div className="slideLabelContainer">
                            <p className="slideLabel">Enter your average monthly spending on repairs for all tractors.</p>
                        </div>
                        <div className="slideInputContainer">
                            <input defaultValue={props.repairsAmount} className="newCostInput" type="number" onChange={(e) => props.setRepairsAmount(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="slideItemGroup">
                    <p className="slideGroupLabel">Other</p>
                    <div className="slideItem">
                        <div className="slideLabelContainer">
                            <p className="slideLabel">Enter your monthly loan payments if any.</p>
                        </div>
                        <div className="slideInputContainer">
                            <input defaultValue={props.loanAmount} className="newCostInput" type="number" onChange={(e) => props.setLoanAmount(e.target.value)} />
                        </div>
                    </div>
                    <div className="slideItem">
                        <div className="slideLabelContainer">
                            <p className="slideLabel">Enter your monthly parking cost</p>
                        </div>
                        <div className="slideInputContainer">
                            <input defaultValue={props.parkingAmount} className="newCostInput" type="number" onChange={(e) => props.setParkingAmount(e.target.value)} />
                        </div>
                    </div>
                    <div className="slideItem">
                        <div className="slideLabelContainer">
                            <p className="slideLabel">Enter your monthly G&A cost</p>
                        </div>
                        <div className="slideInputContainer">
                            <input defaultValue={props.gandaAmount} className="newCostInput" type="number" onChange={(e) => props.setGandaAmount(e.target.value)} />
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
        </div>
    )
}