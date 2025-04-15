'use client';

import Image from 'next/image';
import { JSX, useState } from 'react';
import { Button } from '../ui/button';
import dynamic from 'next/dynamic';
// import EventForm from '../forms/EventForm';

const EventForm = dynamic(() => import('../forms/EventForm'), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (type: 'create' | 'update', data?: any) => JSX.Element;
} = {
  booking: (type, data) => <EventForm type={type} data={data} />,
  // employee:(type,data)=><EmployeeForm type={type} data={data}/>
};
const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table: 'booking' | 'employee';
  type: 'create' | 'update' | 'delete';
  data?: any;
  id?: number;
}) => {
  const size = type === 'create' ? 'w-8 h-8' : 'w-7 h-7';
  const bgColor =
    type === 'create'
      ? 'bg-lamaYellow'
      : type === 'update'
      ? 'bg-lamaSky'
      : 'bg-lamaPurple';

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === 'delete' && id ? (
      <form action='' className='p-4 gap-4 flex flex-col'>
        <h2 className='text-center text-lg font-medium'>
          Are you sure? All the data will be lost.
        </h2>

        <Button
          className='bg-red-700 text-white py-4 px-4 rounded-md border-none'
          type='submit'
        >
          Delete
        </Button>
      </form>
    ) : type === 'create' || type === 'update' ? (
      forms[table](type, data)
    ) : (
      'Form not found'
    );
  };

  return (
    <>
      <button
        className={`${size}flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt={`${type}`} height={16} width={16} />
      </button>

      {open && (
        <div className='w-screen h-screen absolute left-0 top-0 bg-black/50 z-50 flex items-center justify-center'>
          <div className='p-4 bg-white rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]'>
            <Form />
            <div className='absolute top-4 right-4 cursor-pointer '>
              <Image
                src='/close.png'
                alt='close'
                height={14}
                width={14}
                onClick={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default FormModal;
