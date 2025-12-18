import { useState } from "react"
import formatUSD from "../../helpers/currencyFormatter"

export default function Accordion({ job }) {

    const [accordionOpen, setAccordionOpen] = useState(false)

    const toggleAccordion = (e) => {
        if (e.target.id !== 'accordion-checkbox') {
            setAccordionOpen(!accordionOpen)
        }
    }

    return (
        <div onClick={(e) => toggleAccordion(e)} className={accordionOpen ? 'w-full hover:cursor-pointer transition-all duration-150 ease-in-out border-b-2'
            : 'w-full hover:cursor-pointer transition-all duration-150 ease-in-out border-b-2'}>
            {/* header should sit above body while body animates */}
            <div id="accordion-header" className="divide-solid grid grid-cols-[2%,9%,9%,10%,20%,20%,30%] items-center w-auto h-12">
                <input type='checkbox' id='accordion-checkbox' className='self-center justify-self-center'></input>
                <h2 className="font-semibold text-sm justify-self-center">{job.date}</h2>
                <h2 className="font-semibold text-sm justify-self-center">{job.client}</h2>
                <h2 className="font-semibold text-sm justify-self-center">{job.driver}</h2>
                <h2 className="font-semibold text-sm justify-self-center">{job.start}</h2>
                <h2 className="font-semibold text-sm justify-self-center">{job.end}</h2>
                <div id="accordion-right-header" className="grid grid-cols-3 justify-content-center w-auto">
                    <p className='text-center'>{formatUSD(job.revenue)}</p>
                    <p className='text-center'>{formatUSD(job.totalCost)}</p>
                    <p className='text-center'>{formatUSD(job.netProfit)}</p>
                </div>
            </div>
            {/* body: animate max-height so it only expands downward; inner content fades in with a delay */}
            <div id="accordion-body" className={`overflow-hidden self-center justify-self-center transition-[height] duration-150 w-full ${accordionOpen ? 'h-[10rem]' : 'h-0'}`}>
                <div className={`grid grid-cols-2 self-center justify-self-end justify-evenly h-[10rem] w-11/12 transition-transform duration-150 ${accordionOpen ? 'opacity-100 delay-150' : 'opacity-0  pointer-events-none'}`}>
                    <div className="grid grid-rows-2 justify-center">
                        <div className="flex flex-row flex-wrap justify-center w-full">
                            <h3 className='justify-self-start'>Direct Costs</h3>
                            <div className="flex flex-row flex-wrap">
                                <p classname="text-sm">Labor {formatUSD(job.labor)}</p>
                                <p classname="text-sm">Payroll Tax {formatUSD(job.labor)}</p>
                                <p classname="text-sm">Dispatch {formatUSD(job.dispatch)}</p>
                                <p classname="text-sm">Factor {formatUSD(job.factor)}</p>
                                <p classname="text-sm">Fuel {formatUSD(job.fuel)}</p>
                                <p classname="text-sm">Tolls {formatUSD(job.tolls)}</p>
                                <p classname="text-sm">ODC {formatUSD(job.odc)}</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center w-full">
                            <h3 className=' justify-self-start text-center'>Direct Costs</h3>
                            <div className="flex flex-row flex-wrap">
                                <p classname="text-sm">Labor {formatUSD(job.labor)}</p>
                                <p classname="text-sm">Payroll Tax {formatUSD(job.labor)}</p>
                                <p classname="text-sm">Dispatch {formatUSD(job.dispatch)}</p>
                                <p classname="text-sm">Factor {formatUSD(job.factor)}</p>
                                <p classname="text-sm">Fuel {formatUSD(job.fuel)}</p>
                                <p classname="text-sm">Tolls {formatUSD(job.tolls)}</p>
                                <p classname="text-sm">ODC {formatUSD(job.odc)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-rows-2 justify-center">
                        <div className="flex flex-row justify-center w-full">
                            <h3 className='justify-self-start text-center'>Direct Costs</h3>
                            <div className="flex flex-row flex-wrap">
                                <p classname="text-sm">Labor {formatUSD(job.labor)}</p>
                                <p classname="text-sm">Payroll Tax {formatUSD(job.labor)}</p>
                                <p classname="text-sm">Dispatch {formatUSD(job.dispatch)}</p>
                                <p classname="text-sm">Factor {formatUSD(job.factor)}</p>
                                <p classname="text-sm">Fuel {formatUSD(job.fuel)}</p>
                                <p classname="text-sm">Tolls {formatUSD(job.tolls)}</p>
                                <p classname="text-sm">ODC {formatUSD(job.odc)}</p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center w-full">
                            <h3 className=' justify-self-start text-center'>Direct Costs</h3>
                            <div className="flex flex-row flex-wrap">
                                <p classname="text-sm">Labor {formatUSD(job.labor)}</p>
                                <p classname="text-sm">Payroll Tax {formatUSD(job.labor)}</p>
                                <p classname="text-sm">Dispatch {formatUSD(job.dispatch)}</p>
                                <p classname="text-sm">Factor {formatUSD(job.factor)}</p>
                                <p classname="text-sm">Fuel {formatUSD(job.fuel)}</p>
                                <p classname="text-sm">Tolls {formatUSD(job.tolls)}</p>
                                <p classname="text-sm">ODC {formatUSD(job.odc)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}