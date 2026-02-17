import { useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from 'react'
import './dashboardStyles.css'
import UserContext from "../../helpers/Context"
import LineChartComponent from "./LineChartComponent"
import formatUSD from "../../helpers/currencyFormatter"

export default function Dashboard() {

    const navigate = useNavigate()

    const { apiUrl, loggedIn } = useContext(UserContext)

    const [totalCosts, setTotalCosts] = useState()
    const [lineChartData, setLineChartData] = useState([{ name: 'September', profit: 4000, revenue: 3000 }, { name: 'October', profit: 5000, revenue: 4500 }])
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
                const sortedArray = []
                data.forEach((jobA, iA) => {
                    sortedArray.push({ name: jobA.date.toString(), revenue: jobA.revenue, profit: jobA.profit })
                    // let dayRevenue = jobA.revenue
                    // let dayProfit = jobA.netProfit
                    // data.forEach((jobB, iB) => {
                    //     if (iA !== iB && jobA.date === jobB.date) {
                    //         dayProfit += jobB.netProfit
                    //         dayRevenue += jobB.revenue
                    //     }
                    // })
                    // if (!sortedArray.some((el) => el.includes())) {
                    //     sortedArray.push({name: jobA.date, pv: dayRevenue, uv: dayProfit})
                    // }
                })
                // setLineChartData(sortedArray)
                // formatCostsData(data)
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
                        if (!percentage.includes(key)) {
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
        <div className="dashboard-container">

            <div className="moneyBar">
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
                <LineChartComponent data={[
                    {
                        name: 'Page A',
                        uv: 400,
                        pv: 2400,
                        amt: 2400,
                    },
                    {
                        name: 'Page B',
                        uv: 300,
                        pv: 4567,
                        amt: 2400,
                    },
                    {
                        name: 'Page C',
                        uv: 320,
                        pv: 1398,
                        amt: 2400,
                    },
                    {
                        name: 'Page D',
                        uv: 200,
                        pv: 9800,
                        amt: 2400,
                    },
                    {
                        name: 'Page E',
                        uv: 278,
                        pv: 3908,
                        amt: 2400,
                    },
                    {
                        name: 'Page F',
                        uv: 189,
                        pv: 4800,
                        amt: 2400,
                    },
                ]} />
            </div>
            <div className="table-container">
                <h2 style={{ color: 'black', height: '3rem', marginLeft: '5rem', marginTop: '1rem' }}>Recent Jobs</h2>
                {/* <Chart chartType="Table" width="100%" height="100%" data={tableData} options={tableOptions} /> */}
            </div>
        </div>
    )
}