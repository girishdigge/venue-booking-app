// 'use client';

// import { EventSchema } from '@/schema/schema';

// const mockEvents: EventSchema[] = [
//   {
//     id: 1,
//     name: "John's Wedding",
//     date: '2025-05-20',
//     startTime: '14:30',
//     endTime: '20:00',
//     email: 'john@example.com',
//     contact: '123-456-7890',
//     address: '123 Wedding Street, Cityville, Country',
//     event: 'Wedding',
//     hall: 'Grand Ballroom',
//     details: 'Reception will follow the ceremony in the Grand Ballroom.',
//     amount: 10000,
//     advance: 2000,
//     balance: 8000,
//     createdAt: new Date('2025-04-15'),
//     updatedAt: new Date('2025-04-15'),
//   },
// ];

// // interface EventViewProps {
// //   data: EventSchema;
// // }

// // const EventView = ({ data }: EventViewProps) => {
// const EventView = () => {
//   const data = mockEvents[0];
//   return (
//     <div className='w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8 space-y-8'>
//       {/* Header */}
//       <div className='border-b pb-4'>
//         <h1 className='text-3xl font-bold text-gray-800'>{data.name}</h1>
//         <p className='text-sm text-gray-500 mt-2'>Event Details</p>
//       </div>

//       {/* Basic Information */}
//       <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
//         <div>
//           <h2 className='text-xl font-semibold text-gray-700'>Event Type</h2>
//           <p className='text-gray-800'>{data.event}</p>
//         </div>
//         <div>
//           <h2 className='text-xl font-semibold text-gray-700'>Date</h2>
//           <p className='text-gray-800'>
//             {new Date(data.date).toLocaleDateString(undefined, {
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric',
//             })}
//           </p>
//         </div>
//         <div>
//           <h2 className='text-xl font-semibold text-gray-700'>Hall</h2>
//           <p className='text-gray-800'>{data.hall}</p>
//         </div>
//         <div>
//           <h2 className='text-xl font-semibold text-gray-700'>Address</h2>
//           <p className='text-gray-800'>{data.address || '-'}</p>
//         </div>
//       </div>

//       {/* Time Information */}
//       <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
//         <div>
//           <h2 className='text-xl font-semibold text-gray-700'>Start Time</h2>
//           <p className='text-gray-800'>{data.startTime || '-'}</p>
//         </div>
//         <div>
//           <h2 className='text-xl font-semibold text-gray-700'>End Time</h2>
//           <p className='text-gray-800'>{data.endTime || '-'}</p>
//         </div>
//       </div>

//       {/* Contact Information */}
//       <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
//         <div>
//           <h2 className='text-xl font-semibold text-gray-700'>Email</h2>
//           <p className='text-gray-800'>{data.email || '-'}</p>
//         </div>
//         <div>
//           <h2 className='text-xl font-semibold text-gray-700'>
//             Contact Number
//           </h2>
//           <p className='text-gray-800'>{data.contact || '-'}</p>
//         </div>
//       </div>

//       {/* Financial Information */}
//       <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
//         <div>
//           <h2 className='text-xl font-semibold text-gray-700'>Total Amount</h2>
//           <p className='text-gray-800'>{data.amount}</p>
//         </div>
//         <div>
//           <h2 className='text-xl font-semibold text-gray-700'>
//             Advance Payment
//           </h2>
//           <p className='text-gray-800'>{data.advance}</p>
//         </div>
//         <div>
//           <h2 className='text-xl font-semibold text-gray-700'>Balance</h2>
//           <p className='text-gray-800'>{data.balance}</p>
//         </div>
//       </div>

//       {/* Additional Details */}
//       {data.details && (
//         <div className='space-y-2'>
//           <h2 className='text-xl font-semibold text-gray-700'>
//             Additional Details
//           </h2>
//           <p className='text-gray-800'>{data.details}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventView;

// src/components/EventView.tsx (Example file path)

'use client';

import React from 'react';
// import { useRouter } from 'next/navigation'; // Uncomment if using Next.js App Router for navigation

// Define the structure of an event
interface EventSchema {
  id: number;
  name: string; // Client Name (used for Mr/Mrs)
  date: string; // Venue Date
  startTime?: string; // Event Start Time
  endTime?: string; // Event End Time
  email?: string; // Client Email
  contact?: string; // Client Contact Number
  address: string; // Client Address
  event: string; // Event Type (e.g., Wedding)
  hall?: string; // Specific Hall/Venue Area
  details: string; // Additional Details
  amount: number; // Total Amount
  advance: number; // Advance Payment
  balance: number; // Balance Due
  createdAt: Date; // Booking Date
  updatedAt: Date; // Internal timestamp, not usually displayed
}

// --- Sample Data Defined Directly in the Component File ---
// Replace this with data fetching or props in a real application
const mockEvents: EventSchema[] = [
  {
    id: 101, // Example ID
    name: 'Priya Sharma',
    date: '2025-07-22',
    startTime: '18:00', // 6:00 PM
    endTime: '23:00', // 11:00 PM
    email: 'priya.s@example.com',
    contact: '9876543210',
    address: 'Flat 101, Harmony Bldg, Kothrud, Pune, Maharashtra 411038',
    event: 'Wedding Reception',
    hall: 'Jasmine Hall',
    details:
      'Approx 200 guests. Includes basic decoration, DJ, and sound system. Dinner service starts at 8:00 PM. Full vegetarian menu.',
    amount: 75000,
    advance: 25000,
    balance: 50000,
    createdAt: new Date('2025-04-15T10:30:00'), // Booking Date (using current date for example)
    updatedAt: new Date('2025-04-15T11:00:00'),
  },
];
// -----------------------------------------------------------

// --- Helper Functions ---
const formatDate = (dateInput: string | Date | undefined): string => {
  if (!dateInput) return '-';
  try {
    const date =
      typeof dateInput === 'string'
        ? new Date(dateInput + 'T00:00:00Z')
        : dateInput;
    // Using IST for display as per location context
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Kolkata',
    });
  } catch (e) {
    console.error('Error formatting date:', dateInput, e);
    return String(dateInput);
  }
};

const formatTime12hr = (timeString: string | undefined): string => {
  if (!timeString || !timeString.includes(':')) return '-';
  try {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    // Using US locale standard for AM/PM format, time itself is local based on Date object creation
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch (e) {
    console.error('Error formatting time:', timeString, e);
    return timeString;
  }
};

const formatCurrency = (amount: number | undefined): string => {
  if (amount === undefined || amount === null) return '-';
  // Using INR currency as per location context
  return amount.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};
// -----------------------------------------------------------

// --- Main Component Definition ---
const EventView = () => {
  // const router = useRouter(); // Uncomment if using Next.js App Router

  // Use the first mock event. In a real app, this would come from props or state.
  const data = mockEvents[0];

  // Basic safety check
  if (!data) {
    return (
      <div className='text-center text-red-500 p-10'>
        Error: Event data not found.
      </div>
    );
  }

  const watermarkText = 'KOHINOOR'; // Watermark text

  // --- Event Handlers ---
  const handlePrint = () => {
    window.print();
  };

  const handleEdit = () => {
    console.log(`Edit button clicked for event ID: ${data.id}`);
    <FormModal table='booking' type='create' />;
    // Placeholder action: Show an alert or navigate
    alert(`Edit functionality for Event ID ${data.id} is not implemented yet.`);
    // Example navigation (if using Next.js App Router):
    // router.push(`/dashboard/events/${data.id}/edit`);
  };
  // --------------------

  return (
    // Main container for the component view
    <div className='w-full max-w-3xl mx-auto p-4 md:p-6 space-y-4 print:space-y-0'>
      {/* --- Printable Receipt Area --- */}
      <div
        id='receipt-content'
        className='relative overflow-hidden bg-white shadow-xl rounded-lg border border-gray-200 p-5 md:p-6 space-y-3 text-gray-800 font-sans text-sm print:shadow-none print:border-none print:p-0 print:m-0 print:space-y-1.5'
      >
        {/* --- Watermark Pseudo-element --- */}
        <div
          aria-hidden='true'
          className='absolute inset-0 flex items-center justify-center z-0 pointer-events-none print:flex'
          style={{
            fontSize: 'clamp(4rem, 15vw, 8rem)', // Responsive font size
            color: 'rgba(139, 69, 19, 0.07)',
            fontWeight: 'bold',
            transform: 'rotate(-30deg)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            userSelect: 'none',
          }}
        >
          {watermarkText}
        </div>
        {/* --- Receipt Content Wrapper (Above Watermark) --- */}
        <div className='relative z-10 space-y-3 print:space-y-1.5 print:p-3 md:print:p-4'>
          {/* Venue Header */}
          <div className='flex justify-between items-start bg-yellow-900 text-yellow-100 p-4 rounded-t-lg print:bg-transparent print:text-black print:p-1 print:rounded-none'>
            <div className='w-1/3'>
              <h1 className='text-2xl font-bold text-yellow-50 print:text-xl print:text-black'>
                KOHINOOR
              </h1>
            </div>
            <div className='text-right text-xs text-yellow-200 print:text-black'>
              <p className='font-semibold'>Ph: 7588203811</p>
              <p>Bastegav Road, Akkalkot Dist.</p>
              <p>Solapur, Maharashtra 413216</p>
              <p>Mangal Karyalay & Open Lawn</p>
            </div>
          </div>

          {/* Receipt Title */}
          <h2 className='text-xl font-semibold text-center my-3 text-yellow-800 border-b border-yellow-700 pb-2 print:text-lg print:my-1 print:pb-1 print:border-gray-400'>
            Venue Rent Receipt
          </h2>

          {/* Client Information Section */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 print:gap-x-4 print:gap-y-0.5'>
            <div>
              <span className='font-semibold text-gray-600 block print:inline'>
                Client Name:{' '}
              </span>
              <span className='text-base print:text-sm'>
                {data.name || '-'}
              </span>
            </div>
            <div>
              <span className='font-semibold text-gray-600 block print:inline'>
                Contact:{' '}
              </span>
              <span>{data.contact || '-'}</span>
            </div>
            <div className='md:col-span-2'>
              <span className='font-semibold text-gray-600 block print:inline'>
                Address:{' '}
              </span>
              <span className='print:text-xs'>{data.address || '-'}</span>
            </div>
            <div>
              <span className='font-semibold text-gray-600 block print:inline'>
                Email:{' '}
              </span>
              <span>{data.email || '-'}</span>
            </div>
            <div>
              <span className='font-semibold text-gray-600 block print:inline'>
                Booking Date:{' '}
              </span>
              <span>{formatDate(data.createdAt)}</span>
            </div>
          </div>

          <hr className='my-2 border-gray-200 print:my-1' />

          {/* Event Details Section */}
          <h3 className='text-lg font-semibold text-yellow-800 mt-2 mb-1 print:text-base print:mt-1 print:mb-0.5'>
            Event Details
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1.5 print:gap-x-4 print:gap-y-0.5'>
            <div>
              <span className='font-semibold text-gray-600 block print:inline'>
                Event Type:{' '}
              </span>
              <span>{data.event || '-'}</span>
            </div>
            <div>
              <span className='font-semibold text-gray-600 block print:inline'>
                Venue/Hall:{' '}
              </span>
              <span>{data.hall || '-'}</span>
            </div>
            <div>
              <span className='font-semibold text-gray-600 block print:inline'>
                Venue Date:{' '}
              </span>
              <span>{formatDate(data.date)}</span>
            </div>
            <div>
              <span className='font-semibold text-gray-600 block print:inline'>
                Start Time:{' '}
              </span>
              <span>{formatTime12hr(data.startTime)}</span>
            </div>
            <div>
              <span className='font-semibold text-gray-600 block print:inline'>
                End Time:{' '}
              </span>
              <span>{formatTime12hr(data.endTime)}</span>
            </div>
          </div>

          {/* Additional Details */}
          {data.details && (
            <div className='mt-2 print:mt-1'>
              <span className='font-semibold text-gray-600 block mb-0.5 print:inline'>
                Details:{' '}
              </span>
              <p className='text-xs bg-yellow-50 p-2 rounded border border-yellow-200 print:text-xs print:p-1 print:bg-transparent print:border-none'>
                {data.details}
              </p>
            </div>
          )}

          <hr className='my-2 border-gray-200 print:my-1' />

          {/* Financial Summary Section */}
          <h3 className='text-lg font-semibold text-yellow-800 mt-2 mb-1 print:text-base print:mt-1 print:mb-0.5'>
            Payment Details
          </h3>
          <div className='space-y-1 max-w-xs ml-auto print:space-y-0'>
            <div className='flex justify-between items-baseline'>
              <span className='font-semibold text-gray-600'>Total Amount:</span>
              <span className='w-28 text-right font-medium'>
                {formatCurrency(data.amount)}
              </span>
            </div>
            <div className='flex justify-between items-baseline'>
              <span className='font-semibold text-gray-600'>Advance Paid:</span>
              <span className='w-28 text-right text-green-600 font-medium'>
                {formatCurrency(data.advance)}
              </span>
            </div>
            <div className='flex justify-between items-baseline border-t pt-1 mt-1 border-gray-300 print:pt-0.5 print:mt-0.5'>
              <span className='font-bold text-gray-700'>Balance Due:</span>
              <span className='w-28 text-right font-bold text-red-600'>
                {formatCurrency(data.balance)}
              </span>
            </div>
          </div>

          {/* Signature Area */}
          <div className='pt-10 pb-2 text-right print:pt-4 print:pb-0'>
            <span className='border-t-2 border-black px-16 py-1 font-semibold text-gray-600 print:border-t print:px-10 print:text-xs'>
              Signature with stamp
            </span>
          </div>
        </div>{' '}
        {/* End of z-10 content wrapper */}
      </div>{' '}
      {/* --- End of receipt-content --- */}
      {/* --- Action Buttons (Edit and Print) --- */}
      <div className='flex justify-center items-center space-x-4 mt-4 no-print'>
        {/* Edit Button */}
        <button
          onClick={handleEdit}
          className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out'
          aria-label={`Edit event ${data.id}`}
        >
          Edit
        </button>
        {/* Print Button */}
        <button
          onClick={handlePrint}
          className='bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out'
          aria-label='Print receipt'
        >
          Print Receipt
        </button>
      </div>
      {/* --- Global Print Styles --- */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4; /* Common paper size */
            margin: 0 !important; /* Remove browser default margins */
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background-color: #fff !important;
            margin: 0 !important;
          }
          /* Hide all elements by default */
          body * {
            visibility: hidden;
          }
          /* Make the receipt container and its children visible */
          #receipt-content,
          #receipt-content * {
            visibility: visible;
          }
          /* Style the main receipt container for printing */
          #receipt-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            font-size: 9pt !important;
            line-height: 1.3 !important;
            color: #000 !important;
            background-color: #fff !important;
            overflow: hidden; /* Hide overflows */
          }
          /* Add internal padding to the content wrapper */
          #receipt-content > div.relative.z-10 {
            padding: 0.2in !important; /* Adjust as needed */
            height: 100%;
            box-sizing: border-box;
          }
          /* Ensure watermark prints correctly */
          #receipt-content > div[aria-hidden='true'] {
            display: flex !important;
            opacity: 0.07 !important;
            color: rgba(100, 100, 100, 0.07) !important;
          }
          /* Ensure content stays above watermark */
          #receipt-content > div.relative.z-10 {
            position: relative !important;
            z-index: 10 !important;
          }
          /* Printing adjustments for spacing and breaks */
          #receipt-content hr {
            margin: 0.2rem 0 !important;
            border-color: #ccc !important;
          }
          #receipt-content h2,
          #receipt-content h3 {
            margin: 0.25rem 0 0.1rem 0 !important;
            padding: 0 !important;
            page-break-after: avoid;
          }
          #receipt-content .grid {
            page-break-inside: avoid;
          }
          /* Hide elements marked with .no-print */
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div> // --- End of main component container ---
  );
};

export default EventView; // Export the component
