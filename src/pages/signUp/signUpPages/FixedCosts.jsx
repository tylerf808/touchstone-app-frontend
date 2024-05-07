import { useEffect, useState } from "react"

export default function ThirdPage({userInfo, costs, setCosts, setShowAlert, setAlertMsg, currentSlide, setCurrentSlide}) {

    const [isOwner, setIsOwner] = useState(true)

    const checkForm = () => {
        setShowAlert(false)
        let missingItems
        const inputs = Array.from(document.getElementsByClassName('newCostInputPercent'))
        inputs.forEach((el) => {
            if (el.value === '') {
                setAlertMsg('Missing an entry')
                setShowAlert(true)
                missingItems = true
                return
            }
        })
        if (missingItems !== true) {
            setCurrentSlide(currentSlide + 1)
        }
    }

    useEffect(() => {
        if(userInfo.accountType === 'admin'){
            setIsOwner(false)
        } else {
            setIsOwner(true)
        }
    }, [])

    return (
        <div className="pageContainer">
            <div className="slideTitle">
                <h3 style={{color: 'orange'}}>Fixed Costs</h3>
            </div>
            <div className="fixedCostsSlide">
                <div className="slideItemGroup">
                    {isOwner ?
                        <>
                            <p className="slideGroupLabel">Self-Employment Tax</p>
                            <div className="slideItem">
                                <p className="slideLabel">Federal self-employment tax as a percentage of profit (Cannot change).</p>
                                <div className="slideInputContainer">
                                    <p>15.3</p>
                                    <p className="percentageSign">%</p>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <p className="slideGroupLabel">Labor & Tax</p>
                            <div className="slideItem">
                                <p className="slideLabel">Enter your labor rate as a percentage of revenue.</p>
                                <div className="slideInputContainer">
                                    <input defaultValue={costs?.laborAmount} className="newCostInputPercent" type="number" onChange={(e) => {
                                        setCosts({...costs, laborAmount: e.target.value})
                                    }} />
                                    <p className="percentageSign">%</p>
                                </div>
                            </div>
                            <div className="slideItem">
                                <p className="slideLabel">Enter your payroll tax rate.</p>
                                <div className="slideInputContainer">
                                    <input defaultValue={costs?.payrollAmount} className="newCostInputPercent" type="number" onChange={(e) => {
                                        setCosts({...costs, payrollAmount: e.target.value})
                                    }} />
                                    <p className="percentageSign">%</p>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className="slideItemGroup">
                    <p className="slideGroupLabel">Fees</p>
                    <div className="slideItem">
                        <p className="slideLabel">Enter your dispatch fee as a percentage of revenue.</p>
                        <div className="slideInputContainer">
                            <input defaultValue={costs?.dispatchAmount} className="newCostInputPercent" type="number" onChange={(e) => {
                                        setCosts({...costs, dispatchAmount: e.target.value})
                                    }} />
                            <p className="percentageSign">%</p>
                        </div>
                    </div>
                    <div className="slideItem">
                        <p className="slideLabel">Enter your factor fee as a percentage of revenue.</p>
                        <div className="slideInputContainer">
                            <input defaultValue={costs?.factorAmount} className="newCostInputPercent" type="number" onChange={(e) => {
                                        setCosts({...costs, factorAmount: e.target.value})
                                    }} />
                            <p className="percentageSign">%</p>
                        </div>
                    </div>
                </div>
                <div className="slideItemGroup">
                    <p className="slideGroupLabel">Other</p>
                    <div className="slideItem">
                        <p className="slideLabel">Enter your other direct costs (ODC) as a percentage of revenue.</p>
                        <div className="slideInputContainer">
                            <input defaultValue={costs?.odcAmount} className="newCostInputPercent" type="number" onChange={(e) => {
                                        setCosts({...costs, odcAmount: e.target.value})
                                    }} />
                            <p className="percentageSign">%</p>
                        </div>
                    </div>
                    <div className="slideItem">
                        <p className="slideLabel">Enter your overhead as a percentage of revenue.</p>
                        <div className="slideInputContainer">
                            <input defaultValue={costs?.overheadAmount} className="newCostInputPercent" type="number" onChange={(e) => {
                                        setCosts({...costs, overheadAmount: e.target.value})
                                    }} />
                            <p className="percentageSign">%</p>
                        </div>
                    </div>
                </div>
                <div className='progressContainer'>
                    <span className='dot'></span>
                    <span className='dot'></span>
                    <span className='currentDot'></span>
                    <span className='dot'></span>
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
                        // props.setShowAlert(false)
                        checkForm()
                        // props.setCurrentSlide(props.currentSlide + 1)
                    }}>Next</button>
                </div>
            </div>
        </div>
    )
}