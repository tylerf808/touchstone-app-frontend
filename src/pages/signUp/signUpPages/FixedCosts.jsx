

export default function ThirdPage(props) {

    const checkForm = () => {
        props.setShowAlert(false)
        let missingItems
        const inputs = Array.from(document.getElementsByClassName('newCostInputPercent'))
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
            <div className="slideTitle">
                <h3>Fixed Costs</h3>
            </div>
            <div className="fixedCostsSlide">
                <div className="slideItemGroup">
                    <p className="slideGroupLabel">Labor & Tax</p>
                    <div className="slideItem">
                        <p className="slideLabel">Enter your labor rate as a percentage of revenue.</p>
                        <div className="slideInputContainer">
                            <input defaultValue={props.laborAmount} className="newCostInputPercent" type="number" onChange={(e) => props.setLaborAmount(e.target.value)} />
                            <p className="percentageSign">%</p>
                        </div>
                    </div>
                    <div className="slideItem">
                        <p className="slideLabel">Enter your payroll tax rate.</p>
                        <div className="slideInputContainer">
                            <input defaultValue={props.payrollAmount} className="newCostInputPercent" type="number" onChange={(e) => props.setPayrollAmount(e.target.value)} />
                            <p className="percentageSign">%</p>
                        </div>
                    </div>
                </div>
                <div className="slideItemGroup">
                    <p className="slideGroupLabel">Fees</p>
                    <div className="slideItem">
                        <p className="slideLabel">Enter your dispatch fee as a percentage of revenue.</p>
                        <div className="slideInputContainer">
                            <input defaultValue={props.dispatchAmount} className="newCostInputPercent" type="number" onChange={(e) => props.setDispatchAmount(e.target.value)} />
                            <p className="percentageSign">%</p>
                        </div>
                    </div>
                    <div className="slideItem">
                        <p className="slideLabel">Enter your factor fee as a percentage of revenue.</p>
                        <div className="slideInputContainer">
                            <input defaultValue={props.factorAmount} className="newCostInputPercent" type="number" onChange={(e) => props.setFactorAmount(e.target.value)} />
                            <p className="percentageSign">%</p>
                        </div>
                    </div>
                </div>
                <div className="slideItemGroup">
                    <p className="slideGroupLabel">Tractor Details</p>
                    <div className="slideItem">
                        <p className="slideLabel">Enter your MPG.</p>
                        <div className="slideInputContainer">
                            <input defaultValue={props.mpgAmount} className="newCostInput" type="number" onChange={(e) => props.setMpgAmount(e.target.value)} />
                        </div>
                    </div>
                    <div className="slideItem">
                        <p className="slideLabel">Enter number of tractors (It will calculate per tractor).</p>
                        <div className="slideInputContainer">
                            <input defaultValue={props.tractorNum} className="newCostInput" type="number" onChange={(e) => props.setTractorNum(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="slideItemGroup">
                    <p className="slideGroupLabel">Other</p>
                    <div className="slideItem">
                        <p className="slideLabel">Enter your other direct costs (ODC) as a percentage of revenue.</p>
                        <div className="slideInputContainer">
                            <input defaultValue={props.odcAmount} className="newCostInputPercent" type="number" onChange={(e) => props.setOdcAmount(e.target.value)} />
                            <p className="percentageSign">%</p>
                        </div>
                    </div>
                    <div className="slideItem">
                        <p className="slideLabel">Enter your overhead as a percentage of revenue.</p>
                        <div className="slideInputContainer">
                            <input defaultValue={props.overheadAmount} className="newCostInputPercent" type="number" onChange={(e) => props.setOverheadAmount(e.target.value)} />
                            <p className="percentageSign">%</p>
                        </div>
                    </div>
                </div>
                <div className="btnContainerSignUp">
                    <button className="btnSignUp" onClick={() => {
                        props.setShowAlert(false)
                        props.setCurrentSlide(props.currentSlide - 1)
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