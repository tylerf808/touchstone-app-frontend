import { useState, useEffect } from "react";

export default function NewItemModal({ newItem, setNewItem, isOpen, onClose, handleSaveNewItem }) {

  const [emailConf, setEmailConf] = useState('')
  const [showEmailAlert, setShowEmailAlert] = useState(false)

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <form className="modal-form">
        <h3 style={{marginBottom: '.5rem'}}>New User</h3>
        <p>A sign up link will be sent to the email provided</p>
        <p style={{ marginBottom: '1rem', fontStyle: 'italic' }}>Expires after 24 hours</p>
        {showEmailAlert && <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '.5rem' }}>Emails do not match</p>}
        <div className="modal-input-row">
          <label>Name:</label>
          <input onChange={(e) => handleChange(e)} type="text" name="name"></input>
        </div>
        <div className="modal-input-row">
          <label>Email:</label>
          <input onChange={(e) => handleChange(e)} type="email" name="email"></input>
        </div>
        <div className="modal-input-row">
          <label>Confirm Email:</label>
          <input onChange={(e) => setEmailConf(e.target.value)} type="email" name="emailConf"></input>
        </div>
        <div className="modal-input-row">
          <label>Account Type:</label>
          <select style={{ width: '8.2rem', justifySelf: 'flex-end' }} onChange={(e) => handleChange(e)} name="accountType">
            <option value="" disabled selected>Select User Type</option>
            <option value='driver'>Driver</option>
            <option value='dispatcher'>Dispatcher</option>
          </select>
        </div>
        <div className="modal-actions">
          <button style={{ backgroundColor: 'green' }} className="modal-btn" id="save-btn" type="submit" onClick={(e) => {
            e.preventDefault()
            if (emailConf !== newItem.email) {
              setShowEmailAlert(true)
            } else {
              setShowEmailAlert(false)
              handleSaveNewItem()
              onClose()
            }
          }}>Save</button>
          <button style={{ backgroundColor: 'red' }} className="modal-btn" id="cancel-btn" type="button" onClick={() => {
            setShowEmailAlert(false)
            onClose()
          }}>Cancel</button>
        </div>
      </form>
    </div>
  )
}