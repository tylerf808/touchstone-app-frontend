import { useEffect } from 'react'

export default function AccountSelection({ userInfo, setUserInfo, setShowAlert, setAlertMsg, currentSlide, setCurrentSlide }) {

    const checkAccountOption = () => {
        const ownerInput = document.getElementById('owner')
        const adminInput = document.getElementById('admin')
        if (userInfo.accountType === 'admin') {
            adminInput.checked = true
        } else {
            ownerInput.checked = true
        }
    }

    useEffect(() => {
        if (userInfo.accountType !== '') {
            checkAccountOption()
        }
    }, [])

    return (
        <div className="pageContainer">
            <div className="slideTitle">
                <h3 style={{ color: 'orange' }}>Select Account Type</h3>
                <p className='subTitle'>Select owner/operator if you're a driver or administrator if you will manage drivers.</p>
            </div>
            <div className="accountSelectionSlide">
                <div className="radioItem">
                    <p className="radioLabel">Owner/Operator</p>
                    <input id="owner" className="radioInput" type="radio" name="accountType" value='owner' onClick={(e) => {
                        setUserInfo({ ...userInfo, accountType: e.target.value })
                    }}></input>
                </div>
                <div className="radioItem">
                    <p className="radioLabel">Administrator</p>
                    <input id="admin" className="radioInput" type="radio" name="accountType" value='admin' onClick={(e) => {
                        setUserInfo({ ...userInfo, accountType: e.target.value })
                    }}></input>
                </div>
            </div>
            <div className='progressContainer'>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='currentDot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
            </div>
            <div className="btnContainerSignUp">
                <button className="btnSignUp" onClick={() => {
                    setShowAlert(false)
                    setCurrentSlide(currentSlide - 1)
                }}>Back</button>
                <button className="btnSignUp" onClick={() => {
                    setShowAlert(false)
                    if (userInfo.accountType === '') {
                        setAlertMsg("No selection made")
                        setShowAlert(true)
                        return
                    }
                    switch (userInfo.accountType) {
                        case 'owner':
                            setCurrentSlide(currentSlide + 1)
                            break;
                        case 'admin':
                            setCurrentSlide(currentSlide + 1)
                            break;
                    }
                }}>Next</button>
            </div>
        </div>
    )
}