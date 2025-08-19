import { useState } from "react"

export default function EditCostsModal({ isOpen, setIsOpen, costsType, newCosts, costs, setNewCosts, confirmEditCosts }) {

    const handleChange = (e) => {
        setNewCosts({ ...newCosts, [e.target.name]: parseInt(e.target.value) })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsOpen(false)
        confirmEditCosts()
    }

    if (!isOpen) return null

    return (
        <div className="overlay">
            {costsType === 'fixed' ?
                <form className="modal-form" style={{ width: '30rem' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Edit Fixed Costs</h2>
                    <div className="modal-form-row">
                        <label>Overhead as a percentage of revenue</label>
                        <div>
                            <input name='overhead' defaultValue={costs.overhead} style={{ width: '1.5rem' }}
                                onChange={(e) => handleChange(e)}></input>
                            <span style={{marginLeft: '.25rem'}}>%</span>
                        </div>
                    </div>
                    <div className="modal-form-row">
                        <label>Parking costs per month for one tractor</label>
                        <div>
                            <span style={{marginRight: '.25rem'}}>$</span>
                            <input name="parking" defaultValue={costs.parking} style={{ width: '3rem' }}
                                onChange={(e) => handleChange(e)}></input>
                        </div>
                    </div>
                    <div className="modal-form-row">
                        <label>Repairs in cents per mile</label>
                        <div>
                            <input name="repairs" defaultValue={costs.repairs} style={{ width: '1.5rem' }}
                                onChange={(e) => handleChange(e)}></input>
                            <span style={{marginLeft: '.25rem'}}>¢</span>
                        </div>
                    </div>
                    <div className="modal-form-row">
                        <label>Monthly loan payment (enter 0 if none)</label>
                        <div>
                            <span style={{marginRight: '.25rem'}}>$</span>
                            <input name="loan" defaultValue={costs.loan} style={{ width: '3rem' }}
                                onChange={(e) => handleChange(e)}></input>
                        </div>
                    </div>
                    <div className="modal-form-row">
                        <label>Average number of loads per month</label>
                        <input name="loadsPerMonth" defaultValue={costs.loadsPerMonth} style={{ width: '2.5rem' }} onChange={(e) => handleChange(e)}></input>
                    </div>
                    <div className="modal-actions" style={{ width: '18rem' }}>
                        <button className="modal-save-btn" onClick={(e) => handleSubmit(e)}>Confirm</button>
                        <button className="modal-cancel-btn" onClick={() => {
                            setNewCosts(costs)
                            setIsOpen(false)
                        }}>Cancel</button>
                    </div>
                </form>
                :
                <form className="modal-form" style={{width: '30rem'}}>
                    <h2 style={{ marginBottom: '1rem' }}>Edit Direct Costs</h2>
                    <div className="modal-form-row">
                        <label>Labor rate as a percentage of revenue</label>
                        <div>
                            <input defaultValue={costs.laborRate} name="laborRate" style={{width: '1.5rem'}} onChange={(e) => handleChange(e)}></input>
                            <span>%</span>
                        </div>
                    </div>
                    <div className="modal-form-row">
                        <label>Payroll tax as a percentage of revenue</label>
                        <div>
                            <input defaultValue={costs.payrollTax} name="payrollTax" style={{width: '1.5rem'}} onChange={(e) => handleChange(e)}></input>
                            <span>%</span>
                        </div>
                    </div>
                    <div className="modal-form-row">
                        <label>Dispatch fee as a percentage of revenue</label>
                        <div>
                            <input defaultValue={costs.dispatch} name="dispatch" style={{width: '1.5rem'}} onChange={(e) => handleChange(e)}></input>
                            <span>%</span>
                        </div>
                    </div>
                    <div className="modal-form-row">
                        <label>Factor fee as a percentage of revenue</label>
                        <div>
                            <input defaultValue={costs.factor} name="factor" style={{width: '1.5rem'}} onChange={(e) => handleChange(e)}></input>
                            <span>%</span>
                        </div>
                    </div>
                    <div className="modal-form-row">
                        <label>Other direct costs as a percentage of revenue</label>
                        <div>
                            <input defaultValue={costs.odc} name="odc" style={{width: '1.5rem'}} onChange={(e) => handleChange(e)}></input>
                            <span>%</span>
                        </div>
                    </div>
                    <div className="modal-actions">
                        <button className="modal-save-btn" onClick={(e) => handleSubmit(e)}>Confirm</button>
                        <button className="modal-cancel-btn" onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </form>
            }
        </div>
    )
}