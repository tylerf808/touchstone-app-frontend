import '../signUpStyles.css'

export default function ConfirmDetails({ newAccount, newUsers, newTractors, operationalCosts, fixedCosts, newTractor }) {

    return (
        <div className="tab-content">
            <div className='input-label' style={{ justifySelf: 'center', alignSelf: 'center', marginBottom: '.5rem', fontSize: '1rem' }}>Confirm details and click submit to finalize your account</div>
            <div className="confirm-group">
                <p style={{ borderBottom: '.1rem solid #e0e0e0', marginBottom: '1rem', height: '2rem' }}>Operational Costs</p>
                <div className='confirm-row'>
                    <label className="input-label">Repairs cost in cents per mile</label>
                    <p>{operationalCosts.repairs}¢</p>
                </div>
                <div className='confirm-row'>
                    <label className="input-label">Monthly loan payment</label>
                    <p>${operationalCosts.loan}</p>
                </div>
                <div className='confirm-row'>
                    <label className="input-label">Monthly parking cost</label>
                    <p>${operationalCosts.parking}</p>
                </div>
                <div className='confirm-row'>
                    <label className="input-label">Monthly G&A cost</label>
                    <p>${operationalCosts.gAndA}</p>
                </div>
            </div>
            <div className="confirm-group">
                <p style={{ borderBottom: '.1rem solid #e0e0e0', marginBottom: '1rem', height: '2rem' }}>Fixed Costs</p>
                <div className='confirm-row'>
                    <label className="input-label">Labor rate as a percentage of revenue</label>
                    <p>{fixedCosts.labor}%</p>
                </div>
                <div className='confirm-row'>
                    <label className="input-label">Payroll tax rate</label>
                    <p>{fixedCosts.payroll}%</p>
                </div>
                <div className='confirm-row'>
                    <label className="input-label">Dispatch Fee as a percentage of revenue</label>
                    <p>{fixedCosts.dispatch}%</p>
                </div>
                <div className='confirm-row'>
                    <label className="input-label">Factor fee as a percentage of revenue</label>
                    <p>{fixedCosts.factor}%</p>
                </div>
                <div className='confirm-row'>
                    <label className="input-label">Other direct costs (ODC) as percentage of revenue</label>
                    <p>{fixedCosts.odc}%</p>
                </div>
                <div className='confirm-row'>
                    <label className="input-label">Overhead costs as a percentage of revenue</label>
                    <p>{fixedCosts.overhead}%</p>
                </div>
            </div>
            <div className="confirm-group">
                <p style={{ borderBottom: '.1rem solid #e0e0e0', marginBottom: '1rem', height: '2rem' }}>Users</p>
                {newUsers.map((user, i) => {
                    return (
                        <div style={{ width: '70%', justifySelf: 'center' }}>
                            <p style={{ justifySelf: 'center' }}>User {i + 1}</p>
                            <div className='confirm-row'>
                                <label className='input-label'>Name</label>
                                <p>{user.name}</p>
                            </div>
                            <div className='confirm-row'>
                                <label className='input-label'>Email</label>
                                <p>{user.email}</p>
                            </div>
                            <div className='confirm-row'>
                                <label className='input-label'>Account Type</label>
                                <p>{user.accountType}</p>
                            </div>
                        </div>)
                })}
            </div>
            <div className="confirm-group">
                <p style={{ borderBottom: '.1rem solid #e0e0e0', marginBottom: '1rem', height: '2rem' }}>Tractors</p>
                {newTractors.map((tractor, i) => {
                    return (
                        <div style={{ width: '70%', justifySelf: 'center' }}>
                            <p style={{ justifySelf: 'center' }}>Tractor {i + 1}</p>
                            <div className='confirm-row'>
                                <label className='input-label'>Internal Number</label>
                                <p>{tractor.internalNum}</p>
                            </div>
                            <div className='confirm-row'>
                                <label className='input-label'>VIN</label>
                                <p>{tractor.vin}</p>
                            </div>
                            
                            <div className='confirm-row'>
                                <label className='input-label'>MPG</label>
                                <p>{tractor.mpg}</p>
                            </div>
                            <div className='confirm-row'>
                                <label className='input-label'>Monthly Insurance</label>
                                <p>${tractor.insurance}</p>
                            </div>
                            <div className='confirm-row'>
                                <label className='input-label'>Tractor Lease</label>
                                <p>${tractor.tractorLease}</p>
                            </div>
                            <div className='confirm-row'>
                                <label className='input-label'>Trailer Lease</label>
                                <p>${tractor.trailerLease}</p>
                            </div>
                            <div className='confirm-row'>
                                <label className='input-label'>Height</label>
                                <p>Ft. {tractor.height.ft} In. {tractor.height.in}</p>
                            </div>
                            <div className='confirm-row'>
                                <label className='input-label'>Width</label>
                                <p>Ft. {tractor.width.ft} In. {tractor.width.in}</p>
                            </div>
                            <div className='confirm-row'>
                                <label className='input-label'>Weight</label>
                                <p>{tractor.weight} lbs.</p>
                            </div>
                        </div>)
                })}
            </div>
        </div>
    )
}