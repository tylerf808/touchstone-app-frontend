export default function FixedCostsTab({ fixedCosts, setFixedCosts }) {

  return (
    <form className="tab-content">
      <div className='input-label' style={{ justifySelf: 'center', alignSelf: 'center', marginBottom: '.5rem', fontSize: '1rem' }}>Enter each of your monthly fixed costs</div>
      <div className="input-group fixed-group">
        <label htmlFor="labor" className="input-label">Labor rate as a percentage of revenue</label>
        <div>
          <input
            name="labor"
            type="number"
            className="input-field"
            defaultValue={fixedCosts.labor}
            onChange={(e) => setFixedCosts({ ...fixedCosts, labor: e.target.value })}
          />
          <span >%</span>
        </div>
      </div>
      <div className="input-group fixed-group">
        <label htmlFor="payroll" className="input-label">Payroll tax rate</label>
        <div>
          <input
            name="payroll"
            type="number"
            className="input-field"
            defaultValue={fixedCosts.payroll}
            onChange={(e) => setFixedCosts({ ...fixedCosts, payroll: e.target.value })}
          />
          <span>%</span>
        </div>
      </div>
      <div className="input-group fixed-group">
        <label htmlFor="dispatch" className="input-label">Dispatch fee as a percentage of revenue</label>
        <div>
          <input
            name="dispatch"
            type="number"
            className="input-field"
            defaultValue={fixedCosts.dispatch}
            onChange={(e) => setFixedCosts({ ...fixedCosts, dispatch: e.target.value })}
          />
          <span>%</span>
        </div>
      </div>
      <div className="input-group fixed-group">
        <label htmlFor="factor" className="input-label">Factor fee as a percentage of revenue</label>
        <div>
          <input
            name="factor"
            type="number"
            className="input-field"
            defaultValue={fixedCosts.factor}
            onChange={(e) => setFixedCosts({ ...fixedCosts, factor: e.target.value })}
          />
          <span>%</span>
        </div>
      </div>
      <div className="input-group fixed-group">
        <label htmlFor="odc" className="input-label">Other direct costs (ODC) as a percentage of revenue</label>
        <div>
          <input
            name="odc"
            type="number"
            className="input-field"
            defaultValue={fixedCosts.odc}
            onChange={(e) => setFixedCosts({ ...fixedCosts, odc: e.target.value })}
          />
          <span>%</span>
        </div>
      </div>
      <div className="input-group fixed-group">
        <label htmlFor="overhead" className="input-label">Overhead as a percentage of revenue</label>
        <div>
          <input
            name="overhead"
            type="number"
            className="input-field"
            defaultValue={fixedCosts.overhead}
            onChange={(e) => setFixedCosts({ ...fixedCosts, overhead: e.target.value })}
          />
          <span>%</span>
        </div>
      </div>
    </form>
  )
}