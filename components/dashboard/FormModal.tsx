// 'use client';

// import Image from 'next/image';
// import { JSX, useState } from 'react';
// import { Button } from '../ui/button';
// import dynamic from 'next/dynamic';
// // import EventForm from '../forms/EventForm';

// const EventForm = dynamic(() => import('../forms/EventForm'), {
//   loading: () => <h1>Loading...</h1>,
// });

// const forms: {
//   [key: string]: (type: 'create' | 'update', data?: any) => JSX.Element;
// } = {
//   booking: (type, data) => <EventForm type={type} data={data} />,
//   // employee:(type,data)=><EmployeeForm type={type} data={data}/>
// };
// const FormModal = ({
//   table,
//   type,
//   data,
//   id,
// }: {
//   table: 'booking' | 'employee';
//   type: 'create' | 'update' | 'delete';
//   data?: any;
//   id?: number;
// }) => {
//   const size = type === 'create' ? 'w-8 h-8' : 'w-7 h-7';
//   const bgColor =
//     type === 'create'
//       ? 'bg-lamaYellow'
//       : type === 'update'
//       ? 'bg-lamaSky'
//       : 'bg-lamaPurple';

//   const [open, setOpen] = useState(false);

//   const Form = () => {
//     return type === 'delete' && id ? (
//       <form action='' className='p-4 gap-4 flex flex-col'>
//         <h2 className='text-center text-lg font-medium'>
//           Are you sure? All the data will be lost.
//         </h2>

//         <Button
//           className='bg-red-700 text-white py-4 px-4 rounded-md border-none'
//           type='submit'
//         >
//           Delete
//         </Button>
//       </form>
//     ) : type === 'create' || type === 'update' ? (
//       forms[table](type, data)
//     ) : (
//       'Form not found'
//     );
//   };

//   return (
//     <>
//       <button
//         className={`${size}flex items-center justify-center rounded-full ${bgColor}`}
//         onClick={() => setOpen(true)}
//       >
//         <Image src={`/${type}.png`} alt={`${type}`} height={16} width={16} />
//       </button>

//       {open && (
//         <div className='w-screen h-screen absolute left-0 top-0 bg-black/50 z-50 flex items-center justify-center'>
//           <div className=' bg-white rounded-md relative h-[90%] w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] overflow-auto'>
//             <Form />
//             <div className='absolute top-4 right-4 cursor-pointer '>
//               <Image
//                 src='/close.png'
//                 alt='close'
//                 height={14}
//                 width={14}
//                 onClick={() => setOpen(false)}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default FormModal;

// FormModal.tsx
'use client';

import Image from 'next/image';
import { JSX, useState } from 'react';
import dynamic from 'next/dynamic';

const EventForm = dynamic(() => import('../forms/EventForm'), {
  loading: () => (
    <div className='flex items-center justify-center p-12'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
    </div>
  ),
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
  const [open, setOpen] = useState(false);

  const getButtonStyles = () => {
    const baseStyle =
      'flex items-center justify-center rounded-full shadow-md transition-all duration-200 hover:scale-105';

    switch (type) {
      case 'create':
        return `${baseStyle} bg-lamaYellow w-7 h-7`;
      case 'update':
        return `${baseStyle} bg-lamaSky w-7 h-7`;
      case 'delete':
        return `${baseStyle} bg-lamaPurple w-7 h-7`;
      default:
        return baseStyle;
    }
  };

  const Form = () => {
    if (type === 'delete' && id) {
      return (
        <div className='p-8 flex flex-col items-center'>
          <div className='mb-6 bg-red-100 rounded-full p-4'>
            <Image src='/delete.png' alt='Delete' height={28} width={28} />
          </div>

          <h2 className='text-center text-xl font-semibold mb-2'>
            Confirm Deletion
          </h2>
          <p className='text-center text-gray-500 mb-8'>
            Are you sure you want to delete this item? All data will be
            permanently removed. This action cannot be undone.
          </p>

          <div className='flex gap-4 w-full'>
            <button
              onClick={() => setOpen(false)}
              className='flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50'
            >
              Cancel
            </button>
            <button
              className='flex-1 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700'
              type='submit'
            >
              Yes, Delete
            </button>
          </div>
        </div>
      );
    }

    return type === 'create' || type === 'update' ? (
      forms[table](type, data)
    ) : (
      <div className='p-8 text-center'>Form not found</div>
    );
  };

  return (
    <>
      <button
        className={getButtonStyles()}
        onClick={() => setOpen(true)}
        aria-label={`${type} item`}
      >
        <Image src={`/${type}.png`} alt={type} height={18} width={18} />
      </button>

      {open && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity'>
          <div
            className='bg-white rounded-2xl relative max-h-[90vh] w-full md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] overflow-auto animate-slideIn shadow-2xl'
            style={{ animation: 'slideIn 0.3s ease-out' }}
          >
            <div className='sticky top-0 right-0 pt-4 pr-4 flex justify-end z-10'>
              <button
                onClick={() => setOpen(false)}
                className='bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors'
                aria-label='Close modal'
              >
                <Image src='/close.png' alt='close' height={14} width={14} />
              </button>
            </div>

            <div className='px-1 pb-6'>
              <Form />
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* For Webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 8px;
        }
        ::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 8px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </>
  );
};

export default FormModal;
