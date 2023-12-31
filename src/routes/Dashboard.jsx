import { useNavigate } from "react-router-dom"

export default function Dashboard(props) {

    const navigate = useNavigate()

    return (
        <div className="pageContainer">
            <div className="dashboardContainer">
                <div className="dashboardItem">
                    <h2 onClick={() => {navigate('/addjob')}}>New Load</h2>
                </div>
                <div className="dashboardItem">
                    <h2 onClick={() => {navigate('/jobs')}}>Accepted Loads</h2>
                </div>
                <div className="dashboardItem">
                    <h2 onClick={() => {navigate('/costs')}}>Costs</h2>
                </div>
                <div className="dashboardItem">
                    <h2 onClick={() => {navigate('/drivers')}}>Users</h2>
                </div>
            </div>
        </div>
    )
}