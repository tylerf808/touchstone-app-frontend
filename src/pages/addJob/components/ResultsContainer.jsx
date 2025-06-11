import { useState } from "react"
import formatUSD from "../../../helpers/currencyFormatter"

export default function ResultsContainer({ addJob, job, setJob, setShowResults }) {


    const profitableStyle = {
        color: job?.profitable ? 'green' : 'red'
    }

    return (
        <div className="results-container">
            <div className="results-header">
                {job?.profitable ?
                    <h2 style={profitableStyle} >PROFITABLE</h2>
                    :
                    <h2 style={profitableStyle}>NOT PROFITABLE</h2>
                }
            </div>
            <div className="results-group">
                <div className="results-row">
                    <p style={{marginRight: '3rem'}}>Revenue:</p>
                    <p>{formatUSD(job?.revenue)}</p>
                </div>
                <div className="results-row">
                    <p>Dispatch:</p>
                    <p>{formatUSD(job?.dispatch)}</p>
                </div>
                <div className="results-row">
                    <p>Factor:</p>
                    <p>{formatUSD(job?.factor)}</p>
                </div>
                <div className="results-row">
                    <p>G&A:</p>
                    <p>{formatUSD(job?.gAndA)}</p>
                </div>
                <div className="results-row">
                    <p>Fuel:</p>
                    <p>{formatUSD(job?.gasCost)}</p>
                </div>
                <div className="results-row">
                    <p>Labor:</p>
                    <p>{formatUSD(job?.labor)}</p>
                </div>
                <div className="results-row">
                    <p>ODC:</p>
                    <p>{formatUSD(job?.odc)}</p>
                </div>
                <div className="results-row">
                    <p>Parking:</p>
                    <p>{formatUSD(job?.parking)}</p>
                </div>
                <div className="results-row">
                    <p>Payroll Tax:</p>
                    <p>{formatUSD(job?.payrollTax)}</p>
                </div>
                <div className="results-row">
                    <p>Rate Per Mile:</p>
                    <p>{formatUSD(job?.ratePerMile)}</p>
                </div>
                <div className="results-row">
                    <p>Repairs:</p>
                    <p>{formatUSD(job?.repairs)}</p>
                </div>
                <div className="results-row">
                    <p>Tolls:</p>
                    <p>{formatUSD(job?.tolls)}</p>
                </div>
                <div className="results-row">
                    <p>Tractor Lease:</p>
                    <p>{formatUSD(job?.tractorLease)}</p>
                </div>
                <div className="results-row">
                    <p>Trailer Lease:</p>
                    <p>{formatUSD(job?.trailerLease)}</p>
                </div>
                <div className="results-row">
                    <p>Total Costs:</p>
                    <p>{formatUSD(job?.totalCost)}</p>
                </div>
                <div className="results-row">
                    <p>Total Fixed Costs:</p>
                    <p>{formatUSD(job?.totalFixedCost)}</p>
                </div>
                <div className="results-row">
                    <p style={{marginRight: '3rem'}}>Gross Profit:</p>
                    <p>{formatUSD(job?.grossProfit)}</p>
                </div>
                <div className="results-row">
                    <p style={{marginRight: '3rem'}}>Operating Profit:</p>
                    <p>{formatUSD(job?.operatingProfit)}</p>
                </div>
                <div className="results-row">
                    <p style={{marginRight: '3rem'}}>Net Profit:</p>
                    <p>{formatUSD(job?.netProfit)}</p>
                </div>
                <div className="results-row">
                    <p style={{marginRight: '3rem'}}>Gross Profit %:</p>
                    <p>{job?.grossProfitPercentage}</p>
                </div>
                <div className="results-row">
                    <p style={{marginRight: '3rem'}}>Operating Profit %:</p>
                    <p>{job?.operatingProfitPercentage}</p>
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <button className="calc-route-button" onClick={(e) => {
                    e.preventDefault()
                    addJob()
                    setShowResults(false)
                }}>Add Job</button>
                <button className="calc-route-button"  onClick={(e) => {
                    e.preventDefault()
                    setJob(null)
                    setShowResults(false)
                }}>Cancel</button>
            </div>
        </div>
    )
}