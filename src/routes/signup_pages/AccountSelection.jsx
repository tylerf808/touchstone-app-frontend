

export default function AccountSelection({ accountType, setAccountType, setShowAlert, setAlertMsg, currentSlide, setCurrentSlide }) {

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
                                    <input className="radioInput" type="radio" name="accountType" value='owner' onClick={(e) => setAccountType(e.target.value)}></input>
                                </div>
                                <div className="radioItem">
                                    <p className="radioLabel">Dispatcher</p>
                                    <input className="radioInput" type="radio" name="accountType" value='dispatcher' onClick={(e) => setAccountType(e.target.value)}></input>
                                </div>
                                <div className="radioItem">
                                    <p className="radioLabel">Manager</p>
                                    <input className="radioInput" type="radio" name="accountType" value='manager' onClick={(e) => setAccountType(e.target.value)}></input>
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
                            case 'manager':
                                setCurrentSlide(currentSlide + 1)
                                break;
                        }
                    }}>Next</button>
                </div>
            </div>
        </div>
    )
}