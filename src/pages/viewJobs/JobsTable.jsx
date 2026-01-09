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

    const handleSelectAll = (e) => {
        const checked = e.target.checked
        setSelectedJobs(() => {
            if(checked){
                return jobs
            }
            return []
        })
    }

    return (
        <div className="h-[44rem] mt-14 w-full justify-self-center pl-4 pr-4">
            <div id='jobs-table-header' className='bg-gray-200 grid grid-cols-[2%,9%,9%,10%,20%,20%,30%] justify-items-start
             justify-self-center w-full'>
                <input type='checkbox' onClick={(e) => handleSelectAll(e)} className='self-center justify-self-center p-4'></input>
                <h2 onClick={() => requestSort('date')} className='justify-self-center'>Date</h2>
                <h2 className='justify-self-center'>Client</h2>
                <h2 className='justify-self-center'>Driver</h2>
                <h2 className='justify-self-center'>Start</h2>
                <h2 className='justify-self-center'>End</h2>
                <div className='grid grid-cols-3 justify-items-center w-full'>
                    <h2 className='justify-self-center'>Revenue</h2>
                    <h2 className='justify-self-center'>Total Costs</h2>
                    <h2 className='justify-self-center'>Net Profit</h2>
                </div>
            </div>
            <div id='jobs-table-body' className='h-full w-full overflow-y-auto [scrollbar-gutter:stable] justify-self-center'>
                {sortedJobs.map((job, i) => {
                    return (
                        <div key={i} id='accordion-row' className={`w-full flex flex-row justify-center pt-2 ${i%2 !== 0 ? 'bg-gray-50' : null}`}>
                            <Accordion selectedJobs={selectedJobs} setSelectedJobs={setSelectedJobs} job={job} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default JobsTable;