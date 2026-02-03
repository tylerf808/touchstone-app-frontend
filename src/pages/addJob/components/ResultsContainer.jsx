import { CheckCircle, Truck, CircleX } from 'lucide-react';
import { useState, useEffect } from 'react';
import MobileResults from './MobileResults';
import formatUSD from "../../../helpers/currencyFormatter"

export default function ResultsContainer({ addJob, job, results, setJob, setShowResults }) {

    const [isMobile, setIsMobile] = useState(false)
    const [selectedTab, setSelectedTab] = useState(0)

    useEffect(() => {
        if (window.visualViewport.width <= 1000) setIsMobile(true)
    }, [])

    // When results change, default-select the first tab and set the job
    useEffect(() => {
        if (results && results.length > 0) {
            setSelectedTab(0)
            setJob(results[0])
        } else {
            setSelectedTab(undefined)
        }
    }, [results, setJob])

    const profitableStyle = {
        color: job?.profitable ? 'green' : 'red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }

    const tabStyle = `flex flex-row justify-center w-[33.33%] h-[3rem]
     items-center rounded-t-md`

    console.log(results)

    const handleTabSelect = (selection, index) => {
        setSelectedTab(index)
        setJob(selection)
    }

    return (
        <div className="resultsContainer">
            <div className='flex flex-row justify-evenly w-full bg-neutral-200 rounded-t-md border-white'>
                {results.map((item, i) => {
                    const oneRoute = results.length === 1
                    let text
                    switch (i) {
                        case 0:
                            text = 'Fastest'
                            break;
                        case results.length - 1:
                            text = 'Cheapest'
                            break;
                        default:
                            text = '-'
                            break;
                    }

                    if(oneRoute){
                        text = 'Fastest & Cheapest'
                    }

                    const active = selectedTab === i

                    return (
                        <div
                            id={'tab-' + i}
                            key={i}
                            onClick={() => handleTabSelect(item, i)}
                            className={`${tabStyle} ${active ? 'bg-white' : 'bg-neutral-200'} cursor-pointer`}>
                            <p>{text}</p>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-row w-full items-center justify-between mb-2 max-sm:flex-col">
                <div className="w-[18rem] pt-3 pb-3 flex flex-col items-center justify-center">
                    {job.profitable ?
                        <h3 style={profitableStyle} >
                            <CheckCircle className="text-green" /> PROFITABLE
                        </h3>
                        :
                        <h3 style={profitableStyle}><CircleX className="text-red-500" />NOT PROFITABLE</h3>}
                    <h2 style={{ marginTop: '.5rem' }}>{formatUSD(job?.netProfit)}</h2>
                </div>
                <div className="w-[18rem] pt-4 pb-4 flex flex-col items-center justify-center" >
                    <div className='flex flex-row'>
                        <Truck />
                        <h3>Rate Per Mile</h3>
                    </div>

                    <h2>{formatUSD(job.ratePerMile)}</h2>
                </div>
                <div className="w-[18rem] pt-4 pb-4 flex flex-col items-center justify-center">
                    <h3>Total Cost</h3>
                    <h2>{formatUSD(job?.totalCost)}</h2>
                </div>
            </div>
            <div className="breakdownContainer">
                <div className="revenueExpenses">
                    <h2 style={{ padding: '1rem', marginLeft: '1rem' }}>Revenue & Expenses</h2>
                    {isMobile ?
                        <MobileResults job={job} />
                        :
                        <>
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
                                <p>{formatUSD(job.totalDirectCosts)}</p>
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
                            <div className="results-row">
                                <p style={{ marginLeft: '1.2rem' }}>Overhead</p>
                                <p>{formatUSD(job?.overhead)}</p>
                            </div>
                            <div style={{
                                borderTop: '.1rem solid lightgrey', borderBottom: '.1rem solid lightgrey',
                                padding: '.2rem'
                            }} className='results-row'>
                                <p style={{ marginLeft: '2rem' }}>Subtotal - Fixed</p>
                                <p>{formatUSD(job.totalFixedCost)}</p>
                            </div>
                            <div className='results-row'>
                                <p style={{ justifySelf: 'flex-start' }}>Other Costs</p>
                            </div>

                            <div className="results-row">
                                <p style={{ marginLeft: '1.2rem' }}>Depreciation</p>
                                <p>{formatUSD(job?.depreciation)}</p>
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
                                <p>{formatUSD(job.totalOtherCosts)}</p>
                            </div>
                        </>
                    }
                </div>
                <div className="profitSummary">
                    <h2 style={{ padding: '1rem', marginLeft: '1rem' }}>Profit Summary</h2>
                    <div className="results-row">
                        <p>Gross Profit</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '10rem' }}>
                            <p>{formatUSD(job?.grossProfit)}</p>
                            <p>{job?.grossProfitPercentage}%</p>
                        </div>
                    </div>
                    <div className="results-row">
                        <p>Operating Profit</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '10rem' }}>
                            <p>{formatUSD(job?.operatingProfit)}</p>
                            <p>{job?.operatingProfitPercentage}%</p>
                        </div>
                    </div>
                    <div className="results-row">
                        <p>Net Profit</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '10rem' }}>
                            <p>{formatUSD(job?.netProfit)}</p>
                            <p>{job?.netProfitPercentage}%</p>
                        </div>
                    </div>
                    <h2 style={{ padding: '1rem', marginLeft: '1rem', marginTop: '1rem' }}>Other</h2>
                    <div className='results-row'>
                        <p>Distance</p>
                        <p>{job?.distance} Miles</p>
                    </div>
                    <div className='results-row'>
                        <p>Drive Time</p>
                        <p>{job?.driveTime}</p>
                    </div>
                    <div className="results-row">
                        <p>Rate Per Mile</p>
                        <p>{formatUSD(job?.ratePerMile)}</p>
                    </div>
                    <div className='flex flex-row w-full justify-evenly relative top-[22rem]'>
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