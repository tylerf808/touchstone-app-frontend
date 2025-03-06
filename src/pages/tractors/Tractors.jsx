import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../helpers/Context";

export default function Tractors() {

    const { apiUrl } = useContext(UserContext)

    const [tractors, setTractors] = useState([])

    const token = localStorage.getItem('token')

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/')
        } else {
            getTractors()
        }
    }, [])

    const getTractors = async() => {
        await fetch(apiUrl + '/api/tractor/getTractors', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setTractors(data)})
    }

    // const handleSearch = (e) => {
    //     if (e.target.value === '') {
    //         setVisibleUsers(users)
    //     } else if (e.key === 'Backspace') {
    //         const searchedUsers = []
    //         const search = e.target.value.toLowerCase()
    //         users.forEach((user) => {
    //             const usersName = user.name.toLowerCase()
    //             if (usersName.includes(search)) {
    //                 searchedUsers.push(user)
    //             }
    //         })
    //         setVisibleUsers(searchedUsers)
    //     } else {
    //         const searchedUsers = []
    //         const search = e.target.value.toLowerCase()
    //         users.forEach((user) => {
    //             const usersName = user.name.toLowerCase()
    //             if (usersName.includes(search)) {
    //                 searchedUsers.push(user)
    //             }
    //         })
    //         setVisibleUsers(searchedUsers)
    //     }
    // }

    return (
        <div className="users-container">
                    <div className="users-header">
                        <div className="users-header-text">
                            <h2 style={{ fontSize: '2rem' }}>Tractors</h2>
                        </div>
                        <div className="users-header-inputs">
                            <p style={{ fontWeight: 'bold' }}>{tractors.length} Tractors</p>
                            <input type="text" placeholder="Search by internal number" className="users-search-input"></input>
                            <button className="add-user-btn">
                                <span style={{ color: 'white', fontSize: '1.5rem', marginRight: '.2rem' }}>+</span>Add Tractor
                            </button>
                        </div>
                    </div>
                    <div className="users-display-container">
                        <div className="users-list">
                            {tractors?.map((tractor) => {
                                return (
                                    <div className="user-item">
                                        <div className="user-info">
                                            <h3>{tractor?.internalNum}</h3>
                                            <p>VIN {tractor?.vin}</p>
                                            <p>Insurance ${tractor?.insurance}</p>
                                            <p>MPG {tractor?.mpg}</p>
                                        </div>
                                        <div className="user-item-btns">
                                            <i class="fa fa-pencil" style={{ fontSize: '1.5rem' }}></i>
                                            <i onClick={() => {
                                                // setEditingItem(user)
                                                // setShowDeleteModal(true)
                                                }} class="fa fa-trash-o" style={{ color: 'red', fontSize: '1.5rem', marginLeft: '2rem' }}></i>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* <DeleteModal
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
                        onSave={handleSaveItem}
                    />
                    <NewItemModal
                        newItem={newItem}
                        setNewItem={setNewItem}
                        isOpen={newModalOpen}
                        onClose={handleCloseNewModal}
                        handleSaveNewItem={handleSaveNewItem}
                    /> */}
                </div>
    )
}