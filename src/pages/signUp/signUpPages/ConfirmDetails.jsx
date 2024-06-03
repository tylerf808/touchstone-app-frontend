import '../signUpStyles.css'

export default function ConfirmDetails({ userInfo, costs, drivers, currentSlide, setCurrentSlide, createAccount, dispatcher }) {

    return (
        <div className="pageContainer">
            <div className='slideTitle'>
                <h3 style={{ color: 'orange' }}>Confirm Details</h3>
            </div>
            <div className='confirmDetailsSlide'>
                <div className='detailsRow'>
                    <div className="detailsGroup">
                        <p className="detailsGroupLabel">User Details</p>
                        <div className="detailsItemGroup">
                            <div className="detailsItem">
                                <p className="detailsLabel">Email: </p>
                                <p className="detailsValue">{userInfo.email}</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Username: </p>
                                <p className="detailsValue">{userInfo.username}</p>
                            </div>
                        </div>
                    </div>
                    <div className="detailsGroup">
                        <p className="detailsGroupLabel">Drivers</p>
                        <div className="detailsItemGroup">
                            {drivers.map((driver, i) => {
                                return (
                                    <div className="driverItem" key={i}>
                                        <p className="driverLabel">Driver {i + 1}</p>
                                        <div className="displayDriver">
                                            <p className="driverDetailsLabel">Name:</p>
                                            <p className="driverValue">{driver.name}</p>
                                            <p className='driverDetailsLabel'>Email:</p>
                                            <p className="driverValue">{driver.name}</p>
                                        </div>
                                    </div>)
                            })}
                        </div>
                    </div>
                    <div className='detailsGroup'>
                        <p className='detailsGroupLabel'>Dispatcher</p>
                        <div className='detailsItemGroup'>
                            <div className='detailsItem'>
                                <p className='detailsLabel'>Email: </p>
                                <p className='detailsValue'>{dispatcher.email}</p>
                            </div>
                            <div className='detailsItem'>
                                <p className='detailsLabel'>Username: </p>
                                <p className='detailsValue'>{dispatcher.username}</p>
                            </div>
                            <div className='detailsItem'>
                                <p className='detailsLabel'>Name: </p>
                                <p className='detailsValue'>{dispatcher.name}</p>
                            </div>
                            <div className='detailsItem'>
                                <p className='detailsLabel'>Company: </p>
                                <p className='detailsValue'>{dispatcher.company}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='detailsRow'>
                    <div className="detailsGroup">
                        <p className="detailsGroupLabel">Fixed Costs</p>
                        <div className="detailsItemGroup">
                            <div className="detailsItem">
                                <p className="detailsLabel">Labor Rate</p>
                                <p className="detailsValue">{costs.laborRate}%</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Payroll Tax</p>
                                <p className="detailsValue">{costs.payrollAmount}%</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Dispatch Fee</p>
                                <p className="detailsValue">{costs.dispatchAmount}%</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Factor Fee</p>
                                <p className="detailsValue">{costs.factorAmount}%</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">MPG</p>
                                <p className="detailsValue">{costs.mpgAmount}</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Number of Tractors</p>
                                <p className="detailsValue">{costs.tractorNum}</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">ODC</p>
                                <p className="detailsValue">{costs.odcAmount}%</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Overhead</p>
                                <p className="detailsValue">{costs.overheadAmount}%</p>
                            </div>
                        </div>
                    </div>
                    <div className="detailsGroup">
                        <p className="detailsGroupLabel">Operational Costs</p>
                        <div className="detailsItemGroup">
                            <div className="detailsItem">
                                <p className="detailsLabel">Insurance Payment</p>
                                <p className="detailsValue">${costs.insuranceAmount}</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Tractor Lease</p>
                                <p className="detailsValue">${costs.tractorAmount}</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Trailer Lease</p>
                                <p className="detailsValue">${costs.trailerAmount}</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Repairs</p>
                                <p className="detailsValue">${costs.repairsAmount}</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Loan Payments</p>
                                <p className="detailsValue">${costs.loanAmount}</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Parking</p>
                                <p className="detailsValue">${costs.parkingAmount}</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">G&A</p>
                                <p className="detailsValue">${costs.gandaAmount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='progressContainer'>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='currentDot'></span>
            </div>
            <div className="signUpSlideControls">
                <div className="btnContainerSignUp">
                    <button className="btnSignUp" onClick={() => {
                        setCurrentSlide(currentSlide - 1)
                    }}>Back</button>
                    <button className="btnSignUp" onClick={() => {
                        createAccount()
                    }}>Submit</button>
                </div>
            </div>
        </div>
    )
}