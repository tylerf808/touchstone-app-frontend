import '../signUpStyles.css'
import { useEffect } from 'react'

export default function ConfirmDetails({ userInfo, newCosts, drivers, currentSlide, setCurrentSlide, createAccount, dispatcher, tractors }) {

    useEffect(() => {
        console.log(tractors)
    }, [])

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
                </div>
                <div className='detailsRow'>
                    <div className='detailsGroup'>
                        <p className='detailsGroupLabel'>Tractors</p>
                        <div className="detailsItemGroup">
                            {tractors.map((tractor, i) => {
                                return (
                                    <div className="driverItem" key={i}>
                                        <p className="driverLabel">Driver {i + 1}</p>
                                        <div className="displayDriver">
                                            <p className="driverDetailsLabel">MPG:</p>
                                            <p className="driverValue">{tractor.mpg}</p>
                                            <p className='driverDetailsLabel'>Internal Num:</p>
                                            <p className="driverValue">{tractor.internalNum}</p>
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
                                <p className="detailsValue">{newCosts.laborRate}%</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Payroll Tax</p>
                                <p className="detailsValue">{newCosts.payrollAmount}%</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Dispatch Fee</p>
                                <p className="detailsValue">{newCosts.dispatchAmount}%</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Factor Fee</p>
                                <p className="detailsValue">{newCosts.factorAmount}%</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">MPG</p>
                                <p className="detailsValue">{newCosts.mpgAmount}</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Number of Tractors</p>
                                <p className="detailsValue">{newCosts.tractorNum}</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">ODC</p>
                                <p className="detailsValue">{newCosts.odcAmount}%</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Overhead</p>
                                <p className="detailsValue">{newCosts.overheadAmount}%</p>
                            </div>
                        </div>
                    </div>
                    <div className="detailsGroup">
                        <p className="detailsGroupLabel">Operational Costs</p>
                        <div className="detailsItemGroup">
                            <div className="detailsItem">
                                <p className="detailsLabel">Insurance Payment</p>
                                <p className="detailsValue">${newCosts.insuranceAmount}</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Tractor Lease</p>
                                <p className="detailsValue">${newCosts.tractorAmount}</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Trailer Lease</p>
                                <p className="detailsValue">${newCosts.trailerAmount}</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Repairs</p>
                                <p className="detailsValue">${newCosts.repairsAmount}</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Loan Payments</p>
                                <p className="detailsValue">${newCosts.loanAmount}</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">Parking</p>
                                <p className="detailsValue">${newCosts.parkingAmount}</p>
                            </div>
                            <div className="detailsItem">
                                <p className="detailsLabel">G&A</p>
                                <p className="detailsValue">${newCosts.gandaAmount}</p>
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