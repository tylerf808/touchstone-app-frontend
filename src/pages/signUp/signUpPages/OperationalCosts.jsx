import { useEffect, useState } from "react"

export default function FourthPage({ userInfo, costs, setCosts, setShowAlert, setAlertMsg, currentSlide, setCurrentSlide }) {

    const [isManager, setIsManager] = useState(false)

    useEffect(() => {
        if (userInfo.accountType === 'admin') {
            setIsManager(true)
        }
    }, [])

    useEffect(() => {
        console.log(costs)
    }, [costs])

    const checkForm = () => {
        setShowAlert(false)
        let missingItems
        const inputs = Array.from(document.getElementsByClassName('newCostInput'))
        inputs.forEach((el) => {
            if (el.value === '') {
                setAlertMsg('Missing an entry')
                setShowAlert(true)
                missingItems = true
                return
            }
        })
        if (missingItems !== true) {
            if (isManager === true) {
                setCurrentSlide(currentSlide + 1)
            } else {
                setCurrentSlide(currentSlide + 2)
            }
        }
    }

    return (
        <div className="pageContainer">
            <div className="slideTitle">
                <h3 style={{ color: 'orange' }}>Operational Costs</h3>
            </div>
            <div className="operationalCostsSlide">
                <div className="slideItemGroup">
                    <p className="slideGroupLabel">Insurance</p>
                    <div className="slideItem">
                        <div className="slideLabelContainer">
                            <p className="slideLabel">Enter your annual Insurance payment (it will calculate per tractor).</p>
                        </div>
                        <div className="slideInputContainer">
                            <p className="moneySign">$</p>
                            <input defaultValue={costs.insuranceAmount} className="newCostInput" type="number" onChange={(e) => {
                                setCosts({ ...costs, insuranceAmount: e.target.value })
                            }} />
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
                            <p className="moneySign">$</p>
                            <input defaultValue={costs.trailerAmount} className="newCostInput" type="number" onChange={(e) => {
                                setCosts({ ...costs, trailerAmount: e.target.value })
                            }} />
                        </div>
                    </div>
                    <div className="slideItem">
                        <div className="slideLabelContainer">
                            <p className="slideLabel">Enter your monthly tractor lease payment</p>
                        </div>
                        <div className="slideInputContainer">
                            <p className="moneySign">$</p>
                            <input defaultValue={costs.tractorAmount} className="newCostInput" type="number" onChange={(e) => {
                                setCosts({ ...costs, tractorAmount: e.target.value })
                            }} />
                        </div>
                    </div>
                    <div className="slideItem">
                        <div className="slideLabelContainer">
                            <p className="slideLabel">Enter your repairs costs in cents per mile (eg. 10 cents is .10).</p>
                        </div>
                        <div className="slideInputContainer">
                            <p className="moneySign">$</p>
                            <input defaultValue={costs.repairsAmount} className="newCostInput" type="number" onChange={(e) => {
                                setCosts({ ...costs, repairsAmount: e.target.value })
                            }} />
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
                            <p className="moneySign">$</p>
                            <input defaultValue={costs.loanAmount} className="newCostInput" type="number" onChange={(e) => {
                                setCosts({ ...costs, loanAmount: e.target.value })
                            }} />
                        </div>
                    </div>
                    <div className="slideItem">
                        <div className="slideLabelContainer">
                            <p className="slideLabel">Enter your monthly parking cost</p>
                        </div>
                        <div className="slideInputContainer">
                            <p className="moneySign">$</p>
                            <input defaultValue={costs.parkingAmount} className="newCostInput" type="number" onChange={(e) => {
                                setCosts({ ...costs, parkingAmount: e.target.value })
                            }} />
                        </div>
                    </div>
                    <div className="slideItem">
                        <div className="slideLabelContainer">
                            <p className="slideLabel">Enter your monthly G&A cost</p>
                        </div>
                        <div className="slideInputContainer">
                            <p className="moneySign">$</p>
                            <input defaultValue={costs.gandaAmount} className="newCostInput" type="number" onChange={(e) => {
                                setCosts({ ...costs, gandaAmount: e.target.value })
                            }} />
                        </div>
                    </div>
                </div>
                <div className='progressContainer'>
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
                        setShowAlert(false)
                        setCurrentSlide(currentSlide - 1)
                    }}>Back</button>
                    <button className="btnSignUp" onClick={() => {
                        checkForm()
                    }}>Next</button>
                </div>
            </div>
        </div>
    )
}