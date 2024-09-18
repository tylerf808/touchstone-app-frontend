import { useState, useEffect } from "react";

export default function Modal({ isOpen, onClose, editedItem, setEditedItem, category, onSave }) {

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
          {category === 'drivers' && (
            <>
              <h3>{editedItem.name}</h3>
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
            </>
          )}
          {category === 'tractors' && (
            <>
              <h3>{editedItem.internalNum}</h3>
              <div className="modal-input-row">
                <label>
                  Internal Number:
                </label>
                <input
                  type="text"
                  name="internalNum"
                  value={editedItem.internalNum}
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
                  value={editedItem.vin}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-input-row">
                <label>
                  MPG:
                </label>
                <input
                  type="text"
                  name="mpg"
                  value={editedItem.mpg}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-input-row">
                <label>
                  Insurance:
                </label>
                <input
                  type="text"
                  name="insurance"
                  value={editedItem.insurance}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {category === 'dispatchers' && (
            <>
              <h3>{editedItem.name}</h3>
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
              <div className="modal-input-row">
                <label>
                  Company:
                </label>
                <input
                  type="text"
                  name="company"
                  value={editedItem.company}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="modal-actions">
            <button className="modal-btn" id="save-btn" type="submit">Save</button>
            <button className="modal-btn" id="cancel-btn" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};