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
                            <input name='overhead' defaultValue={costs.overhead} style={{ width: '2rem' }}
                                onChange={(e) => handleChange(e)}></input>
                            <span>%</span>
                        </div>
                    </div>
                    <div className="modal-form-row">
                        <label>Parking costs per month for one tractor</label>
                        <div>
                            <span>$</span>
                            <input name="parking" defaultValue={costs.parking} style={{ width: '4rem' }}
                                onChange={(e) => handleChange(e)}></input>
                        </div>
                    </div>
                    <div className="modal-form-row">
                        <label>Repairs in cents per mile</label>
                        <div>
                            <input name="repairs" defaultValue={costs.repairs} style={{ width: '2.5rem' }}
                                onChange={(e) => handleChange(e)}></input>
                            <span>¢</span>
                        </div>
                    </div>
                    <div className="modal-form-row">
                        <label>Monthly loan payment (enter 0 if none)</label>
                        <div>
                            <span>$</span>
                            <input name="loan" defaultValue={costs.loan} style={{ width: '4rem' }}
                                onChange={(e) => handleChange(e)}></input>
                        </div>
                    </div>
                    <div className="modal-form-row">
                        <label>Average number of loads per month</label>
                        <input defaultValue={20} style={{ width: '2.5rem' }}></input>
                    </div>
                    <div className="modal-actions" style={{ width: '18rem' }}>
                        <button className="modal-save-btn" onClick={(e) => handleSubmit(e)}>Confirm</button>
                        <button className="modal-cancel-btn" onClick={() => {
                            setNewCosts({
                                overhead: 0,
                                parking: 0,
                                repairs: 0,
                                loan: 0
                            })
                            setIsOpen(false)
                        }}>Cancel</button>
                    </div>
                </form>
                :
                <form className="modal-form">
                    <h2 style={{ marginBottom: '1rem' }}>Edit Operational Costs</h2>
                    <div className="modal-actions">
                        <button className="modal-save-btn">Confirm</button>
                        <button className="modal-cancel-btn" onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </form>
            }
        </div>
    )
}