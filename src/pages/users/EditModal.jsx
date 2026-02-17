import { useState, useEffect } from "react";

export default function Modal({ isOpen, onClose, editedItem, setEditedItem, onSave, tractors }) {

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
      <form className="modal-form" onSubmit={handleSubmit}>
        <h3 style={{ marginBottom: '1rem' }}>{editedItem.name}</h3>
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
        {editedItem.accountType === 'driver' ?
          <div className="modal-input-row">
            <label>
              Assigned Tractor:
            </label>
            <select defaultValue={editedItem.assignedTractor} onChange={(e) => {
              console.log(editedItem)
              setEditedItem({ ...editedItem, assignedTractor: e.target.value })
            }}>
              {tractors.map((tractor) => {
                return (
                  <option value={tractor.internalNum}>{tractor.internalNum}</option>
                )
              })}
            </select>
          </div> : null}
        <div className="modal-actions">
          <button className="modal-save-btn" onClick={handleSubmit}>Save</button>
          <button className="modal-cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};