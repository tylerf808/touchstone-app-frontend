import { useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from 'react'
import './dashboardStyles.css'
import { Chart } from "react-google-charts"
import UserContext from "../../helpers/Context"
import formatUSD from "../../helpers/currencyFormatter"

export default function Dashboard() {

    const navigate = useNavigate()

    const { apiUrl, loggedIn } = useContext(UserContext)

    const [totalCosts, setTotalCosts] = useState()
    const [lineChartData, setLineChartData] = useState([["Date", "Revenue", "Profit"]])
    const [pieChartData, setPieChartData] = useState({})
    const [jobs, setJobs] = useState([])
    const [revenue, setRevenue] = useState()
    const [profit, setProfit] = useState()
    const [totalJobs, setTotalJobs] = useState()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/')
        } else {
            setLineChartData([["Date", "Revenue", "Profit"]])
            getInfo(token)
        }

    }, [])

    const getInfo = async (token) => {

        await fetch(apiUrl + '/api/jobs/allJobs', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        }).then((res) => res.json()).then((data) => {
            data.sort((a, b) => {
                const dateA = new Date(a.date)
                const dateB = new Date(b.date)
                return dateB.getTime() - dateA.getTime()
            })
            setJobs(data)
            if (data.length === 0) {
                setRevenue(0)
                setProfit(0)
                setTotalCosts(0)
            } else {
                console.log(data)
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
            }
        }).catch((err) => {
            setRevenue(0)
            setProfit(0)
            setTotalCosts(0)
            setJobs([])
            setTotalJobs(0)
        })
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
        backgroundColor: 'white',
    };

    const pieOptions = {
        legend: { position: "bottom" },
        backgroundColor: 'white'
    };

    const tableOptions = {
        legend: { position: "bottom" },
        backgroundColor: 'white',
        pageSize: 3,
    };

    const tableData = [
        ['Start', 'Pick Up', 'Drop Off', 'Departure Date', 'Rate per Mile', 'Revenue', 'Gross Profit %',
            'Operating Profit %', 'Net Profit %', 'Total Costs', "Gas Cost", 'Factor', 'Overhead',
            'Loan', 'ODC', 'Repairs', 'Labor', 'Dispatch', 'Depreciation', 'Payroll Tax', 'Net Profit', 'Labor Rate %', 'Insurance',
            'Trailer Lease', 'Tractor Lease', 'Tolls', 'Gross Profit', 'Operating Profit', 'Total Fixed Costs', 'Total Direct Cost', 'Distance',
            'Drive Time', 'Client', 'Driver', 'Admin', 'Tractor']
    ]

    const exclude = ['_id', 'createdAt', 'updatedAt'];
    const excludeNonMoney = ['start', 'pickUp', 'dropOff', 'date', 'grossProfitPercentage',
        'operatingProfitPercentage', 'netProfitPercentage', 'laborRatePercent', 'distance',
        'driveTime', 'client', 'driver', 'tractor', 'admin']

    const percentage = ['grossProfitPercentage', 'operatingProfitPercentage', 'netProfitPercentage']


    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isCompleted = (job) => {
        const jobDate = new Date(job.date);
        jobDate.setHours(0, 0, 0, 0);
        return jobDate <= today;
    };

    jobs.forEach((job) => {
        const subArray = []
        Object.entries(job).forEach(([key, value]) => {
            if (!exclude.includes(key)) {
                if (key === 'date') {
                    const isoString = value;
                    const date = new Date(isoString);
                    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                    subArray.push(formattedDate)
                } else {
                    if (!excludeNonMoney.includes(key)) {
                        subArray.push('$' + value.toString())
                    } else {
                        if(!percentage.includes(key)){
                            subArray.push(value)
                        } else {
                            subArray.push(value.toString(2) + '%')
                        }
                    }
                }
            }
        })

        tableData.push(subArray)
    })



    const completedJobs = jobs.filter(job => isCompleted(job));
    const uncompletedJobs = jobs.filter(job => !isCompleted(job));

    return (
        <div className="dashboardContainer">
            {jobs.length > 0 &&
                <>
                    <div className="moneyBar" style={{ marginTop: '2rem' }}>
                        <div className="moneyBarItem">
                            <p className="moneyBarLabel" onClick={() => { navigate('/jobs') }}>Jobs</p>
                            <div className="moneyBarSubItem">
                                <h4 className="moneyBarLabel">Completed: {completedJobs.length}</h4>
                                <h4 className="moneyBarLabel">Uncompleted: {uncompletedJobs.length}</h4>
                            </div>
                            <h2 className="moneyBarLabel">Total: {totalJobs}</h2>
                        </div>
                        <div className="moneyBarItem">
                            <p className="moneyBarLabel">Revenue</p>
                            <h2>{formatUSD(revenue)}</h2>
                        </div>
                        <div className="moneyBarItem">
                            <p className="moneyBarLabel">Total Costs</p>
                            <h2>{formatUSD(totalCosts)}</h2>
                        </div>
                        <div className="moneyBarItem">
                            <p className="moneyBarLabel">Profit</p>
                            <h2>{formatUSD(profit)}</h2>
                        </div>
                    </div>
                    <div className="chartContainer">
                        <div className="lineChartContainer">
                            <div className="chartHeaderContainer">
                                <h2 style={{ color: 'black', height: '3rem', marginLeft: '5rem', marginTop: '1rem' }}>Revenue & Profit</h2>
                            </div>
                            <Chart chartType="ColumnChart" width="98%" height="98%" data={lineChartData} options={lineOptions} />
                        </div>
                        <div className="pieChartContainer">
                            <div className="chartHeaderContainer">
                                <h2 style={{ color: 'black', height: '3rem', marginLeft: '5rem', marginTop: '1rem' }}>Expended Costs</h2>
                            </div>
                            <Chart chartType="PieChart" width="98%" height="98%" data={pieChartData} options={pieOptions} />
                        </div>
                    </div>
                    <div className="table-container">
                        <h2 style={{ color: 'black', height: '3rem', marginLeft: '5rem', marginTop: '1rem' }}>Recent Jobs</h2>
                        <Chart chartType="Table" width="100%" height="100%" data={tableData} options={tableOptions} />
                    </div>
                </>}
            {jobs.length === 0 &&
                <div className="placeholder-dashboard">
                    <div className="moneyBar" style={{ marginTop: '2rem' }}>
                        <div className="moneyBarItem">
                            <p className="moneyBarLabel" style={{ color: 'grey' }}>Jobs</p>
                        </div>
                        <div className="moneyBarItem">
                            <p className="moneyBarLabel" style={{ color: 'grey' }}>Revenue</p>
                        </div>
                        <div className="moneyBarItem">
                            <p className="moneyBarLabel" style={{ color: 'grey' }}>Total Costs</p>
                        </div>
                        <div className="moneyBarItem">
                            <p className="moneyBarLabel" style={{ color: 'grey' }}>Profit</p>
                        </div>
                    </div>
                    <div className="chartContainer">
                        <div className="lineChartContainer">
                            <div className="chartHeaderContainer">
                                <h2 style={{ color: 'grey', height: '3rem', marginLeft: '5rem', marginBottom: '16rem' }}>Revenue & Profit</h2>
                            </div>
                        </div>
                        <div className="pieChartContainer">
                            <div className="chartHeaderContainer">
                                <h2 style={{ color: 'grey', height: '3rem', marginLeft: '5rem', marginBottom: '16rem' }}>Expended Costs</h2>
                            </div>
                        </div>
                    </div>
                    <div className="table-container">
                        <h2 style={{ color: 'grey', height: '3rem', marginLeft: '5rem', marginTop: '1rem' }}>Recent Jobs</h2>
                    </div>
                    <div className="placeholder-overlay">
                        <h2 style={{ justifySelf: 'center', top: '40%', position: 'relative' }}>Charts will appear here once you have saved jobs</h2>
                    </div>
                </div>
            }
        </div>
    )
}