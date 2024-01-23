import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import './dashboardStyles.css'
import { Chart } from "react-google-charts"

const { apiUrlLocal } = require('../../urls.json')

export default function Dashboard({ user, loggedIn, userType }) {

    const navigate = useNavigate()

    const [drivers, setDrivers] = useState([])
    const [totalCosts, setTotalCosts] = useState()
    const [costs, setCosts] = useState([])
    const [lineChartData, setLineChartData] = useState([["Date", "Revenue", "Profit"]])
    const [pieChartData, setPieChartData] = useState({})
    const [jobs, setJobs] = useState([])
    const [revenue, setRevenue] = useState()
    const [profit, setProfit] = useState()
    const [noJobs, setNoJobs] = useState(true)

    useEffect(() => {
        if (!loggedIn) {
            navigate('/')
        }
        setLineChartData([["Date", "Revenue", "Profit"]])
        getInfo()
    }, [])

    const getInfo = async () => {

        let userID

        console.log(user, userType, user.admin)

        if (userType === 'dispatcher') {
            userID = user.admin
        } else {
            userID = user.username
        }

        await fetch(apiUrlLocal + '/api/user/getDrivers', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                admin: userID
            })
        }).then((res) => res.json()).then((data) => setDrivers(data))

        await fetch(apiUrlLocal + '/api/costs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: userID
            })
        }).then((res) => res.json()).then((data) => {
            setCosts(data)

        })

        await fetch(apiUrlLocal + '/api/jobs/allJobs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                admin: userID
            })
        }).then((res) => res.json()).then((data) => {
            setJobs(data)
            if (data.length === 0) {
                setNoJobs(true)
            } else {
                setNoJobs(false)
            }
            let revenue = 0
            let profit = 0
            let costsMoney = 0
            data.forEach((job) => {
                revenue = revenue + job.revenue
                profit = job.netProfit + profit
                costsMoney = costsMoney + job.totalCost
            })
            setRevenue(revenue.toFixed(2))
            setProfit(profit.toFixed(2))
            setTotalCosts(costsMoney.toFixed(2))
            data.forEach((el, i) => {
                setLineChartData(prevData => [
                    ...prevData,
                    [el.date, el.revenue, el.netProfit]
                ])
            })
            formatCostsData(data)
            setActiveJobs()
        })
    }

    const setActiveJobs = () => {
        const now = new Date()
        console.log(now.getUTCDate())
    }

    const formatCostsData = (data) => {

        let dispatchTotal = 0
        let gasTotal = 0
        let factorTotal = 0
        let laborTotal = 0
        let odcTotal = 0
        let insuranceTotal = 0
        let trailerTotal = 0
        let payrollTaxTotal = 0
        let tractorTotal = 0
        let gAndATotal = 0

        data.forEach((el) => {
            dispatchTotal += el.dispatch
            gasTotal += el.gasCost
            factorTotal += el.factor
            laborTotal += el.labor
            odcTotal += el.odc
            insuranceTotal += el.insurance
            trailerTotal += el.trailer
            payrollTaxTotal += el.payrollTax
            tractorTotal += el.tractor
            gAndATotal += el.gAndA
        })
        setPieChartData([
            ["Cost", "Amount"],
            ["Dispatch", dispatchTotal],
            ["Fuel", gasTotal],
            ["Factor", factorTotal],
            ["Labor", laborTotal],
            ["ODC", odcTotal],
            ["Insurance", insuranceTotal],
            ["Trailer", trailerTotal],
            ["Tractor", tractorTotal],
            ["G&A", gAndATotal]
        ])
    }

    const lineOptions = {
        legend: { position: "bottom" },
    };

    const pieOptions = {
        legend: { position: "bottom" },
    };

    return (
        <div className="pageContainer">
            <div className="moneyBar">
                <div className="moneyBarItem">
                    <h2 className="moneyBarLabel" onClick={() => { navigate('/jobs') }}>Jobs</h2>
                    <p className="moneyBarLabel">Total: {jobs.length}</p>
                </div>
                <div className="moneyBarItem">
                    <h2 className="moneyBarLabel">Revenue</h2>
                    <CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={revenue} prefix="$" style={{ fontSize: '1.2rem' }} />
                </div>
                <div className="moneyBarItem">
                    <h2 className="moneyBarLabel">Profit</h2>
                    <CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={profit} prefix="$" style={{ fontSize: '1.2rem' }} />
                </div>
                <div className="moneyBarItem">
                    <h2 className="moneyBarLabel">Cost</h2>
                    <CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={totalCosts} prefix="$" style={{ fontSize: '1.2rem' }} />
                </div>
            </div>
            {noJobs ?
                <p>Job data will appear here once you add jobs</p>
                :
                <div className="chartContainer">
                    <div className="lineChartContainer">
                        <div className="chartHeaderContainer">
                            <h2 style={{ color: 'black' }}>Revenue & Profit</h2>
                        </div>
                        <Chart chartType="LineChart" width="100%" height="100%" data={lineChartData} options={lineOptions} />
                    </div>
                    <div className="pieChartContainer">
                        <div className="chartHeaderContainer">
                            <h2 style={{ color: 'black' }}>Expended Costs</h2>
                        </div>
                        <Chart chartType="PieChart" width="100%" height="100%" data={pieChartData} options={pieOptions} />
                    </div>
                </div>
            }
        </div>
    )
}