

export default function ThirdPage(props) {

    return (
        <div className="pageContainer">
            <div className="slider">
                <div className="slide">
                    <div className="slideTitle">
                        <h3>Fixed Costs</h3>
                    </div>
                    <div className="slideInputs">
                        <div className="slideItem">
                            <p className="slideLabel">Enter your labor rate as a percentage of revenue.</p>
                            <input className="newCostInput" type="number" onChange={(e) => props.setLaborAmount(e.target.value)} />
                        </div>
                        <div className="slideItem">
                            <p className="slideLabel">Enter your payroll tax rate as a percentage of revenue.</p>
                            <input className="newCostInput" type="number" onChange={(e) => props.setPayrollAmount(e.target.value)} />
                        </div>
                        <div className="slideItem">
                            <p className="slideLabel">Enter your dispatch fee as a percentage of revenue.</p>
                            <input className="newCostInput" type='number' onChange={(e) => props.setDispatchAmount(e.target.value)} />
                        </div>
                        <div className="slideItem">
                            <p className="slideLabel">Enter your factor fee as a percentage of revenue.</p>
                            <input className="newCostInput" type='number' onChange={(e) => props.setFactorAmount(e.target.value)} />
                        </div>
                        <div className="slideItem">
                            <p className="slideLabel">Enter your MPG.</p>
                            <input className="newCostInput" type="number" onChange={(e) => props.setMpgAmount(e.target.value)} />
                        </div>
                        <div className="slideItem">
                            <p className="slideLabel">Enter your other direct costs (ODC) as a monthly expense.</p>
                            <input className="newCostInput" type="number" onChange={(e) => props.setOdcAmount(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="btnContainerSignUp">
                <button className="btnSignUp" onClick={() => {
                    props.setShowAlert(false)
                    props.setCurrentSlide(props.currentSlide - 1)
                }}>Back</button>
                <button className="btnSignUp" onClick={() => {
                    props.setShowAlert(false)
                    if(props.laborAmount === 0 || props.payrollAmount === 0 || props.dispatchAmount === 0 || props.factorAmount ===0
                    || props.mpgAmount === 0 || props.odcAmount === 0){
                        props.setAlertMsg("Missing an entry")
                        props.setShowAlert(true)
                        return
                    }
                    props.setCurrentSlide(props.currentSlide + 1)
                }}>Next</button>
            </div>
        </div>
    )
}