import { useState, useEffect } from "react";

export default function NewItemModal({ newItem, setNewItem, isOpen, onClose, handleSaveNewItem }) {

  const [emailConf, setEmailConf] = useState('')
  const [showEmailAlert, setShowEmailAlert] = useState(false)

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // ensure accountType is never blank when the modal opens
  useEffect(() => {
    if (!newItem.accountType) return
    // nothing else to do; value is shown disabled
  }, [newItem.accountType]);

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <form className="modal-form w-[26rem]">
        <h3 style={{marginBottom: '.5rem'}}>New User</h3>
        <p>A sign up link will be sent to the email provided</p>
        <p style={{ marginBottom: '1rem', fontStyle: 'italic' }}>Expires after 24 hours</p>
        {showEmailAlert && <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '.5rem' }}>Emails do not match</p>}
        <div className="modal-input-row">
          <label>Name</label>
          <input onChange={(e) => handleChange(e)} type="text" name="name"></input>
        </div>
        <div className="modal-input-row">
          <label>Email</label>
          <input onChange={(e) => handleChange(e)} type="email" name="email"></input>
        </div>
        <div className="modal-input-row">
          <label>Confirm Email</label>
          <input onChange={(e) => setEmailConf(e.target.value)} type="email" name="emailConf"></input>
        </div>
        <div className="modal-input-row">
          <label>Account Type</label>
          <input type="text" name="accountType" value={newItem.accountType} disabled />
        </div>
        <div className="modal-actions">
          <button className="modal-save-btn" type="submit" onClick={(e) => {
            e.preventDefault()
            if (emailConf !== newItem.email) {
              setShowEmailAlert(true)
            } else {
              setShowEmailAlert(false)
              handleSaveNewItem()
              onClose()
            }
          }}>Save</button>
          <button className="modal-cancel-btn" type="button" onClick={() => {
            setShowEmailAlert(false)
            onClose()
          }}>Cancel</button>
        </div>
      </form>
    </div>
  )
}