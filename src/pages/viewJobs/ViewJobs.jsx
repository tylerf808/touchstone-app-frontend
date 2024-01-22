import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { CSVLink, CSVDownload } from 'react-csv'
import { useNavigate } from 'react-router-dom';
import './viewJobsStyles.css'

const { apiUrl } = require('../../urls.json')

export default function ViewJobs({ user, loggedIn }) {

    const navigate = useNavigate();

    let [jobs, setJobs] = useState([])
    let [noJobs, setNoJobs] = useState(false)

    const getJobs = async () => {

        let userID

        if(user.accountType === 'dispatcher'){
            userID = user.admin
        } else {
            userID = user.username
        }

        const jobs = await fetch(apiUrl + '/api/jobs/allJobs',
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    admin: userID
                })
            }).then((res) => res.json()).then((data) => {
                console.log(data)
                return data
            })
        setJobs(jobs)
        if (jobs.length === 0) {
            
            setNoJobs(true)
        } else {
            setNoJobs(false)
        }
    }

    useEffect(() => {
        if(loggedIn === false){
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
                    <CSVLink style={{ marginTop: '3rem', display: 'flex', flexDirection: 'row', justifyContent: 'center', fontSize: '1.2rem'}} data={jobs}>Download Excel Sheet</CSVLink>
                </div>
            }
        </div>
    )
}