export default function OperationalCostsTab({ operationalCosts, setOperationalCosts }) {

    return (
        <form className="tab-content">
            <div className='input-label' style={{ justifySelf: 'center', alignSelf: 'center', marginBottom: '.5rem', fontSize: '1rem' }}>Enter each of your monthly operational costs</div>
            <div className="input-group operational-group">
                <label htmlFor="repairs" className="input-label">Repairs costs in cents per mile</label>
                <div style={{ justifySelf: 'flex-end' }}>
                    <input
                        name="repairs"
                        type='number'
                        className="input-field"
                        defaultValue={operationalCosts.repairs}
                        onChange={(e) => setOperationalCosts({ ...operationalCosts, repairs: e.target.value })}
                    />
                    <span>¢</span>
                </div>
            </div>
            <div className="input-group operational-group">
                <label htmlFor="loan" className="input-label">Monthly loan payment (enter 0 if none)</label>
                <div style={{ justifySelf: 'flex-end' }}>
                    <span>$</span>
                    <input
                        name="loan"
                        type='number'
                        className="input-field"
                        defaultValue={operationalCosts.loan}
                        onChange={(e) => setOperationalCosts({ ...operationalCosts, loan: e.target.value })}
                    />
                </div>
            </div>
            <div className="input-group operational-group">
                <label htmlFor="parking" className="input-label">Monthly parking cost</label>
                <div style={{ justifySelf: 'flex-end' }}>
                    <span>$</span>
                    <input
                        name="parking"
                        type='number'
                        className="input-field"
                        defaultValue={operationalCosts?.parking}
                        onChange={(e) => setOperationalCosts({ ...operationalCosts, parking: Number(e.target.value) })}
                    />
                </div>
            </div>
            <div className="input-group operational-group">
                <label htmlFor="gAndA" className="input-label">Monthly G&A cost</label>
                <div style={{ justifySelf: 'flex-end' }}>
                    <span>$</span>
                    <input
                        name="gAndA"
                        type='number'
                        className="input-field"
                        defaultValue={operationalCosts?.gAndA}
                        onChange={(e) => setOperationalCosts({ ...operationalCosts, gAndA: e.target.value })}
                    />
                </div>
            </div>
        </form>
    )
}