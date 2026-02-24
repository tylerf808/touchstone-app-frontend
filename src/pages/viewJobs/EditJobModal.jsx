import { useState, useEffect } from "react";

export default function EditJobModal({ isOpen, setIsOpen, saveJob, job }) {

    const [editedJob, setEditedJob] = useState({})

    useEffect(() => {
        if (isOpen && job) {
            setEditedJob(job)
        }
    }, [isOpen, job])

    const handleChange = (e) => {
        const { name, value, type } = e.target
        const val = type === 'number' ? (value === '' ? '' : Number(value)) : value
        setEditedJob(prev => ({ ...prev, [name]: val }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (saveJob) await saveJob(editedJob)
        setIsOpen(false);
    };

    if (!isOpen) return null;

    const fields = [
        // Basic
        { label: 'Date', name: 'date', type: 'text' },
        { label: 'Client', name: 'client', type: 'text' },
        { label: 'Driver', name: 'driver', type: 'text' },
        { label: 'Start', name: 'start', type: 'text' },
        { label: 'End', name: 'end', type: 'text' },
        { label: 'Drive Time', name: 'driveTime', type: 'text' },
        { label: 'Distance', name: 'distance', type: 'number' },

        // Financial
        { label: 'Revenue', name: 'revenue', type: 'number' },
        { label: 'Rate Per Mile', name: 'mileageRate', type: 'number' },
        { label: 'Gross Profit', name: 'grossProfit', type: 'number' },
        { label: 'Gross Profit %', name: 'grossProfitPercentage', type: 'text' },
        { label: 'Operating Profit', name: 'operatingProfit', type: 'number' },
        { label: 'Operating Profit %', name: 'operatingProfitPercentage', type: 'text' },
        { label: 'Net Profit', name: 'netProfit', type: 'number' },
        { label: 'Net Profit %', name: 'netProfitPercentage', type: 'text' },
        { label: 'Labor Rate %', name: 'laborRatePercent', type: 'text' },

        // Direct costs
        { label: 'Labor', name: 'labor', type: 'number' },
        { label: 'Payroll Tax', name: 'payrollTax', type: 'number' },
        { label: 'Dispatch', name: 'dispatch', type: 'number' },
        { label: 'Factor', name: 'factor', type: 'number' },
        { label: 'Fuel', name: 'fuel', type: 'number' },
        { label: 'Tolls', name: 'tolls', type: 'number' },
        { label: 'ODC', name: 'odc', type: 'number' },

        // Fixed / other
        { label: 'Trailer Lease', name: 'trailerLease', type: 'number' },
        { label: 'Tractor Lease', name: 'tractorLease', type: 'number' },
        { label: 'Insurance', name: 'insurance', type: 'number' },
        { label: 'Overhead', name: 'overhead', type: 'number' },
        { label: 'Depreciation', name: 'depreciation', type: 'number' },
        { label: 'Parking', name: 'parking', type: 'number' },
        { label: 'Loan', name: 'loan', type: 'number' },
        { label: 'Repairs', name: 'repairs', type: 'number' },

        // Totals
        { label: 'Total Fixed Cost', name: 'totalFixedCost', type: 'number' },
        { label: 'Total Cost', name: 'totalCost', type: 'number' }
    ]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 top-[4rem]">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {fields.map((f) => (
                        <div className="flex flex-col" key={f.name}>
                            <label className="text-sm font-medium mb-1">{f.label}:</label>
                            <input
                                className="border rounded p-2 w-full"
                                type={f.type}
                                name={f.name}
                                value={editedJob?.[f.name] ?? ''}
                                onChange={handleChange}
                                step={f.type === 'number' ? 'any' : undefined}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-3 mt-4">
                    <button type="button" className="bg-gray-200 text-gray-800 px-4 py-2 rounded" onClick={() => setIsOpen(false)}>Cancel</button>
                    <button type="submit" className="bg-orange-300 text-white px-4 py-2 rounded">Save</button>
                </div>
            </form>
        </div>
    );
};