export default function ConfirmationModal({ handleDelete, setShowModal, getJobs }) {

    const handleConfirm = async () => {
        console.log("Confirm clicked");
        await handleDelete();
        console.log("handleDelete finished");
        await getJobs();
        console.log("getJobs finished")
        setShowModal(false);
        console.log("setShowModal called");
    }

    return (
        <div className="overlay">
            <div className="modal-form" style={{ padding: '2rem' }}>
                <h3 style={{ color: 'red', marginBottom: '1rem' }}>Confirm Delete Selected Loads</h3>
                <p style={{ textAlign: 'center' }}>Deletions cannot be undone. Are you sure you want to delete these previous loads?</p>
                <div style={{
                    width: '90%', display: 'flex', flexDirection: 'row',
                    justifyContent: 'space-evenly', alignItems: 'center', marginTop: '2rem'
                }}>
                    <button
                        className="modal-save-btn"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </button>
                    <button className="modal-cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}