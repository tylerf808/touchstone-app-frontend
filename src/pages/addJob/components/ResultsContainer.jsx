import { useState } from "react"
import { CircularProgress } from "@mui/material"
import formatUSD from "../../../helpers/currencyFormatter"

export default function ResultsContainer({ profitable, job, loaded, setLoaded, setIsExpanded, isExpanded }) {

    const profitableStyle = {
        color: job?.profitable ? 'green' : 'red'
    }

    return (
        <div className="results-container">
            {loaded ?
                <div className="results-info">
                    <div className="results-row">
                        <p>Profitable: </p>
                        <p style={profitableStyle}>{(job?.profitable).toString().toUpperCase()}</p>
                    </div>
                    <div className="results-row">
                        <p>Start:</p>
                        <p>{job?.start}</p>
                    </div>
                    <div className="results-row">
                        <p>Pick Up:</p>
                        <p>{job?.pickUp}</p>
                    </div>
                    <div className="results-row">
                        <p>Drop Off:</p>
                        <p>{job?.dropOff}</p>
                    </div>
                    <div className="results-row">
                        <p>Distance:</p>
                        <p>{job?.distance} miles</p>
                    </div>
                    <div className="results-row">
                        <p>Drive Time:</p>
                        <p>{job?.driveTime}</p>
                    </div>
                    <div className="results-row">
                        <p>Revenue:</p>
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
                        <p>Fixed Costs:</p>
                        <p>{formatUSD(job?.totalFixedCosts)}</p>
                    </div>
                    <div className="results-row">
                        <p>Gross Profit:</p>
                        <p>{formatUSD(job?.grossProfit)}</p>
                    </div>
                    <div className="results-row">
                        <p>Operating Profit:</p>
                        <p>{formatUSD(job?.operatingProfit)}</p>
                    </div>
                    <div className="results-row">
                        <p>Net Profit:</p>
                        <p>{formatUSD(job?.netProfit)}</p>
                    </div>
                    <div className="results-row">
                        <p>Gross Profit %:</p>
                        <p>{job?.grossProfitPercentage}%</p>
                    </div>
                    <div className="results-row">
                        <p>Operating Profit %:</p>
                        <p>{job?.operatingProfitPercentage}%</p>
                    </div>
                    <button className="calc-route-button" onClick={(e) => {
                        e.preventDefault()
                        setIsExpanded(false)
                    }}>Add Job</button>
                    <button className="calc-route-button" onClick={(e) => {
                        e.preventDefault()
                        setIsExpanded(false)
                    }}>Cancel</button>
                </div>
                :
                <>
                    <CircularProgress style={{ color: 'orange' }} />
                    <button className="calc-route-button" onClick={(e) => {
                        e.preventDefault()
                        setIsExpanded(false)
                    }}>Cancel</button>
                </>
            }
        </div>
    )
}