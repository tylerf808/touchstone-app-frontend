import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { CSVLink, CSVDownload } from 'react-csv'

export default function ViewJobs({ user }) {

    let [jobs, setJobs] = useState()

    const getJobs = async () => {
        const response = await fetch('http://localhost:3001/api/jobs?id=' + user,
            {
                method: 'GET',
            }).then((res) => res.json())
        if(response !== null){
            setJobs(response)
        } else {
            return
        }
    }

    useEffect(() => {
        getJobs()
    }, [])

    const columns = [
        { field: 'id', headerName: 'Job ID', width: 80 },
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
        { field: 'depreciation', headerName: 'Depreciation', width: 120 },        
        { field: 'netProfit', headerName: 'Net Profit', width: 120 },
    ]

    return (
        <div className="pageContainer">
            <div style={{ marginTop: 20, height: '60vh', width: '80vw' }}>
                {jobs ? <>
                    <DataGrid style={{ backgroundColor: 'white' }} rows={jobs} columns={columns} pageSize={30} rowsPerPageOptions={[30]} />
                    <CSVLink style={{ marginTop: 2, display: 'flex', flexDirection: 'row', justifyContent: 'center' }} data={jobs} >Download Excel Sheet</CSVLink>
                </>
                    : <p>No previous jobs</p>}
            </div>
        </div>
    )
}