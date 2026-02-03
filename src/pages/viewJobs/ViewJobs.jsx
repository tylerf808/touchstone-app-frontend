import { useState, useEffect, useContext } from 'react'
import CsvDownloader from 'react-csv-downloader';
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
    const [noJobs, setNoJobs] = useState(true)
    const [showModal, setShowModal] = useState(false)

    const getJobs = async () => {

        await fetch(apiUrl + `/api/jobs/allJobs`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            }).then((res) => res.json()).then((data) => {
                const regex = new RegExp('Z', 'g');
                const formattedArray = data.map((el, i) => {
                    let filteredDate = el.date.replace(regex, "")
                    const newDate = new Date(filteredDate)
                    const job = {
                        _id: el._id,
                        date: newDate.toLocaleDateString(),
                        client: el.client,
                        driver: el.driver,
                        start: el.start,
                        end: el.dropOff,
                        driveTime: el.driveTime,
                        revenue: el.revenue,
                        mileageRate: el.ratePerMile,
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
                        depreciation: el.depreciation,
                        parking: el.parking,
                        overhead: el.overhead,
                        factor: el.factor,
                        fuel: el.gasCost,
                        tolls: el.tolls,
                        odc: el.odc,
                        insurance: el.insurance,
                        trailerLease: el.trailerLease,
                        tractorLease: el.tractorLease,
                        loan: el.loan,
                        repairs: el.repairs,
                        totalFixedCost: el.totalFixedCost,
                        totalCost: el.totalCost
                    }
                    return job
                })
                setJobs(formattedArray)
                if (data.length === 0) {
                    setNoJobs(true)
                } else {
                    setNoJobs(false)
                }
            })
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(apiUrl + '/api/jobs/deleteJobs', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({
                    jobs: selectedJobs
                })
            });
            if (!response.ok) {
                throw new Error('Failed to delete jobs');
            }
            setSelectedJobs([]);
            setJobs(response.json())
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/')
            return
        }
        getJobs()
    }, [])

    return (
        <div className="jobs-table-container overflow-x-hidden overflow-y-hidden pb-4">
            <div className='view-jobs-toolbar'>
                <p style={{ marginRight: '2.5rem', marginLeft: '2rem' }}>{selectedJobs.length} Selections</p>
                <div>
                    <CsvDownloader filename="TouchstoneCSV"
                        extension=".csv"
                        separator=";"
                        datas={jobs}
                        text="Download"
                        className='mr-4'
                    />
                    <i className="fa fa-trash-o" onClick={() => { if (selectedJobs.length !== 0) setShowModal(true) }} style={{ color: 'red', fontSize: '1.5rem', marginRight: '1rem' }}></i>
                </div>
            </div>
            {showModal ? <ConfirmationModal getJobs={getJobs} handleDelete={handleDelete} setShowModal={setShowModal} selectedJobs={selectedJobs} /> : null}
            <JobsTable jobs={jobs} selectedJobs={selectedJobs} setSelectedJobs={setSelectedJobs} />
        </div>
    )
}