import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan 23', actual: 15, target: 12 },
  { month: 'Feb 23', actual: 18, target: 14 },
  { month: 'Mar 23', actual: 16, target: 15 },
  { month: 'Apr 23', actual: 17, target: 16 },
  { month: 'May 23', actual: 19, target: 17 },
];

function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis
          tickFormatter={(value) => `$${value}M`}
          domain={[0, 'dataMax + 5']}
        />
        <Tooltip
          formatter={(value) => [`$${value}M`]}
          labelStyle={{ color: '#666' }}
        />
        <Line
          type="monotone"
          dataKey="target"
          stroke="#ff9800"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="actual"
          stroke="#3f51b5"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default RevenueChart;
