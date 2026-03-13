import { useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from 'react'
import './dashboardStyles.css'
import UserContext from "../../helpers/Context"
import SimpleAreaChart from "./SimpleAreaChart"
import formatUSD from "../../helpers/currencyFormatter"
import DatePicker from "react-datepicker";
import RadarChart from "./RadarChart"
import RecentJobsTable from "./RecentJobsTable"
import "react-datepicker/dist/react-datepicker.css";

export default function Dashboard() {

    const navigate = useNavigate()

    const { apiUrl, loggedIn } = useContext(UserContext)

    const [totalCosts, setTotalCosts] = useState()
    const [lineChartData, setLineChartData] = useState()
    const [jobs, setJobs] = useState([])
    const [selectedJobs, setSelectedJobs] = useState([])
    const [revenue, setRevenue] = useState()
    const [profit, setProfit] = useState()
    const [totalJobs, setTotalJobs] = useState()
    const [startDate, setStartDate] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() - 30);
        return d;
    });
    const [endDate, setEndDate] = useState(new Date());


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

                // initialize selected jobs and chart based on current date range
                const filtered = filterJobsByRange(data, startDate, endDate);
                setSelectedJobs(filtered);
                const monthly = formatLineChartData(filtered, startDate, endDate);
                setLineChartData(monthly);
            }
        }).catch((err) => {
            setRevenue(0)
            setProfit(0)
            setTotalCosts(0)
            setJobs([])
            setTotalJobs(0)
        })
    }

    const formatLineChartData = (jobsArray, startDate, endDate) => {
        if (!jobsArray || !jobsArray.length) return [];

        // determine grouping window. prefer explicit dates from picker but fall
        // back to the actual data range so that missing/invalid inputs don't
        // accidentally flip to weekly.
        let diffDays;
        if (startDate && endDate) {
            const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
            diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        } else {
            // compute from job date bounds
            const dates = jobsArray.map((j) => new Date(j.date)).sort((a, b) => a - b);
            if (dates.length >= 2) {
                const diffTime = dates[dates.length - 1] - dates[0];
                diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
            } else {
                diffDays = 1;
            }
        }
        const groupByDay = diffDays < 22;
        // debug
        // console.log('formatLineChartData', { startDate, endDate, diffDays, groupByDay });

        const getWeekNumber = (date) => {
            const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            const dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        };

        const map = {};
        jobsArray.forEach((job) => {
            const date = new Date(job.date);
            let key, name;
            if (groupByDay) {
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                key = `${year}-${month}-${day}`;
                name = `${month}/${day}/${year}`;
            } else {
                const year = date.getFullYear();
                const week = getWeekNumber(date);
                key = `${year}-W${week}`;
                name = `W${week} ${year}`;
            }
            if (!map[key]) {
                map[key] = { name, revenue: 0, profit: 0, jobs: 0 };
            }
            const rev = Number(job.revenue) || 0;
            const net = Number(job.netProfit || job.profit) || 0;
            map[key].revenue += rev;
            map[key].profit += net;
            map[key].jobs += 1;
        });
        return Object.keys(map)
            .sort((a, b) => {
                if (groupByDay) {
                    const [ay, am, ad] = a.split('-').map(Number);
                    const [by, bm, bd] = b.split('-').map(Number);
                    return new Date(ay, am - 1, ad) - new Date(by, bm - 1, bd);
                } else {
                    const [ay, aw] = a.split('-W').map(Number);
                    const [by, bw] = b.split('-W').map(Number);
                    return ay === by ? aw - bw : ay - by;
                }
            })
            .map((k) => ({ ...map[k] }));
    };

    const filterJobsByRange = (jobsArray, start, end) => {
        if (!jobsArray || !jobsArray.length) return [];
        if (!start && !end) return jobsArray.slice();
        const s = start ? new Date(start) : null;
        const e = end ? new Date(end) : s || null;
        if (s) s.setHours(0, 0, 0, 0);
        if (e) e.setHours(23, 59, 59, 999);
        return jobsArray.filter((job) => {
            const jd = new Date(job.date);
            return (!s || jd >= s) && (!e || jd <= e);
        });
    };

    const updateChartForRange = (start, end) => {

        const filtered = filterJobsByRange(jobs, start, end);
        setSelectedJobs(filtered);
        const monthly = formatLineChartData(filtered);
        setLineChartData(monthly);
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

    const onChange = (dates) => {
        let [start, end] = dates;
        // if the picker returns undefined for one of the dates, keep the previous value
        setStartDate((prev) => start || prev);
        setEndDate((prev) => end || prev);

        // compute range values that will actually be used for charting
        const useStart = start || startDate;
        const useEnd = end || endDate;
        updateChartForRange(useStart, useEnd);
    };

    // recalc whenever jobs or range state changes (covers cases where onChange
    // didn't run or was passed partial dates)
    useEffect(() => {

            updateChartForRange(startDate, endDate);
        
    }, [startDate, endDate, jobs]);

    return (
        <div className="w-[80rem] h-auto justify-self-center relative top-[6rem] bg-white rounded-md p-4">
            <div className="flex flex-row justify-end items-center">
                <h3 className="mr-2">Select Date</h3>
                <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                />
            </div>
            <div className="w-full flex flex-row justify-between gap-2 mb-2 ">
                <div className="w-[20rem] h-[6rem] text-center justify-items-center border-b-2 border-r-2  rounded-md border-gray-300 items-center flex flex-col p-2">
                    <p className='' onClick={() => { navigate('/jobs') }}>Jobs</p>
                    <div className="moneyBarSubItem">
                        <h4 className=''>Completed: {completedJobs.length}</h4>
                        <h4 className=''>Uncompleted: {uncompletedJobs.length}</h4>
                    </div>
                    <h2 className=''>Total: {totalJobs}</h2>
                </div>
                <div className="w-[20rem] h-[6rem] text-center justify-center border-b-2 border-r-2  rounded-md border-gray-300 items-center flex flex-col p-2">
                    <p className=''>Revenue</p>
                    <h2>{formatUSD(revenue)}</h2>
                </div>
                <div className="w-[20rem] h-[6rem] text-center justify-center border-b-2 border-r-2  rounded-md border-gray-300 items-center flex flex-col p-2">
                    <p className=''>Total Costs</p>
                    <h2>{formatUSD(totalCosts)}</h2>
                </div>
                <div className="w-[20rem] h-[6rem] text-center justify-center border-b-2 border-r-2  border-gray-300 items-center rounded-md flex flex-col p-2">
                    <p className=''>Profit</p>
                    <h2>{formatUSD(profit)}</h2>
                </div>
            </div>
            <div className="grid grid-cols-2 ">
                <div className='border-r-[1px] border-gray-300'>
                    <SimpleAreaChart
                        data={lineChartData}
                        series={[
                            { dataKey: 'revenue', stroke: '#8884d8', name: 'Revenue' },
                            { dataKey: 'profit', stroke: '#82ca9d', name: 'Net Profit' },
                        ]}
                    />
                </div>
                <div>
                    <RadarChart
                        data={selectedJobs}
                    />
                </div>
            </div>
            <div className="w-full rounded-md mt-2 min-h-[12rem] border-t-[.1rem] border-gray-300">
                <div className="px-8 pb-4 mt-4">
                    <RecentJobsTable recentJobs={jobs.slice(0, 5)} />
                </div>
            </div>
        </div>
    )
}