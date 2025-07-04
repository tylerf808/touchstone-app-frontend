import { useContext, useState } from "react"
import './confirmationPageStyles.css'
import { useNavigate } from 'react-router-dom'
import UserContext from "../../helpers/Context"

export default function ConfirmationPage() {

    const { apiUrl } = useContext(UserContext)

    const navigate = useNavigate()

    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    const [newUserInfo, setNewUserInfo] = useState({ name: '', username: '', password: '', passwordConf: '' })
    const [confSuccess, setConfSuccess] = useState(false)

    const confirmEmail = async (e) => {
        e.preventDefault()
        if (newUserInfo.password !== newUserInfo.passwordConf) {
            alert('Passwords do not match')
        } else {
            await fetch(apiUrl + `/api/user/newUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...newUserInfo, confirmationCode: code })
            }).catch((err) => console.log(err))

        }
        navigate('/login')
    }

    const handelChange = (e) => {
        setNewUserInfo({ ...newUserInfo, [e.target.name]: e.target.value })
    }

    if (!code) {
        return (
            <h1 style={{ justifySelf: 'center', marginTop: '10rem' }}>404</h1>
        )
    } else {
        return (
            <div className="page-container">
                {confSuccess ?
                    <h3>Email Confirmed!</h3>
                    :
                    <form className="confirmation-details-form">
                        <div className="confirm-header-container">
                            <h2>Enter Details</h2>
                            <p className="input-label" style={{ fontSize: '1rem' }}>Create user details and a password to start using Touchstone Calculator</p>
                        </div>
                        <div className="confirmation-details-row">
                            <label className="input-label">Name:</label>
                            <input type="text" name="name" onChange={(e) => handelChange(e)}></input>
                        </div>
                        <div className="confirmation-details-row">
                            <label className="input-label">Username:</label>
                            <input name="username" onChange={(e) => handelChange(e)}></input>
                        </div>
                        <div className="confirmation-details-row">
                            <label className="input-label">Password:</label>
                            <input type="password" name="password" onChange={(e) => handelChange(e)}></input>
                        </div>
                        <div className="confirmation-details-row">
                            <label className="input-label">Confirm Password:</label>
                            <input type="password" name="passwordConf" onChange={(e) => handelChange(e)}></input>
                        </div>
                        <div className="confirmation-btn-container">
                            <button onClick={(e) => confirmEmail(e)}>Confirm</button>
                        </div>
                    </form>
                }
            </div>
        )
    }
}