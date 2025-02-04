import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './driversStyles.css'
import UserContext from "../../helpers/Context";
import EditModal from "./EditModal"
import NewItemModal from "./NewItemModal";
import { computeColumnTypes } from "@mui/x-data-grid/hooks/features/columns/gridColumnsUtils";

export default function Drivers() {

    const { user, apiUrl } = useContext(UserContext)

    const [selectedCategory, setSelectedCategory] = useState('drivers')
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(false);
    const [newModalOpen, setNewModalOpen] = useState(false)
    const [newItem, setNewItem] = useState()
    const [categories, setCategories] = useState({ drivers: [], tractors: [], dispatchers: [] })

    const token = localStorage.getItem('token')

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/')
        } else {
            getItems()
        }
    }, [])

    const getItems = async () => {

        const usersAndTractors = await fetch(apiUrl + '/api/user/tractorsAndUsers', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        }).then((res) => res.json())

        const processedCategories = {
            drivers: usersAndTractors[0],
            tractors: usersAndTractors[1],
            dispatchers: usersAndTractors[2]
        }
        console.log(processedCategories)
        setCategories(processedCategories)
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
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
        if (editedItem.vin) {
            await fetch(apiUrl + '/api/tractor/editTractor', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({
                    internalNum: editedItem.internalNum,
                    tractor: editedItem
                })
            }).then((res) => res.json()).then((updatedTractor) => {
                const filteredTractors = categories.tractors.filter((tractor) => tractor.internalNum !== updatedTractor.internalNum)
                filteredTractors.push(updatedTractor)
                setCategories({ drivers: categories.drivers, tractors: filteredTractors, dispatchers: categories.dispatchers })
            })
        } else {
            await fetch(apiUrl + '/api/user/editUser', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({
                    user: editedItem
                })
            }).then((res) => res.json()).then((updatedUser) => {
                if (updatedUser.accountType === 'driver') {
                    const filteredUsers = categories.drivers.filter((user) => user._id !== updatedUser._id)
                    filteredUsers.push(updatedUser)
                    setCategories({ drivers: filteredUsers, tractors: categories.tractors, dispatchers: categories.dispatchers })
                } else {
                    const filteredUsers = categories.dispatchers.filter((user) => user._id !== updatedUser._id)
                    filteredUsers.push(updatedUser)
                    setCategories({ drivers: categories.drivers, tractors: categories.tractors, dispatchers: filteredUsers })
                }
            })
        }
    }

    const handleSaveNewItem = async () => {

        await fetch(apiUrl + '/api/user/newTractorOrUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                accountType: newItem.accountType,
                newItem: newItem
            })
        })
    }

    const renderObject = (item) => {
        switch (selectedCategory) {
            case 'drivers':
                return (
                    <div>
                        <div className="object-item-header">
                            <h3>{item.name}</h3>
                            <i id="edit-btn" className="fa fa-pencil"
                                onClick={() => handleEditItem(item)} style={{ fontSize: '1.5em' }} ></i>
                        </div>
                        <p>Username: {item.username}</p>
                        <p>Email: {item.email}</p>
                    </div>
                )
            case 'tractors':
                return (
                    <div>
                        <div className="object-item-header">
                            <h3>{item.internalNum}</h3>
                            <i id="edit-btn" className="fa fa-pencil"
                                onClick={() => handleEditItem(item)} style={{ fontSize: '1.5em' }} ></i>
                        </div>
                        <p>MPG: {item.mpg}</p>
                        <p>Insurance: {item.insurance}</p>
                        <p>VIN: {item.vin}</p>
                        <p>Internal Number: {item.internalNum}</p>
                        <p>Height: {item.height}</p>
                        <p>Width: {item.width}</p>
                        <p>Weight: {item.weight}</p>
                    </div>
                )
            case 'dispatchers':
                return (
                    <div>
                        <div className="object-item-header">
                            <h3>{item.name}</h3>
                            <i id="edit-btn" className="fa fa-pencil"
                                onClick={() => handleEditItem(item)} style={{ fontSize: '1.5em' }} ></i>
                        </div>
                        <p>Email: {item.email}</p>
                        <p>Username: {item.username}</p>
                        <p>Company: {item.company}</p>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="pageContainer">
            <div className="displayContainer">
                <div className="categories">
                    {Object.keys(categories).map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategorySelect(category)}
                            className={selectedCategory === category ? 'active' : ''}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="objects">
                    {categories[selectedCategory]?.map((item) => (
                        <div key={item._id} className="object-item">
                            {renderObject(item)}
                        </div>
                    ))}
                    <div className="plus-object">
                        {selectedCategory === 'drivers' && (
                            <>
                                <div onClick={() => {
                                    handleNewItem('driver')
                                }} className="add-item" id="add-driver">
                                    <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>&#43;</span>
                                </div>
                            </>
                        )}
                        {selectedCategory === 'tractors' && (
                            <>
                                <div onClick={() => {
                                    handleNewItem('tractor')
                                }} className="add-item" id="add-tractor">
                                    <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>&#43;</span>
                                </div>
                            </>
                        )}
                        {selectedCategory === 'dispatchers' && (
                            <>
                                <div onClick={() => {
                                    handleNewItem('dispatcher')
                                }} className="add-item" id="add-dispatcher">
                                    <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>&#43;</span>
                                </div>
                            </>
                        )}
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
        </div>
    )
}