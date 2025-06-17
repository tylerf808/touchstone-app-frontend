import { useEffect, useState } from 'react'
import './tractorsStyles.css'

export default function EditTractorModal({ isOpen, editedItem, setEditedItem, onSave, setShowEditModal }) {


    const handleChange = (e) => {
        setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
    };

    const onClose = () => {
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
            <div className="edit-modal">
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
                        <div style={{justifySelf: 'flex-end'}}>
                            <span style={{fontWeight: 'bold'}}>$ </span>
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
                        <div style={{justifySelf: 'flex-end'}}>
                            <span style={{fontWeight: 'bold'}}>$ </span>
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
                        <div style={{justifySelf: 'flex-end'}}>
                            <span style={{fontWeight: 'bold'}}>$ </span>
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
                        <label>
                            Height:
                        </label>
                        <input
                            style={{ width: '2rem' }}
                            type="text"
                            name="height"
                            value={editedItem?.height}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="modal-input-row">
                        <label>
                            Width:
                        </label>
                        <input
                            style={{ width: '2rem' }}
                            type="text"
                            name="width"
                            value={editedItem?.width}
                            onChange={handleChange}
                        />
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
                        <button style={{ backgroundColor: 'green' }} className="modal-btn" id="save-btn" type="submit">Save</button>
                        <button style={{ backgroundColor: 'red' }} className="modal-btn" id="cancel-btn" type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}