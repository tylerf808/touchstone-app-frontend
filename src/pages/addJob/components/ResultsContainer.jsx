import { useState } from "react"
import { CircularProgress } from "@mui/material"
import formatUSD from "../../../helpers/currencyFormatter"

export default function ResultsContainer({ profitable, job, loaded, setLoaded, setIsExpanded, isExpanded }) {

    console.log(job)

    return (
        <div className="results-container">
            {loaded ?
                <div className="results-info">
                    <div className="results-row">
                        <p>Profitable: {(job?.profitable).toString()}</p>
                    </div>
                    <div className="results-row">
                        <p>Start: {job?.start}</p>
                    </div>
                    <div className="results-row">
                        <p>Pick Up: {job?.pickUp}</p>
                    </div>
                    <div className="results-row">
                        <p>Drop Off: {job?.dropOff}</p>
                    </div>
                    <div className="results-row">
                        <p>Distance: {job?.distance} miles</p>
                    </div>
                    <div className="results-row">
                        <p>Drive Time: {job?.driveTime}</p>
                    </div>
                    <div className="results-row">
                        <p>Revenue: {formatUSD(job?.revenue)}</p>
                    </div>
                    <div className="results-row">
                        <p>Dispatch: {formatUSD(job?.dispatch)}</p>
                    </div>
                    <div className="results-row">
                        <p>Factor: {formatUSD(job?.factor)}</p>
                    </div>
                    <div className="results-row">
                        <p>G&A: {formatUSD(job?.gAndA)}</p>
                    </div>
                    <div className="results-row">
                        <p>Fuel: {formatUSD(job?.gasCost)}</p>
                    </div>
                    <div className="results-row">
                        <p>Labor: {formatUSD(job?.labor)}</p>
                    </div>
                    <div className="results-row">
                        <p>ODC: {formatUSD(job?.odc)}</p>
                    </div>
                    <div className="results-row">
                        <p>Parking: {formatUSD(job?.parking)}</p>
                    </div>
                    <div className="results-row">
                        <p>Payroll Tax: {formatUSD(job?.payrollTax)}</p>
                    </div>
                    <div className="results-row">
                        <p>Rate Per Mile: {formatUSD(job?.ratePerMile)}</p>
                    </div>
                    <div className="results-row">
                        <p>Repairs: {formatUSD(job?.repairs)}</p>
                    </div>
                    <div className="results-row">
                        <p>Tolls: {formatUSD(job?.tolls)}</p>
                    </div>
                    <div className="results-row">
                        <p>Tractor Lease: {formatUSD(job?.tractorLease)}</p>
                    </div>
                    <div className="results-row">
                        <p>Trailer Lease: {formatUSD(job?.trailerLease)}</p>
                    </div>
                    <div className="results-row">
                        <p>Total Costs: {formatUSD(job?.totalCost)}</p>
                    </div>
                    <div className="results-row">
                        <p>Fixed Costs: {formatUSD(job?.totalFixedCosts)}</p>
                    </div>
                    <div className="results-row">
                        <p>Gross Profit: {formatUSD(job?.grossProfit)}</p>
                    </div>
                    <div className="results-row">
                        <p>Operating Profit: {formatUSD(job?.operatingProfit)}</p>
                    </div>
                    <div className="results-row">
                        <p>Net Profit: {formatUSD(job?.netProfit)}</p>
                    </div>
                    <div className="results-row">
                        <p>Gross Profit Percentage: {job?.grossProfitPercentage}%</p>
                    </div>
                    <div className="results-row">
                        <p>Operating Profit Percentage: {job?.operatingProfitPercentage}%</p>
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