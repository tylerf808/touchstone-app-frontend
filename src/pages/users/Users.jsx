import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './usersStyles.css'
import UserContext from "../../helpers/Context";
import EditModal from "./EditModal"
import NewItemModal from "./NewItemModal";

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

    const handleSaveItem = async (editedItem) => {
        // if (editedItem.vin) {
        //     await fetch(apiUrl + '/api/tractor/editTractor', {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Authorization": token
        //         },
        //         body: JSON.stringify({
        //             internalNum: editedItem.internalNum,
        //             tractor: editedItem
        //         })
        //     }).then((res) => res.json()).then((updatedTractor) => {
        //         const filteredTractors = categories.tractors.filter((tractor) => tractor.internalNum !== updatedTractor.internalNum)
        //         filteredTractors.push(updatedTractor)
        //         setCategories({ drivers: categories.drivers, tractors: filteredTractors, dispatchers: categories.dispatchers })

        //     })
        // } else {
        //     await fetch(apiUrl + '/api/user/editUser', {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Authorization": token
        //         },
        //         body: JSON.stringify({
        //             user: editedItem
        //         })
        //     }).then((res) => res.json()).then((updatedUser) => {
        //         if (updatedUser.accountType === 'driver') {
        //             const filteredUsers = categories.drivers.filter((user) => user._id !== updatedUser._id)
        //             filteredUsers.push(updatedUser)
        //             setCategories({ drivers: filteredUsers, tractors: categories.tractors, dispatchers: categories.dispatchers })

        //         } else {
        //             const filteredUsers = categories.dispatchers.filter((user) => user._id !== updatedUser._id)
        //             filteredUsers.push(updatedUser)
        //             setCategories({ drivers: categories.drivers, tractors: categories.tractors, dispatchers: filteredUsers })

        //         }
        //     })
        // }
    }

    const handleSaveNewItem = async () => {

        // await fetch(apiUrl + '/api/user/newTractorOrUser', {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": token
        //     },
        //     body: JSON.stringify({
        //         accountType: newItem.accountType,
        //         newItem: newItem
        //     })
        // }).then(() => {
        //     switch (newItem.accountType) {
        //         case 'driver':
        //             const newDrivers = [...categories.drivers, newItem]
        //             console.log(newDrivers)
        //             setCategories({ drivers: newDrivers, tractors: categories.tractors, dispatchers: categories.dispatchers })
        //             break;
        //         case 'dispatcher':
        //             const newDispatchers = [...categories.dispatchers, newItem]
        //             setCategories({ drivers: newDrivers, tractors: categories.tractors, dispatchers: newDispatchers })
        //             break;
        //         default:
        //             const newTractors = [...categories.tractors, newItem]
        //             setCategories({ drivers: newDrivers, tractors: newTractors, dispatchers: categories.dispatchers })
        //             break;
        //     }
        // })
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
                    <input onKeyUp={(e) => handleSearch(e)} type="text" placeholder="Search" className="users-search-input"></input>
                    <button className="add-user-btn">
                        <span style={{ color: 'white', fontSize: '1.5rem', marginRight: '.2rem' }}>+</span>Add User
                    </button>
                </div>
            </div>
            <div className="users-display-container">
                <div className="users-list">
                    {visibleUsers?.map((user) => {
                        return (
                            <div className="user-item">
                                <div className="user-info">
                                    <h3>{user?.name}</h3>
                                    <p>{user?.email}</p>
                                    <p>{user?.username}</p>
                                </div>
                                <div className="user-item-btns">
                                    <i class="fa fa-pencil" style={{ fontSize: '1.5rem' }}></i>
                                    <i class="fa fa-trash-o" style={{ color: 'red', fontSize: '1.5rem', marginLeft: '2rem' }}></i>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>


            <EditModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                editedItem={editingItem}
                setEditedItem={setEditingItem}
                category={selectedCategory}
                onSave={handleSaveItem}
            />
            <NewItemModal
                newItem={newItem}
                setNewItem={setNewItem}
                isOpen={newModalOpen}
                onClose={handleCloseNewModal}
                handleSaveNewItem={handleSaveNewItem}
            />
        </div>
    )
}