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

    const { user, apiUrl, loggedIn } = useContext(UserContext)

    const [selectedCategory, setSelectedCategory] = useState('drivers')
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(false);
    const [newModalOpen, setNewModalOpen] = useState(false)
    const [newItem, setNewItem] = useState()
    const [users, setUsers] = useState([])
    const [pendingUsers, setPendingUsers] = useState([])
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
            setUsers(data.users)
            setPendingUsers(data.pendingUsers)
            const filteredDrivers = data.users.filter((user) => user.accountType === "driver" || user.accountType === 'Driver')
            const filteredPendingDrivers = data.pendingUsers.filter((user) => user.accountType === 'driver' || user.accountType === 'Driver')
            const allDrivers = filteredDrivers.concat(filteredPendingDrivers)
            setDrivers(allDrivers)
            const filteredDispatchers = data.users.filter((user) => user.accountType === "dispatcher" || user.accountType === 'Dispatcher')
            const filteredPendingDispatchers = data.pendingUsers.filter((user) => user.accountType === 'dispatcher' || user.accountType === 'Dispatcher')
            const allDispatchers = filteredDispatchers.concat(filteredPendingDispatchers)
            setDispatchers(allDispatchers)
            const allUsers = allDrivers.concat(allDispatchers)
            setVisibleUsers(allUsers)
            console.log(data.users)
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

    const handleResendConfirmation = async (user) => {
        console.log(user)
        await fetch(apiUrl + '/api/user/sendConfirmationEmail', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(user)
        }).catch((err) => console.log(err))
    }

    return (
        <div style={{position: 'relative', top: '4rem'}} className="users-container">
            <div className="users-header">
                <div className="users-header-text">
                    <h2>Users</h2>
                    <div className="users-header-stats">
                        <p>{drivers.length} Drivers</p>
                        <p>{dispatchers.length} Dispatcher{dispatchers.length > 1 && <>s</>}</p>
                    </div>
                </div>
                <div className="users-header-inputs">
                    <input onKeyUp={(e) => handleSearch(e)} type="text" placeholder="Search by name" className="users-search-input"></input>
                    <button onClick={() => setNewModalOpen(true)} className="add-user-btn">
                        <span style={{marginRight: '.25rem', fontSize: '1.2rem'}}>+</span>Add User
                    </button>
                </div>
            </div>
            <div className="users-display-container">
                <div className="users-list">
                    {visibleUsers?.map((user, i) => {
                        return (
                            <div className="user-item" key={i}>
                                <div className="user-item-header">
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        {user.accountType.toLowerCase() === 'driver' && <img style={{ height: '2rem', marginRight: '.5rem' }} src={driverIcon}></img>}
                                        {user.accountType.toLowerCase() === 'dispatcher' && <img style={{ height: '2rem', marginRight: '.5rem' }} src={dispatcherIcon}></img>}
                                        <h3>{user?.name}</h3>
                                        {user.confirmationCode && <p style={{ fontStyle: 'italic', marginLeft: '1rem' }}>Pending User</p>}
                                    </div>
                                    <div>
                                        <div className="user-item-btns">
                                            {user.confirmationCode ? null : <i onClick={() => handleEditItem(user)} className="fa fa-pencil" style={{ fontSize: '1.5rem' }}></i>}
                                            <i onClick={() => {
                                                setEditingItem(user)
                                                setShowDeleteModal(true)
                                            }} className="fa fa-trash-o" style={{ color: 'red', fontSize: '1.5rem', marginLeft: '1rem' }}></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-info">
                                    <div className="user-info-row">
                                        <p>Email</p>
                                        <p>{user?.email}</p>
                                    </div>
                                    {user.confirmationCode ?
                                        null
                                        :
                                        <div className="user-info-row">
                                            <p>Username</p>
                                            <p>{user?.username}</p>
                                        </div>
                                    }
                                    <div className="user-info-row">
                                        <p>Account Type</p>
                                        <p>{user?.accountType}</p>
                                    </div>
                                    {user.confirmationCode && <button style={{ width: '12rem', marginTop: '1rem' }} className="modal-save-btn"
                                        onClick={() => handleResendConfirmation(user)}>Resend Verification Email</button>}
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