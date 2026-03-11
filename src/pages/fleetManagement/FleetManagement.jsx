import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../helpers/Context";
import NewTractorModal from "../tractors/NewTractorModal";
import NewItemModal from "../users/NewItemModal";

export default function FleetManagement() {

    const [tractors, setTractors] = useState([])
    const [drivers, setDrivers] = useState([])
    const [dispatchers, setDispatchers] = useState([])

    // modals / form data
    const [showTractorModal, setShowTractorModal] = useState(false)
    const [editedTractor, setEditedTractor] = useState({
        internalNum: '',
        vin: '',
        insurance: '',
        tractorLease: '',
        trailerLease: '',
        depreciation: '',
        mpg: '',
        height: { ft: '', in: '' },
        width: { ft: '', in: '' },
        weight: ''
    })

    const [showUserModal, setShowUserModal] = useState(false)
    const [newUser, setNewUser] = useState({ name: '', email: '', accountType: '', assignedTractor: '' })

    const { user, loggedIn, apiUrl } = useContext(UserContext)

    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            navigate('/')
            return
        }
        fetchFleet()
    }, [])


    const fetchFleet = async () => {
        try {
            const res = await fetch(apiUrl + '/api/tractor/getFleet', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            })
            const data = await res.json()
            console.log(data)
            // backend returns [tractors, drivers, dispatchers]
            setTractors(data[0] || [])
            setDrivers(data[1] || [])
            setDispatchers(data[2] || [])
        } catch (err) {
            console.error('error fetching fleet', err)
        }
    }

    const handleNewTractor = async () => {
        await fetch(apiUrl + '/api/tractor/newTractor', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(editedTractor)
        }).catch(err => console.log(err))
        // reset form
        setEditedTractor({
            internalNum: '',
            vin: '',
            insurance: '',
            tractorLease: '',
            trailerLease: '',
            depreciation: '',
            mpg: '',
            height: { ft: '', in: '' },
            width: { ft: '', in: '' },
            weight: ''
        })
        setShowTractorModal(false)
        fetchFleet()
    }

    const handleNewUser = async () => {
        await fetch(apiUrl + '/api/user/newPendingUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(newUser)
        }).catch(err => console.log(err))
        setNewUser({ name: '', email: '', accountType: '', assignedTractor: '' })
        setShowUserModal(false)
        fetchFleet()
    }

    // helper filters out unwanted keys and returns formatted value
    const formatValue = (key, val) => {
        if (key === 'height' || key === 'width') {
            // expect object with ft and in
            if (val && typeof val === 'object') {
                const ft = val.ft ?? ''
                const inch = val.in ?? ''
                return `${ft}ft ${inch}in`.trim()
            }
        }
        return String(val)
    }

    const renderTractor = (tractor, idx) => {
        const excluded = ['_id', 'createdAt', 'updatedAt', 'belongsTo', '__v']
        return (
            <div key={idx} className="flex flex-row flex-wrap gap-2 p-2 border-b">
                {Object.entries(tractor).map(([key, val]) => {
                    if (excluded.includes(key)) return null
                    return (
                        <p key={key} className="mr-4"><strong>{key}:</strong> {formatValue(key, val)}</p>
                    )
                })}
            </div>
        )
    }

    const renderUser = (userObj, idx) => {
        const excluded = ['_id', 'password', 'createdAt', 'updatedAt', '__v']
        return (
            <div key={idx} className="flex flex-row flex-wrap gap-2 p-2 border-b">
                {Object.entries(userObj).map(([key, val]) => {
                    if (excluded.includes(key)) return null
                    return (
                        <p key={key} className="mr-4"><strong>{key}:</strong> {String(val)}</p>
                    )
                })}
            </div>
        )
    }

    return (
        <div id="fleet-mng-container" className="w-[95vw] h-[85vh] relative top-[6rem] bg-white rounded grid grid-cols-2 justify-self-center p-2">
            {/* tractors column */}
            <div id="fleet-col-A" className="border-r-2 p-4 flex flex-col">
                <div className="flex flex-row justify-between items-center mb-2 flex-shrink-0">
                    <h3>Tractors</h3>
                    <button onClick={() => setShowTractorModal(true)}>+</button>
                </div>
                <div id="fleet-tractor-table" className="flex flex-col overflow-y-auto flex-1">
                    {tractors.map((tractor, i) => renderTractor(tractor, i))}
                </div>
            </div>
            {/* users column */}
            <div id="fleet-col-B" className="p-4 flex flex-col">
                <div id="col-B-top" className="h-[75%] p-2 flex flex-col">
                    <div className="flex flex-row justify-between items-center mb-2 flex-shrink-0">
                        <h3>Drivers</h3>
                        <button onClick={() => { setNewUser({ ...newUser, accountType: 'driver' }); setShowUserModal(true); }}>+</button>
                    </div>
                    <div id="fleet-driver-table" className="flex flex-col overflow-y-auto flex-1">
                        {drivers.map((driver, i) => renderUser(driver, i))}
                    </div>
                </div>
                <div id="col-B-bottom" className="h-[25%] border-t-2 p-2 flex flex-col">
                    <div className="flex flex-row justify-between items-center mb-2 flex-shrink-0">
                        <h3>Dispatchers</h3>
                        <button onClick={() => { setNewUser({ ...newUser, accountType: 'dispatcher' }); setShowUserModal(true); }}>+</button>
                    </div>
                    <div id="fleet-dispatcher-table" className="flex flex-col overflow-y-auto flex-1">
                        {dispatchers.map((disp, i) => renderUser(disp, i))}
                    </div>
                </div>
            </div>

            {/* modals */}
            <NewTractorModal
                editedItem={editedTractor}
                setEditedItem={setEditedTractor}
                isOpen={showTractorModal}
                setShowNewModal={setShowTractorModal}
                onSave={handleNewTractor}
            />
            <NewItemModal
                newItem={newUser}
                setNewItem={setNewUser}
                isOpen={showUserModal}
                onClose={() => setShowUserModal(false)}
                handleSaveNewItem={handleNewUser}
            />
        </div>
    );
}