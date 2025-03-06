

export default function DeleteModal({ user, handleDeleteConfirmation, showDeleteModal, setShowDeleteModal }) {

    if(!showDeleteModal) return null

    const handleCancel = () => {
        setShowDeleteModal(false)
    }

    const handleDelete = (user) => {
        handleDeleteConfirmation(user)
        setShowDeleteModal(false)
    }

    return (
        <div className="overlay">
                <div className="delete-modal-container">
                    <div className="delete-modal-header">
                        <h2>Confirm Delete User</h2>
                        <p>This cannot be undone</p>
                    </div>
                    <div className="delete-modal-body">
                        <p>Name: <span style={{fontWeight: 'normal'}}>{user.name}</span></p>
                        <p>Email: <span style={{fontWeight: 'normal'}}>{user.email}</span></p>
                        <p>Username: <span style={{fontWeight: 'normal'}}>{user.username}</span></p>
                    </div>
                    <div className="delete-modal-btn-container">
                        <button onClick={handleDelete} style={{backgroundColor: 'rgb(216, 4, 4)'}} className="delete-modal-btn">Confirm</button>
                        <button onClick={handleCancel} style={{backgroundColor: 'rgb(12, 159, 22)'}} className="delete-modal-btn">Cancel</button>
                    </div>
                </div>

        </div>

    )
}