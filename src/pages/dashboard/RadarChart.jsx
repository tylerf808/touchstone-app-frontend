import React from 'react';
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const PieChart = ({ data: propData }) => {
    if (!propData || !Array.isArray(propData) || propData.length === 0) {
        return null;
    }

    // Function to convert camelCase to Title Case
    const formatLabel = (str) => {
        return str
            .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before capital letters
            .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
    };

    // If data already comes as [{ name, amount }] or [{ subject, value }], map directly
    const first = propData[0];
    let chartData = [];

    if (first && (('name' in first && (typeof first.amount === 'number' || typeof first.value === 'number')) || ('subject' in first && typeof first.value === 'number'))) {
        chartData = propData.map((d) => ({ name: formatLabel(d.subject || d.name), value: d.value ?? d.amount }));
    } else {
        // Aggregate numeric keys across array of objects to totals per cost category
        const totals = {};
        const blacklistArr = [
            'grossProfit',
            'operatingProfit',
            'netProfit',
            'revenue',
            'distance',
            'tractor',
            'driver',
            'admin',
            '_id',
            'date',
            'createdAt',
            'updatedAt',
            'totalDirectCosts',
            'totalFixedCost',
            'totalCost',
            'ratePerMile'
        ];
        const blacklist = new Set(blacklistArr.map((s) => String(s).toLowerCase()));

        propData.forEach((item) => {
            if (item && typeof item === 'object') {
                Object.entries(item).forEach(([k, v]) => {
                    const keyLower = String(k).toLowerCase();
                    if (blacklist.has(keyLower)) return;
                    if (keyLower.endsWith('id')) return;
                    if (typeof v === 'number' && Number.isFinite(v)) {
                        totals[k] = (totals[k] || 0) + v;
                    }
                });
            }
        });

        chartData = Object.entries(totals).map(([k, v]) => ({ name: formatLabel(k), value: v }));
    }

    if (!chartData.length) return null;

    // Define colors for the pie slices
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

    return (
        <div className="w-full h-full bg-white rounded-md" onContextMenu={(e) => e.preventDefault()}>
            <ResponsiveContainer width="100%" aspect={1.618}>
                <RechartsPieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </RechartsPieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChart;