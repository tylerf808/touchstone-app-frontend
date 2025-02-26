import { useState, useEffect } from "react";

export default function NewItemModal({ newItem, setNewItem, isOpen, onClose, handleSaveNewItem }) {

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="new-item">
        <form className="modal-form">
          <h3 style={{ justifySelf: 'flex-start', width: '100%' }}>New {newItem.accountType.charAt(0).toUpperCase()
            + newItem.accountType.slice(1)}</h3>
          {newItem.accountType === 'driver' && (
            <>
              <div className="modal-input-row">
                <label>
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={newItem?.name}
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
                  value={newItem?.username}
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
                  value={newItem?.email}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-input-row">
                <label>
                  Password:
                </label>
                <input
                  type="text"
                  name="password"
                  value={newItem?.password}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {newItem.accountType === 'dispatcher' && (
            <>
              <div className="modal-input-row">
                <label>
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={newItem?.name}
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
                  value={newItem?.username}
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
                  value={newItem?.email}
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
                  value={newItem?.company}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-input-row">
                <label>
                  Password:
                </label>
                <input
                  type="text"
                  name="password"
                  value={newItem?.password}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {newItem.accountType === 'tractor' && (
            <>
              <div className="modal-input-row">
                <label>
                  Internal Number:
                </label>
                <input
                  type="text"
                  name="internalNum"
                  value={newItem?.internalNum}
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
                  value={newItem?.vin}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-input-row">
                <label>
                  MPG:
                </label>
                <input
                  type="text"
                  name="email"
                  value={newItem?.email}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-input-row">
                <label>
                  Insurance (Monthly):
                </label>
                <input
                  type="text"
                  name="insurance"
                  value={newItem?.insurance}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-input-row">
                <label>
                  Height (Feet and Inches):
                </label>
                <input
                  type="text"
                  name="height"
                  value={newItem?.height}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-input-row">
                <label>
                  Width (Feet and Inches):
                </label>
                <input
                  type="text"
                  name="width"
                  value={newItem?.width}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-input-row">
                <label>
                  Weight (lbs):
                </label>
                <input
                  type="text"
                  name="weight"
                  value={newItem?.weight}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="modal-actions">
            <button className="modal-btn" id="save-btn" type="submit" onClick={(e) => {
              e.preventDefault()
              handleSaveNewItem()
              onClose()
            }
              }>Save</button>
            <button className="modal-btn" id="cancel-btn" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}