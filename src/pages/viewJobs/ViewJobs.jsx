import { useState, useEffect, useContext } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { CSVLink, CSVDownload } from 'react-csv'
import { useNavigate } from 'react-router-dom';
import './viewJobsStyles.css'
import UserContext from '../../helpers/Context';

const { apiUrl } = require('../../urls.json')

export default function ViewJobs() {

    const { user, loggedIn} = useContext(UserContext)
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([])
    const [csvJobs, setCsvJobs] = useState()
    const [noJobs, setNoJobs] = useState(false)

    const getJobs = async () => {

        const token = localStorage.getItem('token')

        await fetch(apiUrl + '/api/jobs/allJobs',
            {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": token
                 },
            }).then((res) => res.json()).then((data) => {
                const formattedCsvJobs = []
                data.forEach((el, i) => {
                    const job = {
                        _id: el._id,
                        data: el.date,
                        client: el.client,
                        driver: el.driver,
                        start: el.start,
                        pickUp: el.pickUp,
                        dropOff: el.dropOff,
                        driveTime: (el.driveTime / 60),
                        revenue: el.revenue,
                        ratePerMile: el.ratePerMile,
                        grossProfit: el.grossProfit,
                        grossProfitPercentage: el.grossProfitPercentage,
                        operatingProfit: el.operatingProfit,
                        operatingProfitPercentage: el.operatingProfitPercentage,
                        netProfit: el.netProfit,
                        netProfitPercentage: el.netProfitPercentage,
                        distance: el.distance,
                        laborRatePercent: el.laborRatePercent,
                        labor: el.labor,
                        payrollTax: el.payrollTax,
                        dispatch: el.dispatch,
                        factor: el.factor,
                        fuel: el.gasCost,
                        tolls: el.tolls,
                        odc: el.odc,
                        insurance: el.insurance,
                        trailer: el.trailer,
                        tractor: el.tractor,
                        gAndA: el.gAndA,
                        loan: el.loan,
                        repairs: el.repairs,
                        totalFixedCost: el.totalFixedCost,
                        totalCost: el.totalCost
                    }
                    formattedCsvJobs.push(job)
                })
                setCsvJobs(formattedCsvJobs)
                setJobs(data)
                if (data.length === 0) {
                    setNoJobs(true)
                } else {
                    setNoJobs(false)
                }
            })
        

    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/')
        } else {
            getJobs()
        }
    }, [])

    const columns = [

        { field: 'date', headerName: 'Date', width: 120 },
        { field: 'client', headerName: 'Client', width: 120 },
        { field: 'driver', headerName: 'Driver', width: 120 },
        { field: 'start', headerName: 'Start', width: 200 },
        { field: 'pickUp', headerName: 'Pick Up', width: 200 },
        { field: 'dropOff', headerName: 'Drop Off', width: 200 },
        { field: 'distance', headerName: 'Milage', width: 120 },
        { field: 'driveTime', headerName: 'Drive Time', width: 120 },
        { field: 'revenue', headerName: 'Revenue', width: 120 },
        { field: 'ratePerMile', headerName: 'Rate Per Mile', width: 120 },
        { field: 'grossProfitPercentage', headerName: 'Gross Profit %', width: 120 },
        { field: 'operatingProfitPercentage', headerName: 'Operating Profit %', width: 120 },
        { field: 'netProfitPercentage', headerName: 'Net Profit %', width: 120 },
        { field: 'laborRatePercent', headerName: 'Labor %', width: 120 },
        { field: 'labor', headerName: 'Labor', width: 120 },
        { field: 'payrollTax', headerName: 'Payroll', width: 120 },
        { field: 'dispatch', headerName: 'Dispatch', width: 120 },
        { field: 'factor', headerName: 'Factor', width: 120 },
        { field: 'gasCost', headerName: 'Fuel', width: 120 },
        { field: 'tolls', headerName: 'Tolls', width: 100 },
        { field: 'odc', headerName: 'ODC', width: 120 },
        { field: 'insurance', headerName: 'Insurance', width: 120 },
        { field: 'trailer', headerName: 'Lease - Trailer', width: 120 },
        { field: 'tractor', headerName: 'Lease - Tractor', width: 120 },
        { field: 'gAndA', headerName: 'G&A', width: 120 },
        { field: 'operatingProfit', headerName: 'Operating Profit', width: 120 },
        { field: 'loan', headerName: 'Loan', width: 120 },
        { field: 'repairs', headerName: 'Repairs', width: 120 },
        { field: 'netProfit', headerName: 'Net Profit', width: 120 },
        { field: '_id', headerName: 'Job ID', width: 100 },
    ]

    return (
        <div className="pageContainer">
            {noJobs ?
                <p style={{ marginTop: '3rem' }}>No previous jobs</p>
                :
                <div className="previousJobsDisplay">
                    <DataGrid style={{ backgroundColor: 'white' }} getRowId={(row) => row._id} rows={jobs} columns={columns} pageSize={30} rowsPerPageOptions={[30]} />
                    {csvJobs ?
                        <CSVLink style={{ marginTop: '3rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', fontSize: '1.2rem' }} data={csvJobs}>Download Excel Sheet</CSVLink>
                        :
                        null
                    }
                </div>
            }
        </div>
    )
}