import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './driversStyles.css'
import UserContext from "../../helpers/Context";
import EditModal from "./EditModal"
import NewItemModal from "./NewItemModal";

export default function Drivers() {

    const { user, apiUrl } = useContext(UserContext)

    const [selectedCategory, setSelectedCategory] = useState('drivers')
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
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

    useEffect(() => {
        console.log("Modal open:", modalOpen);
    }, [modalOpen]);

    useEffect(() => {
        console.log("Editing item:", editingItem);
    }, [editingItem]);

    const getItems = async () => {

        const usersAndTractors = await fetch(apiUrl + '/api/user/tractorsAndUsers', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        }).then((res) => res.json())
        setCategories(usersAndTractors)
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
    }

    const handleEditItem = (item) => {
        setEditingItem(item);
        setModalOpen(true);
    };

    const handleNewItem = (newItem) => {
        
    }

    const handleCloseModal = () => {
        setModalOpen(false);
        setEditingItem(null);
    };

    const handleCloseNewModal = () => {
        setNewModalOpen(false)
    }

    const setUpdatedItem = async (updatedItem) => {

        await fetch(apiUrl + '/api/user/updateTractorsAndUsers', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                accountType: updatedItem.accountType,
                updatedItem: updatedItem
            })
        }).then((res) => res.json()).then((data) => setCategories(data))
    }

    const setNewObject = async (newObj) => {

    }

    const handleSaveItem = async () => {
        setUpdatedItem(editingItem)
    };

    const handleSaveNewItem = async () => {

    }

    const renderObject = (item) => {
        switch (selectedCategory) {
            case 'drivers':
                const name = item.name
                return (
                    <div>
                        <div className="object-item-header">
                            <h3>{name}</h3>
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
                    {Object.keys(categories)?.map((category) => (
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
                                <div className="add-item" id="add-driver">
                                    <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>&#43;</span>
                                </div>
                            </>
                        )}
                        {selectedCategory === 'tractors' && (
                            <>
                                <div className="add-item" id="add-tractor">
                                    <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>&#43;</span>
                                </div>
                            </>
                        )}
                        {selectedCategory === 'dispatchers' && (
                            <>
                                <div onClick={(e) => {

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
                    
                />
            </div>
        </div>
    )
}