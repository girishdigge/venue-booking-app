import Pagination from '@/components/dashboard/Pagination';
import Table from '@/components/dashboard/Table';
import TableSearch from '@/components/dashboard/TableSearch';
import { eventsData } from '@/constants/data';
import Image from 'next/image';
import Link from 'next/link';

export type Client = {
  id: number;
  name: string;
  email?: string;
  phone: string;
  phoneAlt?: string;
  address: string;
  date: string;
  hall: string;
  event: string;
  balance: string;
  amount: string;
};

const columns = [
  {
    header: 'Sr',
    accessor: 'id',
  },
  {
    header: 'Name',
    accessor: 'name',
    className: '',
  },
  {
    header: 'Date',
    accessor: 'date',
    className: '',
  },
  {
    header: 'Event',
    accessor: 'event',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Hall',
    accessor: 'hall',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Balance',
    accessor: 'balance',
    className: 'hidden lg:table-cell',
  },
  {
    header: 'Amount',
    accessor: 'amount',
    className: 'hidden md:table-cell',
  },
  {
    header: 'Actions',
    accessor: 'action',
  },
];
const page = () => {
  const renderRow = (item: Client) => (
    <tr
      key={item.id}
      className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight'
    >
      <td className='pt-3 pb-2 '>{item.id}</td>
      <td className='pt-3 pb-2 '>{item.name}</td>
      <td className='pt-3 pb-2 '>{item.date}</td>
      <td className='pt-3 pb-2 hidden md:table-cell'>{item.event}</td>
      <td className='pt-3 pb-2 hidden md:table-cell'>{item.hall}</td>
      <td className='pt-3 pb-2 hidden lg:table-cell'>{item.balance}</td>
      <td className='pt-3 pb-2 hidden md:table-cell'>{item.amount}</td>
      <td>
        <div className='flex items-center gap-2'>
          <Link href={`/list/${item.id}`}>
            <button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky'>
              <Image src='/view.png' alt='view' width={16} height={16} />
            </button>
          </Link>
          {/* {role ==='admin'&&()} */}
          <button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple'>
            <Image src='/delete.png' alt='delete' width={16} height={16} />
          </button>
        </div>
      </td>
    </tr>
  );
  return (
    <div className='flex-1  bg-white p-4 rounded-md m-4 mt-0'>
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>All Events</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src='/filter.png' alt='filter' width={14} height={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src='/sort.png' alt='filter' width={14} height={14} />
            </button>
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={eventsData} />
      <Pagination />
    </div>
  );
};
export default page;
