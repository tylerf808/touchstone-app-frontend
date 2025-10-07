

export default function DeleteModal({ user, handleDeleteConfirmation, showDeleteModal, setShowDeleteModal }) {

    if (!showDeleteModal) return null

    const handleCancel = () => {
        setShowDeleteModal(false)
    }

    const handleDelete = (user) => {
        handleDeleteConfirmation(user)
        setShowDeleteModal(false)
    }

    return (
        <div className="overlay">
            <div className="modal-form">
                <div className="delete-user-header">
                    <h2>Confirm Delete User</h2>
                    <p style={{color: 'red'}}>This cannot be undone</p>
                </div>
                <div className="delete-user-body">
                    <div className="delete-user-row">
                        <p>Name</p>
                        <p>{user.name}</p>
                    </div>
                    <div className="delete-user-row">
                        <p>Email</p>
                        <p>{user.email}</p>
                    </div>
                    <div className="delete-user-row">
                        <p>Username</p>
                        <p>{user.username}</p>
                    </div>
                    <div className="delete-user-row">
                        <p>Account Type</p>
                        <p>{user.accountType}</p>
                    </div>
                </div>
                <div className="modal-actions">
                    <button onClick={handleDelete} className="modal-save-btn">Confirm</button>
                    <button onClick={handleCancel} className="modal-cancel-btn">Cancel</button>
                </div>
            </div>

        </div>

    )
}