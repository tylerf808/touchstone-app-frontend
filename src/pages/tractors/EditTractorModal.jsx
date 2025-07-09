import { useEffect, useState } from 'react'
import './tractorsStyles.css'

export default function EditTractorModal({ isOpen, editedItem, setEditedItem, onSave, setShowEditModal }) {


    const handleChange = (e) => {
        setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
    };

    const onClose = () => {
        setEditedItem({
            internalNum: '',
            vin: '',
            insurance: '',
            tractorLease: '',
            trailerLease: '',
            mpg: '',
            height: { ft: '', in: '' },
            width: { ft: '', in: '' },
            weight: ''
        })
        setShowEditModal(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedItem);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="overlay">
            <form className="modal-form" onSubmit={handleSubmit}>
                <h3 style={{ marginBottom: '1rem' }}>Editing Tractor {editedItem.internalNum}</h3>
                <div className="modal-input-row">
                    <label>
                        Internal Number:
                    </label>
                    <input
                        type="number"
                        name="internalNum"
                        value={editedItem?.internalNum}
                        onChange={handleChange}
                    />
                </div>
                <div className="modal-input-row">
                    <label>
                        VIN:
                    </label>
                    <input
                        type="text"
                        name="vin"
                        value={editedItem?.vin}
                        onChange={handleChange}
                    />
                </div>
                <div className="modal-input-row">
                    <label>
                        Insurance:
                    </label>
                    <div style={{ justifySelf: 'flex-end' }}>
                        <span style={{ fontWeight: 'bold' }}>$ </span>
                        <input
                            style={{ width: '8rem' }}
                            type="number"
                            name="insurance"
                            value={editedItem?.insurance}
                            onChange={handleChange}
                        />
                    </div>

                </div>
                <div className="modal-input-row">
                    <label>
                        MPG:
                    </label>
                    <input
                        style={{ width: '2rem' }}
                        type="number"
                        name="mpg"
                        value={editedItem?.mpg}
                        onChange={handleChange}
                    />
                </div>
                <div className="modal-input-row">
                    <label>
                        Tractor Lease:
                    </label>
                    <div style={{ justifySelf: 'flex-end' }}>
                        <span style={{ fontWeight: 'bold' }}>$ </span>
                        <input
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
                    <label>
                        Weight:
                    </label>
                    <input
                        style={{ width: '2rem' }}
                        type="number"
                        name="mpg"
                        value={editedItem?.weight}
                        onChange={handleChange}
                    />
                </div>
                <div className="modal-actions">
                    <button className="modal-save-btn" type="submit">Save</button>
                    <button className="modal-cancel-btn" type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
}