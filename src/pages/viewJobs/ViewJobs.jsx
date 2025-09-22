import { useState, useEffect, useContext } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { CSVLink, CSVDownload } from 'react-csv'
import { useNavigate } from 'react-router-dom';
import './viewJobsStyles.css'
import UserContext from '../../helpers/Context';
import JobsTable from './JobsTable';
import ConfirmationModal from './ConfirmationModal';

export default function ViewJobs() {

    const { user, loggedIn, apiUrl } = useContext(UserContext)

    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const [selectedJobs, setSelectedJobs] = useState([])
    const [jobs, setJobs] = useState([])
    const [csvJobs, setCsvJobs] = useState()
    const [noJobs, setNoJobs] = useState(true)

    const getJobs = async () => {

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
                        Pick_Up: el.pickUp,
                        Drop_Off: el.dropOff,
                        Drive_time: (el.driveTime / 60),
                        Revenue: el.revenue,
                        Rate_per_Mile: el.ratePerMile,
                        Gross_Profit: el.grossProfit,
                        Gross_Profit_Percentage: el.grossProfitPercentage,
                        Operating_Profit: el.operatingProfit,
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

    const handleDelete = async () => {
        await fetch(apiUrl + '/api/jobs/deleteJobs', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                jobs: selectedJobs
            })
        }).then((res) => res.json())
            .then(() => {
                setSelectedJobs([])
                getJobs()
            })
    }

    useEffect(() => {
        if (!token) {
            navigate('/')
        } else {
            getJobs()
        }
    }, [])

    return (
        <div className="jobs-table-container">
            <div className='view-jobs-toolbar'>
                <p style={{ marginRight: '2.5rem' }}>{selectedJobs.length} Selections</p>
                <i className="fa fa-download" style={{ fontSize: '1.2rem', marginRight: '2rem' }}>Download</i>
                <i className="fa fa-trash-o" onClick={handleDelete} style={{ color: 'red', fontSize: '1.5rem', marginRight: '1rem' }}></i>
            </div>
            <ConfirmationModal handleDelete={handleDelete}/>
            <JobsTable jobs={jobs} selectedJobs={selectedJobs} setSelectedJobs={setSelectedJobs} />
        </div>
    )
}