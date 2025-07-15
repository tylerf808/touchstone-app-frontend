import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../helpers/Context";
import DeleteTractorModal from "./DeleteTractorModal";
import EditTractorModal from "./EditTractorModal";
import NewTractorModal from "./NewTractorModal";
import './tractorsStyles.css'
import formatUSD from '../../helpers/currencyFormatter'

export default function Tractors() {

    const { apiUrl, loggedIn } = useContext(UserContext)

    const [tractors, setTractors] = useState([])
    const [visibleTractors, setVisibleTractors] = useState([])
    const [editingItem, setEditingItem] = useState({
        internalNum: '',
        vin: '',
        insurance: '',
        tractorLease: '',
        trailerLease: '',
        mpg: '',
        height: { ft: '', in: '' },
        width: { ft: '', in: '' },
        weight: ''
    })
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showNewModal, setShowNewModal] = useState(false)

    const token = localStorage.getItem('token')

    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedIn) {
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
            body: JSON.stringify({ _id: editingItem._id })
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
        <div className="tractors-container">
            <div className="tractors-header">
                <h2 style={{ fontSize: '2rem', marginLeft: '2rem' }}>Tractors</h2>
                <div className="tractor-header-inputs">
                    <p style={{ fontWeight: 'bold' }}>{tractors.length} Tractors</p>
                    <input onKeyUp={(e) => handleSearch(e)} type="text" placeholder="Search by internal number" className="users-search-input"></input>
                    <button className="add-tractor-btn" onClick={() => setShowNewModal(true)}>
                        <span style={{ color: 'white', fontSize: '1.5rem', marginRight: '.2rem' }}>+</span>Add Tractor
                    </button>
                </div>
            </div>
            <div className="tractor-list">
                {visibleTractors?.map((tractor, i) => {
                    return (
                        <div className="tractor-item" key={i}>
                            <div className="tractor-item-header">
                                <h3 style={{ marginTop: '1rem' }}>{tractor?.internalNum}</h3>
                                <div className="tractor-header-btns">
                                    <i onClick={() => {
                                        setEditingItem(tractor)
                                        setShowEditModal(true)
                                    }} className="fa fa-pencil" style={{ fontSize: '1.5rem', marginRight: '1rem' }}></i>
                                    <i onClick={() => {
                                        setEditingItem(tractor)
                                        setShowDeleteModal(true)
                                    }} className="fa fa-trash-o" style={{ color: 'red', fontSize: '1.5rem'}}></i>
                                </div>
                            </div>
                            <div className="tractor-info">
                                <div className="tractor-info-row">
                                    <p>VIN</p>
                                    <p>{tractor?.vin}</p>
                                </div>
                                <div className="tractor-info-row">
                                    <p>MPG</p>
                                    <p>{tractor?.mpg}</p>
                                </div>
                                <div className="tractor-info-row">
                                    <p>Insurance</p>
                                    <p>{formatUSD(tractor?.insurance)}</p>
                                </div>
                                <div className="tractor-info-row">
                                    <p>Tractor Lease</p>
                                    <p>{formatUSD(tractor?.tractorLease)}</p>
                                </div>
                                <div className="tractor-info-row">
                                    <p>Trailer Lease</p>
                                    <p>{formatUSD(tractor?.trailerLease)}</p>
                                </div>
                                <div className="tractor-info-row">
                                    <p>Height</p>
                                    <p>{tractor?.height.ft}' {tractor?.height.in}"</p>
                                </div>
                                <div className="tractor-info-row">
                                    <p>Width</p>
                                    <p>{tractor?.width.ft}' {tractor?.width.in}"</p>
                                </div>
                                <div className="tractor-info-row">
                                    <p>Weight</p>
                                    <p>{tractor?.weight} lbs.</p>
                                </div>
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
                setEditedItem={setEditingItem}
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