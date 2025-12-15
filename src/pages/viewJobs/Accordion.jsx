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
        <div onClick={(e) => toggleAccordion(e)} className={accordionOpen ? 'grid grid-rows-2 w-11/12 h-20 hover:cursor-pointer transition-all duration-75'
            : 'grid grid-rows-1 w-11/12 h-12 hover:cursor-pointer transition-all duration-75'}>
            <div id="accordion-header" className="grid grid-cols-[10%,10%,10%,20%,20%,30%] items-center w-auto">
                <h2 className="font-semibold text-sm mr-4">{job.date}</h2>
                <h2 className="font-semibold text-sm mr-4">{job.client}</h2>
                <h2 className="font-semibold text-sm mr-4">{job.driver}</h2>
                <h2 className="font-semibold text-sm mr-4">{job.start}</h2>
                <h2 className="font-semibold text-sm">{job.end}</h2>
                <div id="accordion-right-header" className="grid grid-cols-3 justify-content-center w-auto">
                    <p className='text-center'>{formatUSD(job.revenue)}</p>
                    <p className='text-center'>{formatUSD(job.totalCost)}</p>
                    <p className='text-center'>{formatUSD(job.netProfit)}</p>
                </div>
            </div>
            {accordionOpen ?
                <div id="accordion-body" className={accordionOpen ? 'grid grid-cols-3 justify-evenly w-11/12 h-auto transition-all duration-75 opacity-100'
                    : 'hidden  transition-all duration-75 opacity-0'}>
                    <p className='text-center'>Body Item</p>
                    <p className='text-center'>Body Item</p>
                    <p className='text-center'>Body Item</p>
                </div>
                :
                null}
        </div>
    )
}