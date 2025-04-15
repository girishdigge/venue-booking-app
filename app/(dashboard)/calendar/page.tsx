import BigCalendar from '@/components/dashboard/BigCalendar';

const ManagerPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row'>
      <div className='w-full xl:w-[98%]'>
        <div className='h-[98vh] bg-white p-4 rounded-md'>
          <h1 className='text-xl font-semibold'>Schedule (4A)</h1>
          <BigCalendar />
        </div>
      </div>
    </div>
  );
};
export default ManagerPage;
