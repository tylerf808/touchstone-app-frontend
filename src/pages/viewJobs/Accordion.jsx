import { useState, useEffect } from "react"
import formatUSD from "../../helpers/currencyFormatter"

export default function Accordion({ job, selectedJobs, setSelectedJobs }) {

    console.log(job)

    const [accordionOpen, setAccordionOpen] = useState(false)
    const [selected, setSelected] = useState(false)

    const toggleAccordion = (e) => {
        if (e.target.id !== 'accordion-checkbox') {
            setAccordionOpen(!accordionOpen)
        }
    }

    const handleSelection = (e) => {
        e.stopPropagation()
        const checked = e.target.checked
        setSelectedJobs((prev) => {
            if (checked) {
                if (prev.some((item) => item._id === job._id)) return prev
                return [...prev, job]
            }
            return prev.filter((item) => item._id !== job._id)
        })
    }

    useEffect(() => {
        if(selectedJobs.includes(job)){
            setSelected(true)
        } else {
            setSelected(false)
        }
    }, [selectedJobs])

    return (
        <div onClick={(e) => toggleAccordion(e)} className={accordionOpen ? 'w-full hover:cursor-pointer transition-all duration-150 ease-in-out border-b-2'
            : 'w-full hover:cursor-pointer transition-all duration-150 ease-in-out border-b-2'}>
            <div id="accordion-header" className="divide-solid grid grid-cols-[2%,9%,9%,10%,20%,20%,30%] items-center w-full h-12">
                <input type='checkbox' id='accordion-checkbox' checked={selected} onChange={(e) => handleSelection(e)} className='self-center justify-self-center'></input>
                <h2 className="font-semibold text-sm justify-self-center">{job.date}</h2>
                <h2 className="font-semibold text-sm justify-self-center">{job.client}</h2>
                <h2 className="font-semibold text-sm justify-self-center">{job.driver}</h2>
                <h2 className="font-semibold text-sm justify-self-center">{job.start}</h2>
                <h2 className="font-semibold text-sm justify-self-center">{job.end}</h2>
                <div id="accordion-right-header" className="grid grid-cols-3 justify-content-center w-full">
                    <p className='text-center'>{formatUSD(job.revenue)}</p>
                    <p className='text-center'>{formatUSD(job.totalCost)}</p>
                    <p className='text-center'>{formatUSD(job.netProfit)}</p>
                </div>
            </div>
            <div id="accordion-body" className={`overflow-hidden grid grid-cols-[60%,40%] justify-center items-center gap-0 self-center justify-self-center
                 transition-[height] duration-150 w-11/12 ${accordionOpen ? 'h-[12rem]' : 'h-0'}`}>
                <div className="grid grid-rows-2 gap-4 items-center justify-center">
                    <div className="flex flex-col flex-wrap justify-center w-full">
                        <h3 className='justify-self-start'>Direct Costs</h3>
                        <div className="flex flex-row justify-start flex-wrap w-[100%]">
                            <p style={{ fontSize: '.9rem', marginRight: '2rem' }}>Labor: {formatUSD(job.labor)}</p>
                            <p style={{ fontSize: '.9rem', marginRight: '2rem' }}>Payroll Tax: {formatUSD(job.labor)}</p>
                            <p style={{ fontSize: '.9rem', marginRight: '2rem' }}>Dispatch: {formatUSD(job.dispatch)}</p>
                            <p style={{ fontSize: '.9rem', marginRight: '2rem' }}>Factor: {formatUSD(job.factor)}</p>
                            <p style={{ fontSize: '.9rem', marginRight: '2rem' }}>Fuel: {formatUSD(job.fuel)}</p>
                            <p style={{ fontSize: '.9rem', marginRight: '2rem' }}>Tolls: {formatUSD(job.tolls)}</p>
                            <p style={{ fontSize: '.9rem', marginRight: '2rem' }}>ODC: {formatUSD(job.odc)}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center w-full">
                        <h3 className=' justify-self-start'>Fixed Costs</h3>
                        <div className="flex flex-row justify-start flex-wrap  w-[100%]">
                            <p style={{ fontSize: '.9rem', marginRight: '2rem' }}>Trailer Lease: {formatUSD(job.trailerLease)}</p>
                            <p style={{ fontSize: '.9rem', marginRight: '2rem' }}>Tractor Lease: {formatUSD(job.tractorLease)}</p>
                            <p style={{ fontSize: '.9rem', marginRight: '2rem' }}>Insurance: {formatUSD(job.insurance)}</p>
                            <p style={{ fontSize: '.9rem', marginRight: '2rem' }}>Overhead: {formatUSD(job.overhead)}</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-rows-2 gap-8 items-center justify-center">
                    <div className="flex flex-col flex-wrap justify-center w-full">
                        <h3 className='justify-self-start'>Other Costs</h3>
                        <div className="flex flex-row justify-start flex-wrap w-[100%]">
                            <p style={{ fontSize: '.9rem', marginRight: '2rem' }}>Depreciation: {formatUSD(job.depreciation)}</p>
                            <p style={{ fontSize: '.9rem', marginRight: '2rem' }}>Parking: {formatUSD(job.parking)}</p>
                            <p style={{ fontSize: '.9rem', marginRight: '2rem' }}>Repairs: {formatUSD(job.repairs)}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center w-full">
                        <h3 className=' justify-self-start'>Route Details</h3>
                        <div className="flex flex-row justify-start flex-wrap  w-[100%]">
                            <p style={{ fontSize: '.9rem', marginRight: '2rem' }}>Miles: {(job.distance)}</p>
                            <p style={{ fontSize: '.9rem', marginRight: '2rem' }}>Drive Time: {(job.driveTime)}</p>
                            <p style={{ fontSize: '.9rem', marginRight: '2rem' }}>Rate per Mile: {formatUSD(job.mileageRate)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}