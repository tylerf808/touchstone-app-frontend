import { useContext, useState, useEffect } from "react"
import './confirmationPageStyles.css'
import { useNavigate } from 'react-router-dom'
import UserContext from "../../helpers/Context"

export default function ConfirmationPage() {

    const { apiUrl } = useContext(UserContext)

    const navigate = useNavigate()

    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    const [newUserInfo, setNewUserInfo] = useState({
        name: '', username: '', password: '',
        passwordConf: '', admin: '', accountType: ''
    })
    const [confSuccess, setConfSuccess] = useState(false)

    useEffect(() => {
        getAdmin()
    }, [])

    const getAdmin = async () => {
        await fetch(apiUrl + '/api/user/getAdmin', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ confirmationCode: code })
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                setNewUserInfo({ ...newUserInfo, admin: data.admin, accountType: data.accountType })
            })
            .catch((err) => console.log(err))
    }

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
            }).then(() => navigate('/login')).catch((err) => console.log(err))
        }
        
    }

    const togglePassword = () => {
        let password = document.getElementById('password-input')
        let passwordConf = document.getElementById('password-conf-input')
        if (password.type === 'password') {
            password.type = 'text'
            passwordConf.type = 'text'
        } else {
            password.type = 'password'
            passwordConf.type = 'password'
        }
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
                    <form className="confirmation-details-form" style={{ width: '25rem' }}>
                        <div className="confirm-header-container">
                            <h2 style={{ marginBottom: '.5rem' }}>Enter Details</h2>
                            <p className="input-label" style={{ fontSize: '1rem', textAlign: 'center' }}>Enter your details and password to start using Touchstone Calculator</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '50% 50%', width: '100%', justifyItems: 'center', marginBottom: '1rem' }}>
                            <div>
                                <label className="input-label">Admin</label>
                                <label className="input-label" style={{ marginLeft: '1rem', fontWeight: 'bold' }}>{newUserInfo?.admin}</label>
                            </div>
                            <div>
                                <label className="input-label">Account Type</label>
                                <label className="input-label" style={{ marginLeft: '1rem', fontWeight: 'bold' }}>{newUserInfo?.accountType}</label>
                            </div>
                        </div>
                        <div className="confirmation-details-row">
                            <label className="input-label">Name</label>
                            <input type="text" name="name" onChange={(e) => handelChange(e)}></input>
                        </div>
                        <div className="confirmation-details-row">
                            <label className="input-label">Username</label>
                            <input name="username" onChange={(e) => handelChange(e)}></input>
                        </div>
                        <div className="confirmation-details-row">
                            <label className="input-label">Password</label>
                            <input type="password" name="password" id="password-input" onChange={(e) => handelChange(e)}></input>
                        </div>
                        <div className="confirmation-details-row">
                            <label className="input-label">Confirm Password</label>
                            <input type="password" name="passwordConf" id="password-conf-input" onChange={(e) => handelChange(e)}></input>
                        </div>
                        <div className='login-show-password'>
                            <p style={{ color: 'black', fontSize: '1em', marginRight: '.5rem' }}>Show Password</p>
                            <input style={{ accentColor: 'orange' }} onClick={togglePassword} type='checkbox'></input>
                        </div>
                        <div className="confirmation-btn-container">
                            <button className="modal-save-btn" onClick={(e) => confirmEmail(e)}>Confirm</button>
                        </div>
                    </form>
                }
            </div>
        )
    }
}