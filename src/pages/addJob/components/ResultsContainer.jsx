import { useState } from "react"
import { CircularProgress } from "@mui/material"
import formatUSD from "../../../helpers/currencyFormatter"

export default function ResultsContainer({ addJob, job, loaded, setLoaded, setIsExpanded, isExpanded, localMap }) {

    const [activeTab, setActiveTab] = useState("details-tab");

    const profitableStyle = {
        color: job?.profitable ? 'green' : 'red'
    }

    return (
        <div className="results-container">
            {loaded ?
                <div className="results-info">
                    <div className="results-header">
                        {job?.profitable ?
                            <h2 style={profitableStyle} >PROFITABLE</h2>
                            :
                            <h2 style={profitableStyle}>NOT PROFITABLE</h2>
                        }
                    </div>
                    <div className="results-tabs">
                        <button
                            className={activeTab === "details-tab" ? "active tab" : "tab"}
                            id="details-tab" onClick={(e) => {
                                e.preventDefault()
                                setActiveTab("details-tab")
                            }}>
                            Details
                        </button>
                        <button
                            className={activeTab === "route-tab" ? "active tab" : "tab"}
                            id="route-tab" onClick={(e) => {
                                e.preventDefault()
                                setActiveTab("route-tab")
                            }}>
                            Route
                        </button>
                    </div>
                    <div className="rows">
                        {activeTab === 'details-tab' &&
                            <div className="results-group">
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
                                    <p>Total Fixed Costs:</p>
                                    <p>{formatUSD(job?.totalFixedCost)}</p>
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
                            </div>}
                        {activeTab === 'route-tab' &&
                            <div className="route-group">
                                <div className="route-row">
                                    <p>Start:</p>
                                    <p>{job?.start}</p>
                                </div>
                                <div className="route-row">
                                    <p>Pick Up:</p>
                                    <p>{job?.pickUp}</p>
                                </div>
                                <div className="route-row">
                                    <p>Drop Off:</p>
                                    <p>{job?.dropOff}</p>
                                </div>
                                <div className="route-row">
                                    <p>Distance:</p>
                                    <p>{job?.distance} miles</p>
                                </div>
                                <div className="route-row">
                                    <p>Drive Time:</p>
                                    <p>{job?.driveTime}</p>
                                </div>
                            </div>}

                    </div>
                    <div className="addjob-btn-container" style={{
                        backgroundColor: "rgba(251, 251, 251, 0.912)",
                        width: '90%', justifySelf: 'center'
                    }}>
                        <button className="calc-route-button" onClick={(e) => {
                            e.preventDefault()
                            addJob()
                            setIsExpanded(false)
                        }}>Add Job</button>
                        <button className="calc-route-button" onClick={(e) => {
                            e.preventDefault()
                            document.getElementById("mapImage").src = localMap;
                            setIsExpanded(false)
                            setIsExpanded(false)
                        }}>Cancel</button>
                    </div>
                </div>

                :
                <>
                    <CircularProgress style={{ color: 'orange' }} />
                    <button className="calc-route-button">Cancel</button>
                </>
            }
        </div>
    )
}