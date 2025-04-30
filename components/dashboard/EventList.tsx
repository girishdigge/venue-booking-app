import { formatTime12hr } from '@/lib/validate';
import prisma from '@/lib/db'; // Make sure prisma is imported here if not already

const EventList = async ({
  dateParam,
}: {
  dateParam: string | string[] | undefined;
}) => {
  // --- MODIFICATION START ---
  let dateStringToUse: string | undefined = undefined;

  if (Array.isArray(dateParam)) {
    // If it's an array, take the first element (if it exists)
    dateStringToUse = dateParam[0];
  } else {
    // If it's a string or undefined, use it directly
    dateStringToUse = dateParam;
  }

  // Now create the date object using the guaranteed string or undefined
  const date = dateStringToUse ? new Date(dateStringToUse) : new Date();
  // --- MODIFICATION END ---

  // Ensure the date is valid before querying
  if (isNaN(date.getTime())) {
    // Handle invalid date string, maybe default to today or return an error message
    console.error('Invalid date parameter received:', dateParam);
    // Option: default to today
    // date = new Date();
    // Option: return empty or error indication
    return <p className='text-red-500'>Invalid date provided.</p>;
  }

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const data = await prisma?.event.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: {
      // Optional: Order events by start time
      start_time: 'asc',
    },
  });

  if (!data || data.length === 0) {
    return (
      <p className='text-gray-500 p-5'>No events scheduled for this date.</p>
    );
  }

  // Original mapping logic (ensure prisma was imported)
  return data?.map((event) => (
    <div
      className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple'
      key={event.id}
    >
      <div className='flex items-top justify-between'>
        <div className='flex flex-col'>
          <h1>{event.client_name}</h1>
          <span className='text-green-500 text-sm'>
            {event.hall === 'mainHall' ? 'Main Hall' : 'Open Party Hall'}
          </span>
        </div>
        <div className='flex flex-col'>
          {event.date.toLocaleDateString('en-IN', {
            day: 'numeric',
            year: 'numeric',
            month: 'long',
          })}
          <span className='text-gray-400 text-sm'>
            {event.start_time ? formatTime12hr(event.start_time) : '-'}-
            {event.end_time ? formatTime12hr(event.end_time) : '-'}
          </span>
        </div>
      </div>
      <p className='mt-2 text-sm text-gray-500'>{event.event_name}</p>
      <div>
        <span className='text-red-600'>Balance Remaining: {event.balance}</span>
      </div>
    </div>
  ));
};
export default EventList;
