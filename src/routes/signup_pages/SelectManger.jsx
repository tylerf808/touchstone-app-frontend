import { useEffect, useState } from "react"

export default function SelectManager(props) {

    const [managers, setManagers] = useState([])

    useEffect(() => {

        async function getManagers() {
            const managers = await fetch("http://localhost:3001/api/user/getManagers", {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            }).then((res) => res.json())
            setManagers(managers)
            console.log(managers)
        }
        getManagers()
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
                                {managers.map((el) => {
                                    return (
                                        <option key={el.manager_id} value={el.username}>{el.username}</option>
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