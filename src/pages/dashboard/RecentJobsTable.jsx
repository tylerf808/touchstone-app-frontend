import formatUSD from "../../helpers/currencyFormatter"

export default function RecentJobsTable ({recentJobs}) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    };

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                    <tr>
                        <th className="px-4 py-2 font-semibold">Date</th>
                        <th className="px-4 py-2 font-semibold">Client</th>
                        <th className="px-4 py-2 font-semibold">Driver</th>
                        <th className="px-4 py-2 font-semibold">Tractor</th>
                        <th className="px-4 py-2 font-semibold">Distance</th>
                        <th className="px-4 py-2 font-semibold">Rate/Mile</th>
                        <th className="px-4 py-2 font-semibold">Revenue</th>
                        <th className="px-4 py-2 font-semibold">Gross %</th>
                        <th className="px-4 py-2 font-semibold">Net %</th>
                        <th className="px-4 py-2 font-semibold">Net Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {recentJobs && recentJobs.length > 0 ? (
                        recentJobs.map((job, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-2">{formatDate(job.date)}</td>
                                <td className="px-4 py-2">{job.client || 'N/A'}</td>
                                <td className="px-4 py-2">{job.driver || 'N/A'}</td>
                                <td className="px-4 py-2">{job.tractor || 'N/A'}</td>
                                <td className="px-4 py-2">{job.distance || 'N/A'}</td>
                                <td className="px-4 py-2">{formatUSD(job.ratePerMile) || 'N/A'}</td>
                                <td className="px-4 py-2">{formatUSD(job.revenue)}</td>
                                <td className="px-4 py-2">{job.grossProfitPercentage != null ? Number(job.grossProfitPercentage).toFixed(2) : 'N/A'}%</td>
                                <td className="px-4 py-2">{job.netProfitPercentage != null ? Number(job.netProfitPercentage).toFixed(2) : 'N/A'}%</td>
                                <td className="px-4 py-2">{formatUSD(job.netProfit)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="px-4 py-2 text-center text-gray-500">
                                No jobs to display
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}