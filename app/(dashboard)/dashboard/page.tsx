// import CountChart from '@/components/dashboard/CountChart';
import EventCalendar from '@/components/dashboard/EventCalendar';
import MonthlyCountChart from '@/components/dashboard/MonthlyCountChart';
import UserCard from '@/components/dashboard/UserCard';

const AdminPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
        <div className='flex gap-4 justify-between'>
          <UserCard type='Admin' />
          <UserCard type='Manager' />
          <UserCard type='Admin' />
          <UserCard type='Manager' />
        </div>
        {/* <div className='flex gap-4 flex-col lg:flex-row'>
          <div className='w-full lg:w-1/3 h-[450px]'>
            <CountChart />
          </div>
          <div className='w-full lg:w-2/3 h-[450px]'></div>
        </div> */}

        <div className='w-full h-[450px] '>
          <MonthlyCountChart />
        </div>
      </div>
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
        <EventCalendar />
      </div>
    </div>
  );
};
export default AdminPage;
