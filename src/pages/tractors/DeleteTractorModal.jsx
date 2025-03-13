

export default function DeleteTractorModal({ tractor, handleDeleteConfirmation, showDeleteModal, setShowDeleteModal }) {

    if(!showDeleteModal) return null

    const handleCancel = () => {
        setShowDeleteModal(false)
    }

    const handleDelete = (tractor) => {
        handleDeleteConfirmation(tractor)
        setShowDeleteModal(false)
    }

    return (
        <div className="overlay">
                <div className="delete-modal-container">
                    <div className="delete-modal-header">
                        <h2>Confirm Delete Tractor</h2>
                        <p>This cannot be undone</p>
                    </div>
                    <div className="delete-modal-body">
                        <p>Internal Num: <span style={{fontWeight: 'normal'}}>{tractor.internalNum}</span></p>
                        <p>VIN: <span style={{fontWeight: 'normal'}}>{tractor.vin}</span></p>
                        <p>Insurance: <span style={{fontWeight: 'normal'}}>${tractor.insurance}</span></p>
                        <p>MPG: <span style={{fontWeight: 'normal'}}>{tractor.mpg}</span></p>
                    </div>
                    <div className="delete-modal-btn-container">
                        <button onClick={handleDelete} style={{backgroundColor: 'rgb(216, 4, 4)'}} className="delete-modal-btn">Confirm</button>
                        <button onClick={handleCancel} style={{backgroundColor: 'rgb(12, 159, 22)'}} className="delete-modal-btn">Cancel</button>
                    </div>
                </div>

        </div>

    )
}