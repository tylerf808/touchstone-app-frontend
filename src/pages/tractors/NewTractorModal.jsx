

export default function NewTractorModal({ editedItem, setEditedItem, isOpen, onSave, setShowNewModal }) {

    const onClose = () => {
        setShowNewModal(false)
    }

    const handleChange = (e) => {
        setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
        console.log(editedItem)
    };

    if (!isOpen) return null

    return (
        <div className="overlay">
            <form className="new-tractor-form">
                <h3 style={{ marginBottom: '1rem' }}>New Tractor</h3>
                <div className="modal-input-row">
                    <label>Internal Number:</label>
                    <input onChange={handleChange} type="number" name="internalNum" />
                </div>
                <div className="modal-input-row">
                    <label>VIN:</label>
                    <input onChange={handleChange} type="text" name="vin" />
                </div>
                <div className="modal-input-row">
                    <label>Monthly Insurance:</label>
                    <div style={{ justifySelf: 'flex-end' }}>
                        <span style={{ fontWeight: 'bold' }}>$ </span>
                        <input
                            style={{ width: '8rem' }}
                            type="number"
                            name="insurance"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="modal-input-row">
                    <label>MPG:</label>
                    <input style={{ width: '2.5rem' }} onChange={handleChange} type="number" name="mpg" />
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
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: '.5rem'}}>
                        <label>Ft.</label>
                        <input style={{width: '2rem'}} name='ft' onChange={(e) => {
                            setEditedItem({...editedItem, height: {ft: e.target.value, in: editedItem.height.in}})
                        }}/>
                        <label>In.</label>
                        <input style={{width: '2rem'}} name='in' onChange={(e) => {
                            setEditedItem({...editedItem, height: {in: e.target.value, ft: editedItem.height.ft}})
                        }}/>
                    </div>
                </div>
                <div className="modal-input-row">
                    <label>Width:</label>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: '.5rem'}}>
                        <label>Ft.</label>
                        <input style={{width: '2rem'}} name='ft' onChange={(e) => {
                            setEditedItem({...editedItem, width: {ft: e.target.value, in: editedItem.width.in}})
                        }}/>
                        <label>In.</label>
                        <input style={{width: '2rem'}} name='in' onChange={(e) => {
                            setEditedItem({...editedItem, width: {in: e.target.value, ft: editedItem.width.ft}})
                        }}/>
                    </div>
                </div>
                <div className="modal-input-row">
                    <label>Weight:</label>
                    <input style={{ width: '4rem' }} onChange={handleChange} type="text" name="weight" />
                </div>
                <div className="modal-actions">
                    <button style={{ backgroundColor: 'green' }} className="modal-btn" id="save-btn" type="submit" onClick={onSave}>Save</button>
                    <button style={{ backgroundColor: 'red' }} className="modal-btn" id="cancel-btn" type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    )
}