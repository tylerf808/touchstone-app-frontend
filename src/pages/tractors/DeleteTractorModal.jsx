export default function DeleteTractorModal({ tractor, handleDeleteConfirmation, showDeleteModal, setShowDeleteModal, setEditedItem }) {

    if (!showDeleteModal) return null

    const handleCancel = () => {
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
        setShowDeleteModal(false)
    }

    const handleDelete = (tractor) => {
        handleDeleteConfirmation(tractor)
        setShowDeleteModal(false)
    }

    return (
        <div className="overlay">
            <form className="modal-form">
                <div className="delete-tractor-header">
                    <h2>Confirm Delete Tractor {tractor.internalNum}</h2>
                    <p>This cannot be undone</p>
                </div>
                <div className="delete-tractor-body">
                    <div className="delete-tractor-row">
                        <p>Internal Num</p>
                        <p>{tractor.internalNum}</p>
                    </div>
                    <div className="delete-tractor-row">
                        <p>VIN</p>
                        <p>{tractor.vin}</p>
                    </div>
                    <div className="delete-tractor-row">
                        <p>MPG</p>
                        <p>{tractor.mpg}</p>
                    </div>
                    <div className="delete-tractor-row">
                        <p>Insurance</p>
                        <p>{tractor.insurance}</p>
                    </div>
                    <div className="delete-tractor-row">
                        <p>Tractor Lease</p>
                        <p>{tractor.tractorLease}</p>
                    </div>
                    <div className="delete-tractor-row">
                        <p>Trailer Lease</p>
                        <p>{tractor.trailerLease}</p>
                    </div>
                    <div className="delete-tractor-row">
                        <p>Height</p>
                        <p>{tractor.height.ft}'{tractor.height.in}"</p>
                    </div>
                    <div className="delete-tractor-row">
                        <p>Width</p>
                        <p>{tractor.width.ft}'{tractor.width.in}"</p>
                    </div>
                    <div className="delete-tractor-row">
                        <p>Weight</p>
                        <p>{tractor.weight} lbs.</p>
                    </div>
                </div>
                <div className="modal-actions">
                    <button onClick={handleDelete} className="modal-save-btn">Confirm</button>
                    <button onClick={handleCancel} className="modal-cancel-btn">Cancel</button>
                </div>
            </form>

        </div>

    )
}