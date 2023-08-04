import { Link } from "react-router-dom"

export default function SecondPage({ currentSlide, setCurrentSlide }) {

    return (
        <div className="pageContainer">
            <div className="signUpInstructionsContainer">
                <p className="paragraph">In the following pages you'll be asked questions to help
                    us determine your operational and fixed costs.
                </p>
                <p className="paragraph">Please answer the questions to the best of your ability to ensure the
                    most accurate results.
                </p>
                <div className="headerContainer">
                    <p className="paragraph" >Press <span style={{ fontWeight: 'bold' }} >next</span> to continue.</p>
                </div>
            </div>
            <div className="btnContainerSignUp">
                <button className="btnSignUp" onClick={() => {
                    setCurrentSlide(currentSlide + 1)
                }}>Next</button>
            </div>
        </div>
    )
}