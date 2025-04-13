'use client';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Jan',
    h1: 4000,
    h2: 2400,
  },
  {
    name: 'Feb',
    h1: 3800,
    h2: 2210,
  },
  {
    name: 'Mar',
    h1: 4200,
    h2: 2290,
  },
  {
    name: 'Apr',
    h1: 3780,
    h2: 2000,
  },
  {
    name: 'May',
    h1: 4180,
    h2: 2181,
  },
  {
    name: 'Jun',
    h1: 3390,
    h2: 2500,
  },
  {
    name: 'Jul',
    h1: 4490,
    h2: 2100,
  },
  {
    name: 'Aug',
    h1: 4500,
    h2: 2400,
  },
  {
    name: 'Sep',
    h1: 4100,
    h2: 2200,
  },
  {
    name: 'Oct',
    h1: 3900,
    h2: 2100,
  },
  {
    name: 'Nov',
    h1: 4300,
    h2: 2400,
  },
  {
    name: 'Dec',
    h1: 4600,
    h2: 2700,
  },
];

const MonthlyCountChart = () => {
  return (
    <div className='bg-gray-100 rounded-xl w-full h-full p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='font-semibold text-lg'>Monthly Booking</h1>
      </div>
      <ResponsiveContainer width='100%' height='90%'>
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#ddd' />
          <XAxis dataKey='name' axisLine={false} tickLine={false} />
          <YAxis axisLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: '10px', borderColor: 'lightgray' }}
          />
          <Legend
            align='left'
            verticalAlign='top'
            wrapperStyle={{ paddingTop: '20px', paddingBottom: '40px' }}
          />
          <Bar
            dataKey='h1'
            fill='gold'
            activeBar={<Rectangle fill='#fae27c' stroke='blue' />}
            legendType='circle'
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey='h2'
            fill='skyblue'
            activeBar={<Rectangle fill='#c3ebfa' stroke='purple' />}
            legendType='circle'
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default MonthlyCountChart;
