import { useEffect, useState } from "react"
import {apiUrl} from '../../urls.json'

export default function SelectManager(props) {

    const [admins, setAdmins] = useState([])

    useEffect(() => {

        async function getAdmins() {
            const admins = await fetch(apiUrl + "/api/user/getAdmins", {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            }).then((res) => res.json())
            setAdmins(admins)
        }
        getAdmins()
    }, [])

    return (
        <div className="pageContainer">
            <div className="slider">
                <div className="slide">
                    <div className="slideTitle">
                        <h3>Select your Manager</h3>
                    </div>
                    <div className="slideInputs">
                        <div className="slideItem">
                            <select name='manager'>
                                {admins.map((el, i) => {
                                    return (
                                        <option key={i} value={el.username}>{el.username}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="btnContainerSignUp">
                    <button className="btnSignUp" onClick={() => {
                        props.setCurrentSlide(props.currentSlide - 4)
                    }}>Back</button>
                    <button className="btnSignUp" onClick={() => {
                        props.createAccount()
                    }}>Submit</button>

                </div>
            </div>
        </div>
    )
}