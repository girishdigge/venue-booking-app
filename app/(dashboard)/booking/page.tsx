import FormModal from '@/components/dashboard/FormModal';
import Pagination from '@/components/dashboard/Pagination';
import Table from '@/components/dashboard/Table';
import TableSearch from '@/components/dashboard/TableSearch';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/db';
import { EventSchema } from '@/schema/schema';
import { ITEM_PER_PAGE } from '@/lib/settings';
import { Hall, Prisma } from '@/lib/generated/prisma';

const columns = [
  {
    header: 'Id',
    accessor: 'id',
  },
  {
    header: 'Name',
    accessor: 'client_name',
    className: '',
  },
  {
    header: 'Date',
    accessor: 'date',
    className: '',
  },
  {
    header: 'Event',
    accessor: 'event_name',
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

const renderRow = (item: EventSchema) => (
  <tr
    key={item.id}
    className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight'
  >
    <td className='pt-3 pb-2 '>{item.id}</td>
    <td className='pt-3 pb-2 '>{item.client_name}</td>
    <td className='pt-3 pb-2 '>
      {item.date.toLocaleDateString('en-IN', {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
      })}
    </td>
    <td className='pt-3 pb-2 hidden md:table-cell'>{item.event_name}</td>
    <td className='pt-3 pb-2 hidden md:table-cell'>{item.hall}</td>
    <td className='pt-3 pb-2 hidden lg:table-cell'>{item.balance}</td>
    <td className='pt-3 pb-2 hidden md:table-cell'>{item.amount}</td>
    <td>
      <div className='flex items-center gap-2'>
        <Link href={`/booking/${item.id}`}>
          <button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky'>
            <Image src='/view.png' alt='view' width={16} height={16} />
          </button>
        </Link>
        {/* {role ==='admin'&&()} */}
        {/* <button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple'>
          <Image src='/delete.png' alt='delete' width={16} height={16} />
        </button> */}
        <FormModal table='booking' type='delete' id={item.id} />
      </div>
    </td>
  </tr>
);
const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, ...queryParam } = await searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.EventWhereInput = {};
  if (queryParam) {
    for (const [key, value] of Object.entries(queryParam)) {
      if (value !== undefined) {
        switch (key) {
          case 'id':
            query.id = parseInt(value);
            break;
          case 'client_name':
            query.client_name = value;
            break;
          case 'date':
            query.date = new Date(value);
            break;
          case 'start_time':
            query.start_time = value;
            break;
          case 'end_time':
            query.end_time = value;
            break;
          case 'email':
            query.email = value;
            break;
          case 'contact':
            query.contact = value;
            break;
          case 'address':
            query.address = value;
            break;
          case 'event_name':
            query.event_name = value;
            break;
          case 'hall':
            query.hall = value === 'mainHall' ? value : 'secondHall';
            break;
          case 'details':
            query.details = value;
            break;
          // case 'amount':
          //   query.amount = parseInt(value);
          //   break;
          // case 'advance':
          //   query.advance = parseInt(value);
          //   break;
          // case 'balance':
          //   query.balance = parseInt(value);
          //   break;
          case 'search':
            const hallMatches: string[] = ['mainHall', 'secondHall'].filter(
              (h) => h.toLowerCase().includes(value.toLowerCase())
            );
            query.OR = [
              { client_name: { contains: value, mode: 'insensitive' } },
              { event_name: { contains: value, mode: 'insensitive' } },
              { email: { contains: value, mode: 'insensitive' } },
              { contact: { contains: value, mode: 'insensitive' } },
              { address: { contains: value, mode: 'insensitive' } },
              { details: { contains: value, mode: 'insensitive' } },
              ...hallMatches.map((match) => ({
                hall: { equals: match as Hall },
              })),
            ];
            break;

          default:
            break;
        }
      }
    }
  }

  const whereClause = query.OR ? { OR: query.OR } : query;

  const [bookings, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: whereClause,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
      orderBy: { id: 'desc' },
    }),
    prisma.event.count({ where: whereClause }),
  ]);

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
              <Image src='/sort.png' alt='sort' width={14} height={14} />
            </button>
            <FormModal table='booking' type='create' />
          </div>
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={bookings} />
      <Pagination page={p} count={count} />
    </div>
  );
};
export default page;
