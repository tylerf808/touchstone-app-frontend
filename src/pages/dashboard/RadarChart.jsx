import { RadarChart, Radar, PolarAngleAxis, PolarRadiusAxis, Legend, PolarGrid } from 'recharts';

const RadarChart = ({ data: propData, series = [{ dataKey: 'uv', stroke: '#8884d8', name: 'Value' }] }) => {

    const chartData = (propData && propData.length) ? propData : null;

    return (
        <div className='w-full h-full bg-white rounded-md' onContextMenu={(e) => e.preventDefault()}>
            <ResponsiveContainer width="100%" aspect={1.618}>
                <RadarChart style={{ width: '100%', maxWidth: '500px', maxHeight: '70vh', aspectRatio: 1 }} responsive data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar
                        name="Mike"
                        dataKey="A"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                        isAnimationActive={isAnimationActive}
                    />
                    <Legend />
                    <RechartsDevtools />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RadarChart;