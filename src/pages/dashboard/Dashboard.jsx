import { useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from 'react'
import './dashboardStyles.css'
import { Chart } from "react-google-charts"
import UserContext from "../../helpers/Context"
import formatUSD from "../../helpers/currencyFormatter"

export default function Dashboard() {

    const currentDateObj = new Date()
    const currentDate = currentDateObj.getFullYear() + '-' + (parseInt(currentDateObj.getMonth()) + 1) + '-' + currentDateObj.getDate()

    const navigate = useNavigate()

    const { apiUrl, location } = useContext(UserContext)

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
    const [options, setOptions] = useState({ lineChartTime: 'daily', pieChartTime: '' })

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/')
        }
        setLineChartData([["Date", "Revenue", "Profit"]])
        getInfo(token)
    }, [])

    const getInfo = async (token) => {

        await fetch(apiUrl + '/api/jobs/allJobs', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }).then((res) => res.json()).then((data) => {
            setJobs(data)
            if (data.length === 0) {
                setNoJobs(true)
                setRevenue(0)
                setProfit(0)
                setTotalCosts(0)
            } else {
                setNoJobs(false)
                setTotalJobs(data.length)
                let revenue = 0
                let profit = 0
                let costsMoney = 0
                data.forEach((job) => {
                    revenue = revenue + job.revenue
                    profit = job.netProfit + profit
                    costsMoney = costsMoney + job.totalCost
                })
                if (revenue === 0) {
                    setRevenue(0)
                }
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
            }

        }).catch((err) => {
            setNoJobs(true)
            setRevenue(0)
            setProfit(0)
            setTotalCosts(0)
            setJobs([])
            setTotalJobs(0)
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

    const percentageChange = (jobs) => {

    }

    const selectBarTime = () => {

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
                const weeklyTotals = jobs.reduce((acc, job) => {
                    const weekStart = new Date(job.date)
                    weekStart.setHours(0, 0, 0, 0)
                    weekStart.setDate(weekStart.getDate() - weekStart.getDay())

                    const weekEnd = new Date(weekStart)
                    weekEnd.setDate(weekEnd.getDate() + 6)

                    const weekKey = weekStart.toDateString()

                    if (!acc[weekKey]) {
                        acc[weekKey] = [weekStart.toDateString(), 0, 0]
                    }

                    acc[weekKey][1] += job.revenue
                    acc[weekKey][2] += job.netProfit

                    return acc
                }, {})
                const weeklyTotalsArray = Object.values(weeklyTotals)
                weeklyTotalsArray.forEach((el) => {
                    sortedArray.push(el)
                })
                setLineChartData(sortedArray)
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
        const categories = ["dispatch", "gasCost", "factor", "labor", "odc", "insurance", "trailer", "payrollTax", "tractor", "gAndA"];

        const totals = categories.reduce((acc, category) => {
            acc[category + "Total"] = data.reduce((sum, el) => sum + el[category], 0);
            return acc;
        }, {});

        const pieChartData = [
            ["Cost", "Amount"],
            ...categories.map(category => [category.charAt(0).toUpperCase() + category.slice(1), totals[category + "Total"]])
        ];
        pieChartData[10][0] = "G&A"
        setPieChartData(pieChartData);
    }

    const lineOptions = {
        legend: { position: "bottom" },
        backgroundColor: '#ececec',
        chartArea: { backgroundColor: '#f1f1f1' }
    };

    const pieOptions = {
        legend: { position: "bottom" },
        backgroundColor: '#ececec'
    };

    const tableOptions = {
        title: "Company Performance",
        curveType: "function",
        legend: { position: "bottom" },
        pageSize: 1,
    };

    const tableData = [
        ["Name", "Salary", "Full time employee"],
        ["Mike", { v: 10000, f: "$10,000" }, true],
        ["Jim", { v: 8000, f: "$8,000" }, false],
        ["Alice", { v: 12500, f: "$12,500" }, true],
        ["Bob", { v: 7000, f: "$7,000" }, true],
    ]

    return (
        <div className="dashboardContainer">
            {jobs ?
                <>
                    <div className="topBanner">
                        <div className="timeSelectContainer">
                            <select id="pie-time-select" onChange={selectBarTime}>
                                <option value="" disabled selected>Select Time frame</option>
                                <option value={0}>Week</option>
                                <option value={1}>Month</option>
                                <option value={2}>Year</option>
                                <option value={3}>All</option>
                            </select>
                        </div>
                        <div className="moneyBar">
                            <div className="moneyBarItem">
                                <h2 className="moneyBarLabel">Total: {totalJobs}</h2>
                                <div className="moneyBarSubItem">
                                    <h4 className="moneyBarLabel">Completed: {completedJobs.length}</h4>
                                    <h4 className="moneyBarLabel">Ongoing: 0</h4>
                                </div>
                                <p className="moneyBarLabel" onClick={() => { navigate('/jobs') }}>Jobs</p>
                            </div>
                            <div className="moneyBarItem">
                                <h2>{formatUSD(revenue)}</h2>
                                <p className="moneyBarLabel">Revenue</p>
                            </div>
                            <div className="moneyBarItem">
                                <h2>{formatUSD(totalCosts)}</h2>
                                <p className="moneyBarLabel">Cost</p>
                            </div>
                            <div className="moneyBarItem">
                                <h2>{formatUSD(profit)}</h2>
                                <p className="moneyBarLabel">Profit</p>
                            </div>
                        </div>
                    </div>
                    <div className="chartContainer">
                        <div className="lineChartContainer">
                            <div className="chartHeaderContainer">
                                <h2 style={{ color: 'black' }}>Revenue & Profit</h2>
                            </div>
                            <Chart chartType="ColumnChart" width="95%" height="95%" data={lineChartData} options={lineOptions} />
                        </div>
                        <div className="pieChartContainer">
                            <div className="chartHeaderContainer">
                                <h2 style={{ color: 'black' }}>Expended Costs</h2>
                            </div>
                            <Chart chartType="PieChart" width="95%" height="95%" data={pieChartData} options={pieOptions} />
                        </div>
                        <div className="lineChartContainer">
                            <div className="chartHeaderContainer">
                                <h2 style={{ color: 'black' }}>Revenue & Profit</h2>
                            </div>
                            <Chart chartType="LineChart" width="95%" height="95%" data={lineChartData} options={lineOptions} />
                        </div>
                        <div className="pieChartContainer">
                            <div className="chartHeaderContainer">
                                <h2 style={{ color: 'black' }}>Recent Jobs</h2>
                            </div>
                            {/* <Chart chartType="Table" width="100%" height="100%" data={tableData} options={tableOptions} /> */}
                        </div>
                    </div>
                </>
                :
                <h2>Loading...</h2>
            }
        </div>
    )
}