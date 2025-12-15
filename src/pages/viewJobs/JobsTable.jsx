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
        <div id='jobs-table' className="h-max mt-14">
            <div id='jobs-table-header' className='grid grid-cols-[10%,10%,10%,20%,20%,30%] justify-items-start justify-self-center w-11/12'>
                <h2 className='ml-7'>Date</h2>
                <h2 className='ml-7'>Client</h2>
                <h2 className='ml-7'>Driver</h2>
                <h2 className='ml-7'>Start</h2>
                <h2 className='ml-7'>End</h2>
                <div className='grid grid-cols-3 justify-items-center w-full'>
                    <h2 className='text-center ml-7'>Revenue</h2>
                    <h2 className='text-center ml-7'>Total Costs</h2>
                    <h2 className='text-center ml-7'>Net Profit</h2>
                </div>
            </div>
            <div id='jobs-table-body' className='overflow-y-hidden h-full'>
                {jobs.map((job) => {
                    return (
                        <div id='accordion-row' className='w-full flex flex-row justify-center'>
                            <input type='checkbox' id='accordion-checkbox' className='self-center mr-4'></input>
                            <Accordion job={job} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default JobsTable;