import { useState, useEffect } from "react";

export default function NewItemModal ({newItem, setNewItem, isOpen, onClose, accountType}) {

    const handleChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
      };

    return(
        <div className="new-item">
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
        </div>
    )
}