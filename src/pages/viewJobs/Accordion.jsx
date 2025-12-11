import { useState } from "react"

export default function Accordion({ job }) {

    const [accordionOpen, setAccordionOpen] = useState(false)

    const toggleAccordion = (e) => {
        if (e.target.id !== 'accordion-checkbox') {
            setAccordionOpen(!accordionOpen)
        }
    }

    return (
        <div onClick={(e) => toggleAccordion(e)} className={accordionOpen ? 'flex flex-col self-center justify-self-center justify-between w-11/12 h-20 hover:cursor-pointer transition-all duration-75'
            : 'flex flex-col self-center justify-self-center justify-between w-11/12 h-10 hover:cursor-pointer transition-all duration-75'}>
            <div id="accordion-header" className="flex flex-row justify-between w-11/12">
                <div id="accordion-left-header" className="flex flex-row justify-evenly w-auto">
                    <input id="accordion-checkbox" type="checkbox" className="mr-3"></input>
                    <h2 className="font-semibold text-sm">Date <span className="m-2 font-light text-sm">{job.date}</span></h2>
                    <h2 className="font-semibold text-sm">Start <span className="m-2 font-light text-sm">{job.start}</span></h2>
                    <h2 className="font-semibold text-sm">Drop Off <span className="m-2 font-light text-sm">{job.end}</span></h2>
                </div>
                {/* <div id="accordion-right-header" className="flex flex-row justify-evenly w-auto">
                    <p>Revenue <span>{job.revenue}</span></p>
                    <p>Total Costs <span>{job.totalCost}</span></p>
                    <p>Net Profit <span>{job.netProfit}</span></p>
                </div> */}
            </div>
            <div id="accordion-body" className={accordionOpen ? 'flex flex-row justify-evenly w-11/12 h-auto transition-all duration-75 opacity-100'
                : 'flex flex-row justify-evenly w-11/12 h-0 transition-all duration-75 opacity-0'}>
                <p>Body Item</p>
                <p>Body Item</p>
                <p>Body Item</p>
            </div>
        </div>
    )
}