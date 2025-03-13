import { useState, useEffect } from "react";

export default function Modal({ isOpen, onClose, editedItem, setEditedItem, onSave }) {

  const handleChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

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
              <h3 style={{marginBottom: '1rem'}}>{editedItem.name}</h3>
              <div className="modal-input-row">
                <label>
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={editedItem.name}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-input-row">
                <label>
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  value={editedItem.username}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-input-row">
                <label>
                  Email:
                </label>
                <input
                  type="text"
                  name="email"
                  value={editedItem.email}
                  onChange={handleChange}
                />
              </div>
          <div className="modal-actions">
            <button style={{backgroundColor: 'green'}} className="modal-btn" id="save-btn" type="submit" onClick={handleSubmit}>Save</button>
            <button style={{backgroundColor: 'red'}} className="modal-btn" id="cancel-btn" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};