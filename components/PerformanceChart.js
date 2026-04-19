// components/PerformanceChart.js
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from './styles';

export default function PerformanceChart({ data, teamColor = '#FFB81C' }) {
  // Format data for recharts
  const chartData = data && data.length > 0
    ? data.map((point, idx) => ({
        round: point.round || idx + 1,
        points: point.points || 0,
        raceName: point.raceName || `Round ${idx + 1}`,
      }))
    : [];

  if (chartData.length === 0) {
    return (
      <ChartContainer>
        <p style={{ textAlign: 'center' }}>Loading chart data...</p>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 184, 28, 0.2)" />
          <XAxis
            dataKey="round"
            stroke="rgba(232, 232, 232, 0.6)"
            label={{ value: 'Race Round', position: 'insideBottomRight', offset: -5 }}
          />
          <YAxis
            stroke="rgba(232, 232, 232, 0.6)"
            label={{ value: 'Cumulative Points', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 31, 63, 0.95)',
              border: `2px solid ${teamColor}`,
              borderRadius: '8px',
              color: '#E8E8E8',
            }}
            cursor={{ stroke: teamColor, strokeWidth: 2 }}
          />
          <Legend wrapperStyle={{ color: '#E8E8E8' }} />
          <Line
            type="monotone"
            dataKey="points"
            stroke={teamColor}
            strokeWidth={3}
            dot={{ fill: teamColor, r: 5 }}
            activeDot={{ r: 7 }}
            name="Cumulative Points"
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}