import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import './dashboardStyles.css'
import { Chart } from "react-google-charts"

const { apiUrl } = require('../../urls.json')

export default function Dashboard({ user, loggedIn, userType }) {

    const currentDateObj = new Date()
    const currentDate = currentDateObj.getFullYear() + '-' + (parseInt(currentDateObj.getMonth()) + 1) + '-' + currentDateObj.getDate()

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
    const [totalJobs, setTotalJobs] = useState()
    const [completedJobs, setCompletedJobs] = useState([])

    useEffect(() => {
        if (!loggedIn) {
            navigate('/')
        }
        setLineChartData([["Date", "Revenue", "Profit"]])
        getInfo()
    }, [])

    const getInfo = async () => {

        await fetch(apiUrl + '/api/costs/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user.username
            })
        }).then((res) => res.json()).then((data) => setCosts(data))

        await fetch(apiUrl + '/api/jobs/allJobs', {
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                admin: user.username
            })
        }).then((res) => res.json()).then((data) => {
            setJobs(data)
            if (data.length === 0) {
                setNoJobs(true)
            } else {
                setNoJobs(false)
            }
            setTotalJobs(data.length)
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
            data.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
            const sortedArray = [["Date", "Revenue", "Profit"]]
            data.forEach((jobA, iA) => {
                let dayRevenue = jobA.revenue
                let dayProfit = jobA.netProfit
                data.forEach((jobB, iB) => {
                    if (iA !== iB && jobA.date === jobB.date) {
                        dayProfit += jobB.netProfit
                        dayRevenue += jobB.revenue
                    }
                })
                if (!sortedArray.some((el) => el.includes(jobA.date))) {
                    sortedArray.push([jobA.date, dayRevenue, dayProfit])
                }
            })
            setLineChartData(sortedArray)
            formatCostsData(data)
            formatCompletedJobs(data)
        })
    }

    const formatCompletedJobs = (jobs) => {

        const completedJobs = []
        const currentTime = Date.now()

        jobs.forEach((job) => {
            const jobTime = new Date(job.date)
            if (jobTime <= currentTime) {
                completedJobs.push(job)
            }
        })
        setCompletedJobs(completedJobs)
    }

    const selectPieTime = () => {

        const currentTime = Date.now()
        const selectedOption = document.getElementById('pie-time-select').value

        let newArray = []

        switch (selectedOption) {
            case '0':
                jobs.forEach((job) => {
                    const jobTime = new Date(job.date)
                    if ((currentTime - jobTime) <= 6.048e+8) {
                        newArray.push(job)
                    }
                })
                break;
            case '1':
                jobs.forEach((job) => {
                    const jobTime = new Date(job.date)
                    if ((currentTime - jobTime) <= 2.628e+9) {
                        newArray.push(job)
                    }
                })
                break;
            case '2':
                jobs.forEach((job) => {
                    const jobTime = new Date(job.date)
                    if ((currentTime - jobTime) <= 3.154e+10) {
                        newArray.push(job)
                    }
                })
                break;
            default:
                newArray = jobs
                break;
        }
        setTotalJobs(newArray.length)
        let revenue = 0
        let profit = 0
        let costsMoney = 0
        newArray.forEach((job) => {
            revenue = revenue + job.revenue
            profit = job.netProfit + profit
            costsMoney = costsMoney + job.totalCost
        })
        formatCompletedJobs(newArray)
        setRevenue(revenue.toFixed(2))
        setProfit(profit.toFixed(2))
        setTotalCosts(costsMoney.toFixed(2))
    }

    const selectLineTime = () => {

        const sortedArray = [["Date", "Revenue", "Profit"]]

        const selection = document.getElementById('line-time-select').value

        switch (selection) {
            case 'daily':
                jobs.forEach((jobA, iA) => {
                    let dayRevenue = jobA.revenue
                    let dayProfit = jobA.netProfit
                    jobs.forEach((jobB, iB) => {
                        if (iA !== iB && jobA.date === jobB.date) {
                            dayProfit += jobB.netProfit
                            dayRevenue += jobB.revenue
                        }
                    })
                    if (!sortedArray.some((el) => el.includes(jobA.date))) {
                        sortedArray.push([jobA.date, dayRevenue, dayProfit])
                    }
                })
                setLineChartData(sortedArray)
                break;
            case 'weekly':

                break;
            case 'monthly':
                jobs.forEach((jobA, iA) => {
                    const jobADate = new Date(jobA.date)
                    const jobAMonth = new Intl.DateTimeFormat("en-US", { month: 'long' }).format(jobADate)
                    let monthRevenue = jobA.revenue
                    let monthProfit = jobA.netProfit
                    jobs.forEach((jobB, iB) => {
                        const jobBDate = new Date(jobB.date)
                        const jobBMonth = new Intl.DateTimeFormat("en-US", { month: 'long' }).format(jobBDate)
                        if (iA !== iB && jobAMonth === jobBMonth) {
                            monthProfit += jobB.netProfit
                            monthRevenue += jobB.revenue
                        }
                    })
                    if (!sortedArray.some((el) => el.includes(jobAMonth))) {
                        sortedArray.push([jobAMonth, monthRevenue, monthProfit])
                    }
                })
                setLineChartData(sortedArray)
                break;
            default:
                break;
        }
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
        <div className="dashboardContainer">
            <div className="topBanner">
                <div className="timeSelectContainer">
                    <select id="pie-time-select" onChange={selectPieTime}>
                        <option value="" disabled selected>Select Time frame</option>
                        <option value={0}>Week</option>
                        <option value={1}>Month</option>
                        <option value={2}>Year</option>
                        <option value={3}>All</option>
                    </select>
                </div>
                <div className="moneyBar">
                    <div className="moneyBarItem">
                        <h2 className="moneyBarLabel" onClick={() => { navigate('/jobs') }}>Jobs</h2>
                        <p className="moneyBarLabel">Total: {totalJobs}</p>
                        <p className="moneyBarLabel">Completed: {completedJobs.length}</p>
                    </div>
                    <div className="moneyBarItem">
                        <h2 className="moneyBarLabel">Revenue</h2>
                        <CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={revenue} prefix="$" style={{ fontSize: '1.2rem' }} />
                    </div>
                    <div className="moneyBarItem">
                        <h2 className="moneyBarLabel">Cost</h2>
                        <CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={totalCosts} prefix="$" style={{ fontSize: '1.2rem' }} />
                    </div>
                    <div className="moneyBarItem">
                        <h2 className="moneyBarLabel">Profit</h2>
                        <CurrencyFormat displayType="text" fixedDecimalScale={true} decimalScale={2} thousandSeparator={true} value={profit} prefix="$" style={{ fontSize: '1.2rem' }} />
                    </div>
                </div>
            </div>
            {noJobs ?
                <p>Job data will appear here once you add jobs</p>
                :
                <div className="chartContainer">
                    <div className="lineChartContainer">
                        <div className="chartHeaderContainer">
                            <h2 style={{ color: 'black' }}>Revenue & Profit</h2>
                            <select onChange={selectLineTime} id="line-time-select">
                                <option selected={true} value='daily'>Daily</option>
                                <option value='weekly'>Weekly</option>
                                <option value='monthly'>Monthly</option>
                            </select>
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