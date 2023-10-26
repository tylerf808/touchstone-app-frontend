import {useEffect} from 'react'

export default function AccountSelection({ accountType, setAccountType, setShowAlert, setAlertMsg, currentSlide, setCurrentSlide }) {

    const checkAccountOption = () => {
        const ownerInput = document.getElementById('owner')
        const adminInput = document.getElementById('admin')
        if(accountType === 'admin'){
            adminInput.checked = true
        } else {
            ownerInput.checked = true
        }
    }

    useEffect(() => {
        checkAccountOption()
    }, [])

    return (
        <div className="pageContainer">
            <div className="slider">
                <div className="slide">
                    <div className="slideTitle">
                        <h3>Select Account Type</h3>
                    </div>
                    <div className="slideInputs">
                        <div className="slideItem">
                            <div className="radioMenu">
                                <div className="radioItem">
                                    <p className="radioLabel">Owner/Operator</p>
                                    <input id="owner" className="radioInput" type="radio" name="accountType" value='owner' onClick={(e) => setAccountType(e.target.value)}></input>
                                </div>
                                <div className="radioItem">
                                    <p className="radioLabel">Admin</p>
                                    <input id="admin" className="radioInput" type="radio" name="accountType" value='admin' onClick={(e) => setAccountType(e.target.value)}></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btnContainerSignUp">
                    <button className="btnSignUp" onClick={() => {
                        setShowAlert(false)
                        setCurrentSlide(currentSlide - 1)
                    }}>Back</button>
                    <button className="btnSignUp" onClick={() => {
                        setShowAlert(false)
                        if (accountType === '') {
                            setAlertMsg("No selection made")
                            setShowAlert(true)
                            return
                        }
                        switch(accountType){
                            case 'owner':
                                setCurrentSlide(currentSlide + 1)
                                break;
                            case 'dispatcher':
                                setCurrentSlide(currentSlide + 4)
                                break;
                            case 'admin':
                                setCurrentSlide(currentSlide + 1)
                                break;
                        }
                    }}>Next</button>
                </div>
            </div>
        </div>
    )
}