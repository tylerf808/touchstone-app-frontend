import formatUSD from "../../../helpers/currencyFormatter"

export default function MobileResults({job}) {

    const handleExpand = (section) => {
        let rows = Array.from(document.getElementsByClassName(section + '-sub-row'))
        const arrow = document.getElementById(section)
        let isOpen
        rows.forEach((row) => {
            isOpen = row.classList.toggle('open')
        })
        arrow.innerHTML = isOpen ? '&#x25BC;' : '&#x25B6;';
    }

    return (
        <div>
            <div style={{
                borderTop: '.1rem solid lightgrey', borderBottom: '.1rem solid lightgrey',
                padding: '.2rem'
            }} className="results-row">
                <p>Revenue</p>
                <p>{formatUSD(job?.revenue)}</p>
            </div>
            <div className="results-row">
                <div style={{ justifySelf: 'flex-start', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '7rem' }}>
                    <p>Direct Costs</p>
                    <a id='direct' onClick={(e) => {
                        handleExpand(e.target.id)
                    }}>&#x25B6;</a>
                </div>
                <p>({formatUSD(job?.totalDirectCosts)})
                </p>
            </div>
            <div className="results-row direct-sub-row">
                <p style={{ marginLeft: '1.2rem' }}>Labor</p>
                <p>{formatUSD(job?.labor)}</p>
            </div>
            <div className="results-row direct-sub-row">
                <p style={{ marginLeft: '1.2rem' }}>Payroll Tax</p>
                <p>{formatUSD(job?.payrollTax)}</p>
            </div>
            <div className="results-row direct-sub-row">
                <p style={{ marginLeft: '1.2rem' }}>Dispatch</p>
                <p>{formatUSD(job?.dispatch)}</p>
            </div>
            <div className="results-row direct-sub-row">
                <p style={{ marginLeft: '1.2rem' }}>Factor</p>
                <p>{formatUSD(job?.factor)}</p>
            </div>
            <div className="results-row direct-sub-row">
                <p style={{ marginLeft: '1.2rem' }}>Fuel</p>
                <p>{formatUSD(job?.gasCost)}</p>
            </div>
            <div className="results-row direct-sub-row">
                <p style={{ marginLeft: '1.2rem' }}>Tolls</p>
                <p>{formatUSD(job?.tolls)}</p>
            </div>
            <div className="results-row direct-sub-row">
                <p style={{ marginLeft: '1.2rem' }}>ODC</p>
                <p>{formatUSD(job?.odc)}</p>
            </div>
            <div className='results-row'>
                <div style={{
                    justifySelf: 'flex-start', display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center', width: '7rem'
                }}>
                    <p>Fixed Costs</p>
                    <a id='fixed' onClick={(e) => {
                        handleExpand(e.target.id)
                    }}>&#x25B6;</a>
                </div>
                <p>({formatUSD(job?.totalFixedCost)})</p>
            </div>
            <div className="results-row fixed-sub-row">
                <p style={{ marginLeft: '1.2rem' }}>Tractor Lease</p>
                <p>{formatUSD(job?.tractorLease)}</p>
            </div>
            <div className="results-row fixed-sub-row">
                <p style={{ marginLeft: '1.2rem' }}> Trailer Lease</p>
                <p>{formatUSD(job?.trailerLease)}</p>
            </div>
            <div className='results-row fixed-sub-row'>
                <p style={{ marginLeft: '1.2rem' }}>Insurance</p>
                <p>{formatUSD(job.insurance)}</p>
            </div>
            <div className="results-row other-sub-row">
                <p style={{ marginLeft: '1.2rem' }}>Overhead</p>
                <p>{formatUSD(job?.overhead)}</p>
            </div>
            <div className='results-row'>
                <div style={{
                    justifySelf: 'flex-start', display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-between', alignItems: 'center', width: '7rem'
                }}>
                    <p>Other Costs</p>
                    <a id='other' onClick={(e) => {
                        handleExpand(e.target.id)
                    }}>&#x25B6;</a>
                </div>
                <p>({formatUSD(job?.totalOtherCosts)})</p>

            </div>

            <div className="results-row other-sub-row">
                <p style={{ marginLeft: '1.2rem' }}>Depreciation</p>
                <p>{formatUSD(job?.depreciation)}</p>
            </div>
            <div className="results-row other-sub-row">
                <p style={{ marginLeft: '1.2rem' }}>Parking</p>
                <p>{formatUSD(job?.parking)}</p>
            </div>
            <div className="results-row other-sub-row">
                <p style={{ marginLeft: '1.2rem' }}>Repairs</p>
                <p>{formatUSD(job?.repairs)}</p>
            </div>
            <div style={{
                borderTop: '.1rem solid lightgrey', borderBottom: '.1rem solid lightgrey',
                padding: '.2rem'
            }} className="results-row">
                <p>Total Costs</p>
                <p>({formatUSD(job?.totalCost)})</p>
            </div>
        </div>
    )
}