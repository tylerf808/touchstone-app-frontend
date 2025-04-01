import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './usersStyles.css'
import UserContext from "../../helpers/Context";
import EditModal from "./EditModal"
import NewItemModal from "./NewItemModal";
import DeleteModal from "./DeleteModal";
import driverIcon from '../../images/driver-icon.png'
import dispatcherIcon from '../../images/dispatcher-icon.png'

export default function Users() {

    const { user, apiUrl } = useContext(UserContext)

    const [selectedCategory, setSelectedCategory] = useState('drivers')
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(false);
    const [newModalOpen, setNewModalOpen] = useState(false)
    const [newItem, setNewItem] = useState()
    const [users, setUsers] = useState([])
    const [drivers, setDrivers] = useState([])
    const [dispatchers, setDispatchers] = useState([])
    const [visibleUsers, setVisibleUsers] = useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const token = localStorage.getItem('token')

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/')
        } else {
            getUsers()
        }
    }, [])

    const getUsers = async () => {

        await fetch(apiUrl + '/api/user/getUsers', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        }).then((res) => res.json()).then((data) => {
            setUsers(data)
            setVisibleUsers(data)
            const filteredDrivers = data.filter((user) => user.accountType === "driver")
            setDrivers(filteredDrivers)
            const filteredDispatchers = data.filter((user) => user.accountType === "dispatcher")
            setDispatchers(filteredDispatchers)
        })
    }

    const handleEditItem = (item) => {
        setEditingItem(item);
        setModalOpen(true);
    };

    const handleNewItem = (accountType) => {
        setNewItem({ ...newItem, accountType: accountType })
        setNewModalOpen(true)
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        setEditingItem(null);
    };

    const handleCloseNewModal = () => {
        setNewModalOpen(false)
    }

    const handleSearch = (e) => {
        if (e.target.value === '') {
            setVisibleUsers(users)
        } else if (e.key === 'Backspace') {
            const searchedUsers = []
            const search = e.target.value.toLowerCase()
            users.forEach((user) => {
                const usersName = user.name.toLowerCase()
                if (usersName.includes(search)) {
                    searchedUsers.push(user)
                }
            })
            setVisibleUsers(searchedUsers)
        } else {
            const searchedUsers = []
            const search = e.target.value.toLowerCase()
            users.forEach((user) => {
                const usersName = user.name.toLowerCase()
                if (usersName.includes(search)) {
                    searchedUsers.push(user)
                }
            })
            setVisibleUsers(searchedUsers)
        }
    }

    const handleNewItemConfirmation = async () => {
        await fetch(apiUrl + '/api/user/newPendingUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(newItem)
        }).catch((err) => console.log(err))
        getUsers()
    }

    const handleEditConfirmation = async () => {
        await fetch(apiUrl + '/api/user/editUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(editingItem)
        }).catch((err) => console.log(err))
        getUsers()
    }

    const handleDeleteConfirmation = async () => {
        console.log(editingItem)
        await fetch(apiUrl + '/api/user/deleteUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ user: editingItem })
        }).catch((err) => console.log(err))
        getUsers()
    }

    return (

        <div className="users-container">
            <div className="users-header">
                <div className="users-header-text">
                    <h2 style={{ fontSize: '2rem' }}>Drivers and Dispatchers</h2>
                </div>
                <div className="users-header-inputs">
                    <p style={{ fontWeight: 'bold' }}>{users.length} Users</p>
                    <p>{drivers.length} Drivers</p>
                    <p>{dispatchers.length} Dispatcher{dispatchers.length > 1 && <>s</>}</p>
                    <input onKeyUp={(e) => handleSearch(e)} type="text" placeholder="Search by name" className="users-search-input"></input>
                    <button onClick={() => setNewModalOpen(true)} className="add-user-btn">
                        <span style={{ color: 'white', fontSize: '1.5rem', marginRight: '.2rem' }}>+</span>Add User
                    </button>
                </div>
            </div>
            <div className="users-display-container">
                <div className="users-list">
                    {visibleUsers?.map((user, i) => {
                        return (
                            <div className="user-item" key={i}>
                                <div className="user-info">
                                    {user.accountType === 'driver' && <img style={{ height: '2.5rem', marginRight: '1rem' }} src={driverIcon}></img>}
                                    {user.accountType === 'dispatcher' && <img style={{ height: '2rem', marginRight: '1.5rem' }} src={dispatcherIcon}></img>}
                                    <h3>{user?.name}</h3>
                                    <p>{user?.email}</p>
                                    <p>{user?.username}</p>
                                </div>
                                <div className="user-item-btns">
                                    <i onClick={() => handleEditItem(user)} className="fa fa-pencil" style={{ fontSize: '1.5rem' }}></i>
                                    <i onClick={() => {
                                        setEditingItem(user)
                                        setShowDeleteModal(true)
                                    }} className="fa fa-trash-o" style={{ color: 'red', fontSize: '1.5rem', marginLeft: '2rem' }}></i>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <DeleteModal
                setShowDeleteModal={setShowDeleteModal}
                user={editingItem}
                handleDeleteConfirmation={handleDeleteConfirmation}
                showDeleteModal={showDeleteModal}
            />
            <EditModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                editedItem={editingItem}
                setEditedItem={setEditingItem}
                category={selectedCategory}
                onSave={handleEditConfirmation}
            />
            <NewItemModal
                newItem={newItem}
                setNewItem={setNewItem}
                isOpen={newModalOpen}
                onClose={handleCloseNewModal}
                handleSaveNewItem={handleNewItemConfirmation}
            />
        </div>
    )
}