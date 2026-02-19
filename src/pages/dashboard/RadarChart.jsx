import React from 'react';
import { ResponsiveContainer, RadarChart as RechartsRadarChart, Radar, PolarAngleAxis, PolarRadiusAxis, Legend, PolarGrid, Tooltip } from 'recharts';

const RadarChart = ({ data: propData }) => {
    if (!propData || !Array.isArray(propData) || propData.length === 0) {
        return null;
    }

    // If data already comes as [{ name, amount }] or [{ subject, value }], map directly
    const first = propData[0];
    let chartData = [];

    if (first && (('name' in first && (typeof first.amount === 'number' || typeof first.value === 'number')) || ('subject' in first && typeof first.value === 'number'))) {
        chartData = propData.map((d) => ({ subject: d.subject || d.name, value: d.value ?? d.amount }));
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
            'totalFixedCosts',
            'totalCost'
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

        chartData = Object.entries(totals).map(([k, v]) => ({ subject: k, value: v }));
    }

    if (!chartData.length) return null;

    return (
        <div className="w-full h-full bg-white rounded-md" onContextMenu={(e) => e.preventDefault()}>
            <ResponsiveContainer width="100%" aspect={1.618}>
                <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Tooltip />
                </RechartsRadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RadarChart;