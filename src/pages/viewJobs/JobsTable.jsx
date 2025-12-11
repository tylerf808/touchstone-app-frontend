import React, { useState, useMemo } from 'react';
import './viewJobsStyles.css'
import Accordion from './Accordion';

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

    return (
        <div className='jobs-table'>
            <div id='jobs-table-header'>
                <h2>Date</h2>
                <h2>Start</h2>
                <h2>End</h2>
            </div>
            {jobs.map((job) => {
                return (
                    <Accordion job={job} />
                )
            })}

        </div>
    );
};

export default JobsTable;