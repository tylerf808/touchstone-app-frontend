import { ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Bar } from 'recharts';

const SimpleAreaChart = ({ data: propData, series = [{ dataKey: 'uv', stroke: '#8884d8', name: 'Value' }] }) => {

  const chartData = (propData && propData.length) ? propData : null;

  return (
    <div className='w-full h-full rounded-md p-[1rem]' onContextMenu={(e) => e.preventDefault()}>
      <ResponsiveContainer width="100%" aspect={1.618}>
        <ComposedChart
          data={chartData}
          margin={{
            top: 20,
            right: 40,
            left: 0,
            bottom: 0,
          }}
          padding={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" width={64} />
          <YAxis yAxisId="right" orientation="right" width={64} />
          <Tooltip />
          <Legend layout="horizontal" />
          {chartData && chartData.some((d) => typeof d.jobs === 'number') && (
            <Bar
              yAxisId="right"
              dataKey="jobs"
              name="Jobs"
              fill="#ffc658"
              fillOpacity={0.28}
              barSize={18}
              radius={[4, 4, 0, 0]}
            />
          )}
          {series.map((s) => (
            <Area
              key={s.dataKey}
              yAxisId="left"
              type="monotone"
              dataKey={s.dataKey}
              name={s.name || s.dataKey}
              stroke={s.stroke || s.color}
              strokeWidth={2}
              fill={s.fill || 'none'}
              fillOpacity={s.fillOpacity ?? 0}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleAreaChart;