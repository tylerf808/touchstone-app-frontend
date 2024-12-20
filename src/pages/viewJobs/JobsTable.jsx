import React, { useState, useMemo } from 'react';
import './viewJobsStyles.css'

const JobsTable = ({ jobs }) => {
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

    const formattedTableHeaders = ['Start', 'Pick Up', 'Drop Off', 'Departure Date', 'Revenue', 'Gross Profit %',
        'Operating Profit %', 'Net Profit %', 'Total Costs', "Gas Cost", 'Rate/Mile', 'Factor', 'G&A',
        'Loan', 'ODC', 'Repairs', 'Labor', 'Dispatch', 'Payroll Tax', 'Net Profit', 'Labor Rate %', 'Insurance',
        'Trailer Lease', 'Tractor Lease', 'Tolls', 'Gross Profit', 'Operating Profit', 'Total Fixed Costs', 'Distance',
        'Drive Time', 'Client', 'Driver', 'Tractor']

    return (
        
            <table className="jobs-table">
                <thead className="jobs-table-header">
                    <tr>
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
                        <tr key={index}>
                            {tableHeaders.map((header) => (
                                <td key={header}>
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