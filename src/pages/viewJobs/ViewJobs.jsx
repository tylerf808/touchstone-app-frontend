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

        let userID

        if (user.accountType === 'dispatcher') {
            userID = user.admin
        } else {
            userID = user.username
        }

        await fetch(apiUrl + '/api/jobs/allJobs',
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    admin: userID
                })
            }).then((res) => res.json()).then((data) => {
                const formattedCsvJobs = []
                data.forEach((el, i) => {
                    const job = {
                        _id: el._id,
                        data: el.date.toString(),
                        client: el.client.toString(),
                        driver: el.driver.toString(),
                        start: el.start.toString(),
                        pickUp: el.pickUp.toString(),
                        dropOff: el.dropOff.toString(),
                        driveTime: (el.driveTime / 60).toString(),
                        revenue: el.revenue.toString(),
                        ratePerMile: el.ratePerMile.toString(),
                        grossProfit: el.grossProfit.toString(),
                        grossProfitPercentage: el.grossProfitPercentage.toString(),
                        operatingProfit: el.operatingProfit.toString(),
                        operatingProfitPercentage: el.operatingProfitPercentage.toString(),
                        netProfit: el.netProfit.toString(),
                        netProfitPercentage: el.netProfitPercentage.toString(),
                        distance: el.distance.toString(),
                        laborRatePercent: el.laborRatePercent.toString(),
                        labor: el.labor.toString(),
                        payrollTax: el.payrollTax.toString(),
                        dispatch: el.dispatch.toString(),
                        factor: el.factor.toString(),
                        fuel: el.gasCost.toString(),
                        tolls: el.tolls.toString(),
                        odc: el.odc.toString(),
                        insurance: el.insurance.toString(),
                        trailer: el.trailer.toString(),
                        tractor: el.tractor.toString(),
                        gAndA: el.gAndA.toString(),
                        loan: el.loan.toString(),
                        repairs: el.repairs.toString(),
                        totalFixedCost: el.totalFixedCost.toString(),
                        totalCost: el.totalCost.toString()
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
        if (loggedIn === false) {
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