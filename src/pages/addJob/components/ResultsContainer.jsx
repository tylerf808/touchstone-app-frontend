import { CheckCircle, Truck, CircleX } from 'lucide-react';
import formatUSD from "../../../helpers/currencyFormatter"

export default function ResultsContainer({ addJob, job, setJob, setShowResults }) {

    const profitableStyle = {
        color: job?.profitable ? 'green' : 'red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }

    return (
        <div className="results-container">
            <div className="main-details-banner">
                <div className="banner-card">
                    {job.profitable ?
                        <h3 style={profitableStyle} >
                            <CheckCircle className="text-green-500" style={{ marginRight: '.5rem' }} /> PROFITABLE
                        </h3>
                        :
                        <h3 style={profitableStyle}><CircleX className="text-red-500" style={{ marginRight: '.5rem' }} />NOT PROFITABLE</h3>}
                    <h2 style={{ marginTop: '.5rem' }}>{formatUSD(job?.netProfit)}</h2>
                </div>
                <div className="banner-card" style={{ marginLeft: '.5rem', marginRight: '.5rem' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center' }}>
                        <Truck style={{ marginRight: '.5rem' }} className="text-orange-500" />Rate Per Mile
                    </h3>
                    <h2 style={{ marginTop: '.5rem' }}>{formatUSD(job.ratePerMile)}</h2>
                </div>
                <div className="banner-card">
                    <h3>Total Cost</h3>
                    <h2 style={{ marginTop: '.5rem' }}>{formatUSD(job?.totalCost)}</h2>
                </div>
            </div>
            <div className="breakdown-container">
                <div className="revenue-expenses">
                    <h2 style={{ padding: '1rem', marginLeft: '1rem' }}>Revenue & Expenses</h2>
                    <div style={{
                        borderTop: '.1rem solid lightgrey', borderBottom: '.1rem solid lightgrey',
                        padding: '.2rem'
                    }} className="results-row">
                        <p>Revenue</p>
                        <p>{formatUSD(job?.revenue)}</p>
                    </div>
                    <div className="results-row">
                        <p style={{ justifySelf: 'flex-start' }}>Direct Costs</p>
                    </div>
                    <div className="results-row">
                        <p style={{ marginLeft: '1.2rem' }}>Labor</p>
                        <p>{formatUSD(job?.labor)}</p>
                    </div>
                    <div className="results-row">
                        <p style={{ marginLeft: '1.2rem' }}>Payroll Tax</p>
                        <p>{formatUSD(job?.payrollTax)}</p>
                    </div>
                    <div className="results-row">
                        <p style={{ marginLeft: '1.2rem' }}>Dispatch</p>
                        <p>{formatUSD(job?.dispatch)}</p>
                    </div>
                    <div className="results-row">
                        <p style={{ marginLeft: '1.2rem' }}>Factor</p>
                        <p>{formatUSD(job?.factor)}</p>
                    </div>
                    <div className="results-row">
                        <p style={{ marginLeft: '1.2rem' }}>Fuel</p>
                        <p>{formatUSD(job?.gasCost)}</p>
                    </div>
                    <div className="results-row">
                        <p style={{ marginLeft: '1.2rem' }}>Tolls</p>
                        <p>{formatUSD(job?.tolls)}</p>
                    </div>
                    <div className="results-row">
                        <p style={{ marginLeft: '1.2rem' }}>ODC</p>
                        <p>{formatUSD(job?.odc)}</p>
                    </div>
                    <div style={{
                        borderTop: '.1rem solid lightgrey', borderBottom: '.1rem solid lightgrey',
                        padding: '.2rem'
                    }} className='results-row'>
                        <p style={{ marginLeft: '2rem' }}>Subtotal - Direct</p>
                        <p>{formatUSD(job.labor + job.payrollTax + job.dispatch + job.factor + job.gasCost + job.tolls + job.odc)}</p>
                    </div>
                    <div className='results-row'>
                        <p style={{ justifySelf: 'flex-start' }}>Fixed Costs</p>
                    </div>
                    <div className="results-row">
                        <p style={{ marginLeft: '1.2rem' }}>Tractor Lease</p>
                        <p>{formatUSD(job?.tractorLease)}</p>
                    </div>
                    <div className="results-row">
                        <p style={{ marginLeft: '1.2rem' }}> Trailer Lease</p>
                        <p>{formatUSD(job?.trailerLease)}</p>
                    </div>
                    <div className='results-row'>
                        <p style={{ marginLeft: '1.2rem' }}>Insurance</p>
                        <p>{formatUSD(job.insurance)}</p>
                    </div>
                    <div style={{
                        borderTop: '.1rem solid lightgrey', borderBottom: '.1rem solid lightgrey',
                        padding: '.2rem'
                    }} className='results-row'>
                        <p style={{ marginLeft: '2rem' }}>Subtotal - Fixed</p>
                        <p>{formatUSD(job.tractorLease = job.tractorLease + job.insurance)}</p>
                    </div>
                    <div className='results-row'>
                        <p style={{ justifySelf: 'flex-start' }}>Other Costs</p>
                    </div>
                    <div className="results-row">
                        <p style={{ marginLeft: '1.2rem' }}>Overhead</p>
                        <p>{formatUSD(job?.overhead)}</p>
                    </div>
                    <div className="results-row">
                        <p style={{ marginLeft: '1.2rem' }}>Parking</p>
                        <p>{formatUSD(job?.parking)}</p>
                    </div>
                    <div className="results-row">
                        <p style={{ marginLeft: '1.2rem' }}>Repairs</p>
                        <p>{formatUSD(job?.repairs)}</p>
                    </div>
                    <div style={{
                        borderTop: '.1rem solid lightgrey', borderBottom: '.1rem solid lightgrey',
                        padding: '.2rem'
                    }} className='results-row'>
                        <p style={{ marginLeft: '2rem' }}>Subtotal - Other</p>
                        <p>{formatUSD(job.overhead + job.parking + job.repairs)}</p>
                    </div>
                </div>
                <div className="profit-summary">
                    <h2 style={{ padding: '1rem', marginLeft: '1rem' }}>Profit Summary</h2>
                    <div className="results-row">
                        <p>Gross Profit</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '10rem' }}>
                            <p>{formatUSD(job?.grossProfit)}</p>
                            <p>{job?.grossProfitPercentage}</p>
                        </div>
                    </div>
                    <div className="results-row">
                        <p>Operating Profit</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '10rem' }}>
                            <p>{formatUSD(job?.operatingProfit)}</p>
                            <p>{job?.operatingProfitPercentage}</p>
                        </div>
                    </div>
                    <div className="results-row">
                        <p>Net Profit</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '10rem' }}>
                            <p>{formatUSD(job?.netProfit)}</p>
                            <p>{job?.netProfitPercentage}</p>
                        </div>
                    </div>
                    <h2 style={{ padding: '1rem', marginLeft: '1rem', marginTop: '1rem' }}>Other</h2>
                    <div className='results-row'>
                        <p>Distance</p>
                        <p>{job?.distance.toFixed(2)} Miles</p>
                    </div>
                    <div className='results-row'>
                        <p>Drive Time</p>
                        <p>{job?.driveTime}</p>
                    </div>
                    <div className="results-row">
                        <p>Rate Per Mile</p>
                        <p>{formatUSD(job?.ratePerMile)}</p>
                    </div>
                    <div style={{
                        marginTop: '20rem', display: 'flex', flexDirection: 'row',
                        justifyContent: 'space-evenly', alignItems: 'center'
                    }}>
                        <button className="add-route-button" onClick={(e) => {
                            e.preventDefault()
                            addJob()
                            setShowResults(false)
                        }}>Add Job</button>
                        <button className="cancel-route-button" onClick={(e) => {
                            e.preventDefault()
                            setJob(null)
                            setShowResults(false)
                        }}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}