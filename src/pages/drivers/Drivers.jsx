import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './driversStyles.css'
import UserContext from "../../helpers/Context";

export default function Drivers() {

    const { user, apiUrl } = useContext(UserContext)

    const [dispatchers, setDispatchers] = useState([])
    const [drivers, setDrivers] = useState([])
    const [tractors, setTractors] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('category1')

    const categories = {
        category1: drivers,
        category2: tractors,
        category3: dispatchers
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
    }

    const renderObject = (item) => {
        switch (selectedCategory) {
            case 'category1':
                return (
                    <div>
                        <h3>{item.name}</h3>
                        <p>Email: {item.email}</p>
                        <p>Username: {item.username}</p>
                    </div>
                )
                break;
            case 'category2':
                return (
                    <div>
                        <h3>{item.internalNum}</h3>
                        <p>MPG: {item.mpg}</p>
                        <p>Insurance: {item.insurance}</p>
                    </div>
                )
                break;
            case 'category3':
                return (
                    <div>
                        <h3>{item.name}</h3>
                        <p>Email: {item.email}</p>
                        <p>Username: {item.username}</p>
                    </div>
                )
                break;
            default:
                return null
                break;
        }
    }

    const token = localStorage.getItem('token')

    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/')
        } else {
            getUsers()
            getTractors()
        }
    }, [])

    const getUsers = async () => {
        const response = await fetch(apiUrl + '/api/user/getUsers', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        }).then((res) => res.json())
        response.forEach((user) => {
            if (user.accountType === 'driver') {
                setDrivers((prev) => [...prev, user])
            } else {
                setDispatchers((prev) => [...prev, user])
            }
        })
    }

    const getTractors = async () => {
        const response = await fetch(apiUrl + '/api/tractor/getTractors', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        }).then((res) => res.json())
        setTractors(response)
    }


    // const updateUsers = async () => {

    //     await fetch(apiUrl + '/api/user/setUsers', {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": token
    //         },
    //         body: JSON.stringify([...users, newUser])
    //     }).then((res) => res.json()).then((data) => setUsers(data))
    // }

    return (
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
                {categories[selectedCategory].map((item) => (
                    <div key={item._id} className="object-item">
                        {renderObject(item)}
                    </div>
                ))}
            </div>
        </div>
    )
}