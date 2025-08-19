import { useState } from "react";

export default function NewTractorModal({ editedItem, setEditedItem, isOpen, onSave, setShowNewModal }) {

    const [error, setError] = useState('')

    const submitTractor = (e) => {
        e.preventDefault()

        const requiredFields = [
            'internalNum', 'vin', 'insurance', 'tractorLease', 'trailerLease', 'mpg', 'weight'
        ];
        for (let field of requiredFields) {
            if (!editedItem[field] && editedItem[field] !== 0) {
                setError('missing entry')
                return;
            }
        }
        // Validate nested height and width
        if (
            !editedItem.height?.ft || !editedItem.height?.in ||
            !editedItem.width?.ft || !editedItem.width?.in
        ) {
            setError('missing entry')
            return;
        }
        setError('')
        onSave(editedItem)
        setEditedItem({
            internalNum: '',
            vin: '',
            insurance: '',
            tractorLease: '',
            trailerLease: '',
            depreciation: '',
            mpg: '',
            height: { ft: '', in: '' },
            width: { ft: '', in: '' },
            weight: ''
        })
        setShowNewModal(false)
    }

    const onClose = () => {
        setError('')
        setEditedItem({
            internalNum: '',
            vin: '',
            insurance: '',
            tractorLease: '',
            trailerLease: '',
            depreciation: '',
            mpg: '',
            height: { ft: '', in: '' },
            width: { ft: '', in: '' },
            weight: ''
        })
        setShowNewModal(false)
    }

    const handleChange = (e) => {
        setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
    };

    if (!isOpen) return null

    return (
        <div className="overlay">
            <form className="modal-form">
                <h3 style={{ marginBottom: '1rem' }}>New Tractor</h3>
                {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
                <div className="modal-input-row">
                    <label>Internal Number:</label>
                    <input className="new-tractor-input" onChange={handleChange} type="number" name="internalNum" />
                </div>
                <div className="modal-input-row">
                    <label>VIN:</label>
                    <input className="new-tractor-input" onChange={handleChange} type="text" name="vin" />
                </div>
                <div className="modal-input-row">
                    <label>Monthly Insurance:</label>
                    <div style={{ justifySelf: 'flex-end' }}>
                        <span style={{ fontWeight: 'bold' }}>$ </span>
                        <input
                            className="new-tractor-input"
                            style={{ width: '8rem' }}
                            type="number"
                            name="insurance"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="modal-input-row">
                    <label>Annual Depreciation:</label>
                    <div style={{ justifySelf: 'flex-end' }}>
                        <span style={{ fontWeight: 'bold' }}>$ </span>
                        <input
                            className="new-tractor-input"
                            style={{ width: '8rem' }}
                            type="number"
                            name="depreciation"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="modal-input-row">
                    <label>MPG:</label>
                    <input className="new-tractor-input" style={{ width: '2.5rem' }} onChange={handleChange} type="number" name="mpg" />
                </div>
                <div className="modal-input-row">
                    <label>
                        Tractor Lease:
                    </label>
                    <div style={{ justifySelf: 'flex-end' }}>
                        <span style={{ fontWeight: 'bold' }}>$ </span>
                        <input
                            className="new-tractor-input"
                            style={{ width: '8rem' }}
                            type="number"
                            name="tractorLease"
                            value={editedItem?.tractorLease}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="modal-input-row">
                    <label>
                        Trailer Lease:
                    </label>
                    <div style={{ justifySelf: 'flex-end' }}>
                        <span style={{ fontWeight: 'bold' }}>$ </span>
                        <input
                            className="new-tractor-input"
                            style={{ width: '8rem' }}
                            type="number"
                            name="trailerLease"
                            value={editedItem?.trailerLease}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="modal-input-row">
                    <label>Height:</label>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: '.5rem' }}>
                        <label>Ft.</label>
                        <input className="new-tractor-input" style={{ width: '2rem' }} name='ft' value={editedItem.height.ft} onChange={e => setEditedItem({
                            ...editedItem,
                            height: {
                                ft: e.target.value,
                                in: editedItem.height.in
                            }
                        })} />
                        <label>In.</label>
                        <input className="new-tractor-input" style={{ width: '2rem' }} name='in' value={editedItem.height.in} onChange={e => setEditedItem({
                            ...editedItem,
                            height: {
                                in: e.target.value,
                                ft: editedItem.height.ft
                            }
                        })} />
                    </div>
                </div>
                <div className="modal-input-row">
                    <label>Width:</label>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: '.5rem' }}>
                        <label>Ft.</label>
                        <input
                            className="new-tractor-input"
                            style={{ width: '2rem' }}
                            name='ft'
                            value={editedItem.width.ft}
                            onChange={e => setEditedItem({
                                ...editedItem,
                                width: {
                                    ft: e.target.value,
                                    in: editedItem.width.in
                                }
                            })}
                        />
                        <label>In.</label>
                        <input
                            className="new-tractor-input"
                            style={{ width: '2rem' }}
                            name='in'
                            value={editedItem.width.in}
                            onChange={e => setEditedItem({
                                ...editedItem,
                                width: {
                                    in: e.target.value,
                                    ft: editedItem.width.ft
                                }
                            })}
                        />
                    </div>
                </div>
                <div className="modal-input-row">
                    <label>Weight (lbs):</label>
                    <input className="new-tractor-input" style={{ width: '4rem' }} onChange={handleChange} type="text" name="weight" />
                </div>
                <div className="modal-actions">
                    <button className="modal-save-btn" type="submit" onClick={(e) => submitTractor(e)}>Save</button>
                    <button className="modal-cancel-btn" type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    )
}