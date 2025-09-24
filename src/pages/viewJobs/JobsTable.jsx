import React, { useState, useMemo } from 'react';
import './viewJobsStyles.css'

const JobsTable = ({ jobs, selectedJobs, setSelectedJobs }) => {
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending'
    });


    const sortedJobs = useMemo(() => {
        if (!sortConfig.key) return jobs;

        return [...jobs].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }, [jobs, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Exclude timestamp fields for display
    const excludedFields = ['createdAt', 'updatedAt', '_id', '__v', 'admin'];

    // Get all keys from the first job, filtering out excluded fields
    const tableHeaders = jobs.length > 0
        ? Object.keys(jobs[0])
            .filter(key => !excludedFields.includes(key))
        : [];

    const formattedTableHeaders = ['Start', 'Pick Up', 'Drop Off', 'Departure Date', 'Rate/Mile', 'Revenue', 'Gross Profit %',
        'Operating Profit %', 'Net Profit %', 'Total Costs', "Gas Cost", 'Factor', 'Overhead',
        'Loan', 'ODC', 'Repairs', 'Depreciation', 'Labor', 'Dispatch', 'Payroll Tax', 'Net Profit', 'Insurance',
        'Trailer Lease', 'Tractor Lease', 'Tolls', 'Gross Profit', 'Operating Profit', 'Total Fixed Costs', 'Total Direct Costs', 'Distance',
        'Drive Time', 'Client', 'Driver', 'Admin', 'Tractor']

    return (

        <table className="jobs-table">
            <thead className="jobs-table-header">
                <tr>
                    <th>
                        <input type='checkbox' style={{ alignSelf: 'center', justifySelf: 'center' }} onClick={((e) => {
                            const selectedRows = Array.from(document.getElementsByClassName('row-checkbox'))
                            if (e.target.checked) {
                                selectedRows.forEach((row) => {
                                    row.checked = true
                                    setSelectedJobs(jobs)
                                })
                            } else {
                                selectedRows.forEach((row) => {
                                    row.checked = false
                                    setSelectedJobs([])
                                })
                            }
                        })}></input>
                    </th>
                    {tableHeaders.map((header, i) => (
                        <th
                            key={header}
                            onClick={() => requestSort(header)}
                        >
                            {formattedTableHeaders[i]}
                            {sortConfig.key === header && (
                                <span className="jobs-table-sort-indicator">
                                    {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                                </span>
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="jobs-table-body">
                {sortedJobs.map((job, index) => (
                    <tr key={index} onClick={() => {
                        const checkbox = document.getElementById(`row-checkbox-${index}`);
                        if (checkbox.checked) {
                            checkbox.checked = false;
                            setSelectedJobs(selectedJobs.filter(j => j._id !== job._id));
                        } else {
                            checkbox.checked = true;
                            setSelectedJobs([...selectedJobs, job]);
                        }
                    }}>
                        <td style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '4.5rem' }}>
                            <input onChange={() => {
                                const checkbox = document.getElementById(`row-checkbox-${index}`);
                                if (checkbox.checked) {
                                    checkbox.checked = false;
                                    setSelectedJobs(selectedJobs.filter(j => j._id !== job._id));
                                } else {
                                    checkbox.checked = true;
                                    setSelectedJobs([...selectedJobs, job]);
                                }
                            }} className='row-checkbox' id={`row-checkbox-${index}`} type='checkbox' checked={selectedJobs.some(j => j._id === job._id)} />
                        </td>
                        {tableHeaders.map((header) => (
                            <td key={header} style={{ textAlign: 'center', verticalAlign: 'middle', height: '2.5rem', padding: 0 }}>
                                {job[header]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

    );
};

export default JobsTable;