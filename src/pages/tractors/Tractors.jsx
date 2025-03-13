import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../helpers/Context";
import DeleteTractorModal from "./DeleteTractorModal";
import EditTractorModal from "./EditTractorModal";
import NewTractorModal from "./NewTractorModal";
import './tractorsStyles.css'
import formatUSD from '../../helpers/currencyFormatter'

export default function Tractors() {

    const { apiUrl } = useContext(UserContext)

    const [tractors, setTractors] = useState([])
    const [visibleTractors, setVisibleTractors] = useState([])
    const [editingItem, setEditingItem] = useState()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showNewModal, setShowNewModal] = useState(false)

    const token = localStorage.getItem('token')

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/')
        } else {
            getTractors()
        }
    }, [])

    const getTractors = async () => {
        await fetch(apiUrl + '/api/tractor/getTractors', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        }).then((res) => res.json()).then((data) => {
            setTractors(data)
            setVisibleTractors(data)
        })
    }

    const handleSearch = (e) => {
        const searchedInternalNum = e.target.value.toString()
        if (searchedInternalNum === '') {
            setVisibleTractors(tractors)
        } else if (e.key === 'Backspace') {
            const searchedTractors = []
            tractors.forEach((tractor) => {
                const tractorInternalNum = tractor.internalNum.toString()
                if (tractorInternalNum.includes(searchedInternalNum)) {
                    searchedTractors.push(tractor)
                }
            })
            setVisibleTractors(searchedTractors)
        } else {
            const searchedTractors = []
            tractors.forEach((tractor) => {
                const tractorInternalNum = tractor.internalNum.toString()
                if (tractorInternalNum.includes(searchedInternalNum)) {
                    searchedTractors.push(tractor)
                }
            })
            setVisibleTractors(searchedTractors)
        }
    }

    const handleEditConfirmation = async (editingItem) => {
        await fetch(apiUrl + '/api/tractor/editTractor', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(editingItem)
        }).then((res) => res.json())
        getTractors()
    }

    const handleDeleteConfirmation = async () => {
        await fetch(apiUrl + '/api/tractor/deleteTractor', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ internalNum: editingItem.internalNum })
        }).catch((err) => console.log(err))
        getTractors()
    }

    const handleNewConfirmation = async () => {
        await fetch(apiUrl + '/api/tractor/newTractor', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(editingItem)
        }).catch((err) => console.log(err))
        getTractors()
    }

    return (
        <div className="users-container">
            <div className="users-header">
                <div className="users-header-text">
                    <h2 style={{ fontSize: '2rem' }}>Tractors</h2>
                </div>
                <div className="users-header-inputs">
                    <p style={{ fontWeight: 'bold' }}>{tractors.length} Tractors</p>
                    <input onKeyUp={(e) => handleSearch(e)} type="text" placeholder="Search by internal number" className="users-search-input"></input>
                    <button className="add-user-btn" onClick={() => setShowNewModal(true)}>
                        <span style={{ color: 'white', fontSize: '1.5rem', marginRight: '.2rem' }}>+</span>Add Tractor
                    </button>
                </div>
            </div>

            <div className="tractor-list">
                {visibleTractors?.map((tractor, i) => {
                    return (
                        <div className="tractor-item" key={i}>
                            <div className="tractor-info">
                                <h3>{tractor?.internalNum}</h3>
                                <p>VIN: {tractor?.vin}</p>
                                <p>Insurance: {formatUSD(tractor?.insurance)}</p>
                                <p>MPG: {tractor?.mpg}</p>
                                <p>Height: {tractor?.height}</p>
                                <p>Width: {tractor?.width}</p>
                                <p>Weight: {tractor?.weight}</p>
                            </div>
                            <div className="user-item-btns">
                                <i onClick={() => {
                                    setEditingItem(tractor)
                                    setShowEditModal(true)
                                }} className="fa fa-pencil" style={{ fontSize: '1.5rem' }}></i>
                                <i onClick={() => {
                                    setEditingItem(tractor)
                                    setShowDeleteModal(true)
                                }} className="fa fa-trash-o" style={{ color: 'red', fontSize: '1.5rem', marginLeft: '2rem' }}></i>
                            </div>
                        </div>
                    )
                })}
            </div>
            <DeleteTractorModal
                setShowDeleteModal={setShowDeleteModal}
                tractor={editingItem}
                handleDeleteConfirmation={handleDeleteConfirmation}
                showDeleteModal={showDeleteModal}
            />
            <EditTractorModal
                tractor={editingItem}
                setShowEditModal={setShowEditModal}
                isOpen={showEditModal}
                editedItem={editingItem}
                setEditedItem={setEditingItem}
                onSave={handleEditConfirmation}
            />
            <NewTractorModal
                editedItem={editingItem}
                setEditedItem={setEditingItem}
                setShowNewModal={setShowNewModal}
                isOpen={showNewModal}
                onSave={handleNewConfirmation}
            />
        </div>
    )
}