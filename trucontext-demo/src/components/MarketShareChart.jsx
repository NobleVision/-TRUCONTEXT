import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    region: 'North America',
    q1: 45,
    q2: 38,
  },
  {
    region: 'Europe',
    q1: 42,
    q2: 45,
  },
  {
    region: 'Asia Pacific',
    q1: 28,
    q2: 35,
  },
  {
    region: 'Latin America',
    q1: 25,
    q2: 28,
  },
];

function MarketShareChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="region" />
        <YAxis tickFormatter={(value) => `${value}%`} />
        <Tooltip formatter={(value) => [`${value}%`]} />
        <Bar dataKey="q1" fill="#3f51b5" name="Q1 2023" />
        <Bar dataKey="q2" fill="#ff9800" name="Q2 2023" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default MarketShareChart;
