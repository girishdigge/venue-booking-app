'use client';
import Image from 'next/image';
import React from 'react';

// Define the structure of an event
interface EventSchema {
  id: number;
  client_name: string; // Client Name (used for Mr/Mrs)
  date: Date; // Venue Date
  start_time?: string; // Event Start Time
  end_time?: string; // Event End Time
  email?: string; // Client Email
  contact?: string; // Client Contact Number
  address: string; // Client Address
  event_name: string; // Event Type (e.g., Wedding)
  hall?: string; // Specific Hall/Venue Area
  details: string; // Additional Details
  amount: number; // Total Amount
  advance: number; // Advance Payment
  balance: number; // Balance Due
  createdAt: Date; // Booking Date
  updatedAt: Date; // Internal timestamp, not usually displayed
}

// --- Sample Data Defined Directly in the Component File ---
const mockEvents: EventSchema[] = [
  {
    id: 101, // Example ID
    client_name: 'Priya Sharma',
    date: new Date('2025-04-18'),
    start_time: '18:00', // 6:00 PM
    end_time: '23:00', // 11:00 PM
    email: 'priya.s@example.com',
    contact: '9876543210',
    address: 'Flat 101, Harmony Bldg, Kothrud, Pune, Maharashtra 411038',
    event_name: 'Wedding Reception',
    hall: 'Jasmine Hall',
    details:
      'Approx 200 guests. Includes basic decoration, DJ, and sound system. Dinner service starts at 8:00 PM. Full vegetarian menu.',
    amount: 75000,
    advance: 25000,
    balance: 50000,
    createdAt: new Date('2025-04-15T10:30:00'), // Booking Date
    updatedAt: new Date('2025-04-15T11:00:00'),
  },
];

// --- Helper Functions ---
const formatTime12hr = (timeString: string | undefined): string => {
  if (!timeString || !timeString.includes(':')) return '-';
  try {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
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
  return amount.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

// --- Revamped Event Snapshot Component ---
// (Defined within the same file for simplicity, could be moved to its own file)
interface ElegantEventSnapshotProps {
  data: EventSchema;
  formatTime12hr: (time: string | undefined) => string;
  formatCurrency: (amount: number | undefined) => string;
}

function ElegantEventSnapshot({
  data,
  formatTime12hr,
  formatCurrency,
}: ElegantEventSnapshotProps) {
  // Basic check for data existence (already handled in parent, but good practice)
  if (!data) {
    return null; // Or some placeholder
  }

  // Prepare date/time data carefully, handling potential nulls
  const eventDate =
    data.date instanceof Date
      ? data.date.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : '-';

  const startTime = data.start_time ? formatTime12hr(data.start_time) : '-';
  const endTime = data.end_time ? formatTime12hr(data.end_time) : '-';

  // Prepare payment data carefully
  const totalAmount = data.amount != null ? formatCurrency(data.amount) : '-';
  const advancePaid = data.advance != null ? formatCurrency(data.advance) : '-';
  const balanceDue = data.balance != null ? formatCurrency(data.balance) : '-';

  const eventInfoItems = [
    { label: 'Date', value: eventDate },
    { label: 'Start Time', value: startTime },
    { label: 'End Time', value: endTime },
  ];

  return (
    // This is the self-contained snapshot card
    <div className='bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mb-6 print:shadow-none print:border-none print:rounded-none print:mb-4'>
      <div className='p-6 print:p-4'>
        <h3 className='text-xl font-semibold text-gray-800 mb-5 print:text-lg print:mb-3'>
          {' '}
          {/* Changed h2 to h3 for better hierarchy within the page */}
          Event Snapshot
        </h3>

        {/* Key Information Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6 print:mb-4 print:grid-cols-2'>
          {' '}
          {/* Added print:grid-cols-2 */}
          <div>
            <dt className='text-sm font-medium text-gray-500 print:text-xs'>
              Type
            </dt>
            <dd className='mt-1 text-base font-semibold text-gray-900 print:text-sm print:font-medium print:mt-0'>
              {data.event_name || '-'}
            </dd>
          </div>
          <div>
            <dt className='text-sm font-medium text-gray-500 print:text-xs'>
              Hall
            </dt>
            <dd className='mt-1 text-base font-semibold text-gray-900 print:text-sm print:font-medium print:mt-0'>
              {data.hall || '-'}
            </dd>
          </div>
        </div>

        {/* Date & Time Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4 mb-8 border-t border-gray-200 pt-6 print:mb-5 print:pt-4 print:border-t print:border-gray-300 print:grid-cols-3'>
          {' '}
          {/* Added print:grid-cols-3 and print border */}
          {eventInfoItems.map((item) => (
            <div key={item.label}>
              <dt className='text-sm font-medium text-gray-500 print:text-xs'>
                {item.label}
              </dt>
              <dd className='mt-1 text-base font-semibold text-gray-900 print:text-sm print:font-medium print:mt-0'>
                {item.value}
              </dd>
            </div>
          ))}
        </div>

        {/* Details Section */}
        <div className='mb-8 print:mb-5'>
          <h4 className='text-base font-semibold text-gray-700 mb-2 print:text-sm print:mb-1'>
            {' '}
            {/* Changed h3 to h4 */}
            Details & Requirements
          </h4>
          <p className='text-gray-600 text-sm leading-relaxed print:text-xs print:leading-normal'>
            {data.details || 'No additional details provided.'}
          </p>
        </div>

        {/* Payment Information - Refined Style */}
        <div className='bg-gray-50 rounded-lg p-5 border border-gray-200 print:bg-transparent print:border-t print:border-b print:border-gray-300 print:p-0 print:pt-4 print:pb-4 print:mt-4 print:rounded-none'>
          <h4 className='text-base font-semibold text-gray-700 mb-4 print:text-sm print:mb-2'>
            {' '}
            {/* Changed h3 to h4 */}
            Payment Summary
          </h4>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 print:gap-3 print:grid-cols-3'>
            {/* Total Amount */}
            <div className='bg-white rounded-md p-4 border border-gray-200 shadow-sm print:p-2 print:border-0 print:shadow-none print:bg-transparent'>
              <span className='font-medium text-gray-500 text-xs block mb-1 print:text-2xs print:mb-0'>
                Total Amount
              </span>
              <span className='text-lg font-bold text-blue-700 print:text-base print:font-semibold print:text-black'>
                {' '}
                {/* Adjusted print text color */}
                {totalAmount}
              </span>
            </div>

            {/* Advance Paid */}
            <div className='bg-white rounded-md p-4 border border-gray-200 shadow-sm print:p-2 print:border-0 print:shadow-none print:bg-transparent'>
              <span className='font-medium text-gray-500 text-xs block mb-1 print:text-2xs print:mb-0'>
                Advance Paid
              </span>
              <span className='text-lg font-bold text-green-600 print:text-base print:font-semibold print:text-black'>
                {' '}
                {/* Adjusted print text color */}
                {advancePaid}
              </span>
            </div>

            {/* Balance Due */}
            <div className='bg-white rounded-md p-4 border border-gray-200 shadow-sm print:p-2 print:border-0 print:shadow-none print:bg-transparent'>
              <span className='font-medium text-gray-500 text-xs block mb-1 print:text-2xs print:mb-0'>
                Balance Due
              </span>
              <span className='text-lg font-bold text-orange-600 print:text-base print:font-semibold print:text-black'>
                {' '}
                {/* Adjusted print text color */}
                {balanceDue}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Component Definition ---
const EventView = () => {
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

  // --- Event Handlers ---
  const handlePrint = () => {
    window.print();
  };

  const handleEdit = () => {
    console.log(`Edit button clicked for event ID: ${data.id}`);
    alert(`Edit functionality for Event ID ${data.id} is not implemented yet.`);
  };

  return (
    // Main container for the component view
    <div className='w-full max-w-4xl mx-auto p-4 md:p-6 space-y-6 print:p-0 print:m-0'>
      {' '}
      {/* Added max-w-4xl for better readability on wide screens */}
      {/* --- Printable Receipt Area --- */}
      <div
        id='receipt-content'
        className='relative overflow-hidden bg-white shadow-xl rounded-lg border border-gray-200 p-6 md:p-8 space-y-6 text-gray-800 font-sans print:shadow-none print:border-none print:p-0 print:m-0 print:space-y-3'
      >
        {/* --- Watermark (Centered) --- */}
        <div
          aria-hidden='true'
          className='absolute inset-0 flex items-center justify-center z-0 pointer-events-none print:flex' // z-0 to be behind content
          // Keep original watermark styles
          style={{
            fontSize: 'clamp(6rem, 20vw, 12rem)', // Larger font for more impact
            color: 'rgba(184, 134, 11, 0.04)', // Gold-toned with subtle opacity
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          <Image
            src='/logo.png' // Ensure this path is correct
            alt='logo watermark'
            height={300}
            width={300}
            className='opacity-10 print:opacity-10'
          />
        </div>
        {/* --- Receipt Content Wrapper (Above Watermark) --- */}
        <div className='relative z-10 space-y-6 print:space-y-3'>
          {' '}
          {/* Use z-10 to be above watermark */}
          {/* Enhanced Header with Gold Gradient, Emblem and GST */}
          <div className='bg-gradient-to-r from-yellow-900 via-yellow-700 to-yellow-600 text-yellow-50 p-6 rounded-lg shadow-lg print:bg-gradient-to-r print:from-yellow-900 print:via-yellow-700 print:to-yellow-600 print:shadow-none print:text-yellow-50 print:rounded-none print:p-4'>
            {' '}
            {/* Adjusted print padding/rounding */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='w-16 h-16 flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 rounded-full shadow-inner mr-4 print:w-12 print:h-12 print:mr-3'>
                  <Image
                    src='/logo.png'
                    alt='logo'
                    height={40}
                    width={40}
                    className='print:w-8 print:h-8'
                  />{' '}
                  {/* Adjusted size */}
                </div>
                <div>
                  <h1 className='text-3xl font-bold text-yellow-50 print:text-2xl'>
                    KOHINOOR
                  </h1>
                  <p className='text-yellow-200 text-sm mt-1 print:text-xs'>
                    Mangal Karyalay & Open Lawn
                  </p>
                  <p className='text-yellow-100 text-xs mt-1 font-semibold print:text-2xs'>
                    {' '}
                    {/* Adjusted print size */}
                    GST No: 27AALFK2963D1ZQ
                  </p>
                </div>
              </div>
              <div className='text-right text-sm text-yellow-100 print:text-xs print:text-yellow-100'>
                <p className='font-semibold'>Ph: 7588203811</p>
                <p>Bastegav Road, Akkalkot Dist.</p>
                <p>Solapur, Maharashtra 413216</p>
              </div>
            </div>
          </div>
          {/* Enhanced Receipt Title with Ornamental Design */}
          <div className='text-center my-8 print:my-4'>
            <div className='flex items-center justify-center'>
              <div className='flex-grow h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent max-w-xs print:via-yellow-600'></div>
              <svg
                className='h-8 w-8 mx-2 text-yellow-700 print:h-6 print:w-6'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
              >
                <path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' />
              </svg>
              <h2 className='text-2xl font-semibold mx-3 text-yellow-800 print:text-xl'>
                Venue Booking Confirmation
              </h2>
              <svg
                className='h-8 w-8 mx-2 text-yellow-700 print:h-6 print:w-6'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
              >
                <path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' />
              </svg>
              <div className='flex-grow h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent max-w-xs print:via-yellow-600'></div>
            </div>
            <p className='text-gray-500 text-sm mt-2 italic print:text-xs'>
              Official Receipt #{data.id}-{data.date.getFullYear()}
            </p>
          </div>
          {/* --- NEW: Render the Elegant Event Snapshot Component --- */}
          <ElegantEventSnapshot
            data={data}
            formatTime12hr={formatTime12hr}
            formatCurrency={formatCurrency}
          />
          {/* Client Information Section - Kept Styling */}
          <div className='bg-gradient-to-br from-yellow-50 to-white rounded-lg p-5 border border-yellow-200 shadow-sm space-y-4 print:bg-white print:border print:border-gray-300 print:p-4 print:space-y-2 print:shadow-none'>
            {' '}
            {/* Simplified print background/border */}
            <div className='flex items-center border-b border-yellow-200 pb-2 print:pb-1 print:border-b print:border-gray-300'>
              <svg
                className='h-5 w-5 mr-2 text-yellow-700 print:h-4 print:w-4 print:text-black'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
                <circle cx='12' cy='7' r='4' />
              </svg>
              <h3 className='text-lg font-semibold text-yellow-900 print:text-base print:text-black'>
                Client Information
              </h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 print:gap-4 print:grid-cols-2'>
              <div className='space-y-3 print:space-y-1'>
                <div>
                  <span className='font-medium text-gray-500 text-xs block print:text-xs'>
                    Client Name
                  </span>
                  <span className='text-base font-medium print:text-sm'>
                    {data.client_name || '-'}
                  </span>
                </div>
                <div>
                  <span className='font-medium text-gray-500 text-xs block print:text-xs'>
                    Contact Number
                  </span>
                  <span className='print:text-sm'>{data.contact || '-'}</span>
                </div>
                <div>
                  <span className='font-medium text-gray-500 text-xs block print:text-xs'>
                    Email Address
                  </span>
                  <span className='print:text-sm'>{data.email || '-'}</span>
                </div>
              </div>
              <div className='space-y-3 print:space-y-1'>
                <div>
                  <span className='font-medium text-gray-500 text-xs block print:text-xs'>
                    Address
                  </span>
                  <span className='text-sm print:text-xs'>
                    {data.address || '-'}
                  </span>
                </div>
                <div>
                  <span className='font-medium text-gray-500 text-xs block print:text-xs'>
                    Booking Date
                  </span>
                  <span className='print:text-sm'>
                    {data.createdAt.toLocaleDateString('en-IN', {
                      day: 'numeric',
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Terms & Conditions with Improved Styling */}
          <div className='bg-gray-50 rounded-lg p-4 border border-gray-200 print:bg-transparent print:border print:border-gray-300 print:p-3 print:mt-4'>
            <h4 className='text-sm font-semibold text-gray-700 mb-2 flex items-center print:mb-1 print:text-xs print:text-black'>
              <svg
                className='h-4 w-4 mr-1 text-gray-600 print:text-black'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
                <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' />
              </svg>
              Terms & Conditions
            </h4>
            <ul className='text-xs text-gray-600 space-y-1 pl-5 list-disc print:text-2xs print:space-y-0.5 print:pl-4'>
              {' '}
              {/* Adjusted print text size */}
              <li>Full payment must be made 24 hours before the event.</li>
              <li>
                Cancellation charges: 25% if cancelled 7 days before, 50% if
                cancelled within 7 days.
              </li>
              <li>Additional time will be charged at standard hourly rates.</li>
              <li>Timing to be strictly followed as mentioned above.</li>
              <li>
                Any damage to venue property will be charged extra as assessed.
              </li>
            </ul>
          </div>
          {/* Footer with Signature and Receipt Information */}
          <div className='flex flex-col md:flex-row justify-between items-end border-t border-gray-200 pt-4 print:pt-3 print:border-t print:border-gray-300 print:flex-row'>
            {' '}
            {/* Ensure flex-row for print */}
            <div className='flex flex-col items-start mb-4 md:mb-0 print:mb-0'>
              <div className='text-xs text-gray-500 print:text-2xs'>
                <p className='font-medium text-gray-600 print:text-black'>
                  Receipt #KH-{data.id}-{data.date.getFullYear()}
                </p>
                <p>
                  Generated:{' '}
                  {new Date().toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit', // Added time
                  })}
                </p>
              </div>

              {/* QR Code Placeholder */}
              <div className='mt-2 bg-gray-200 h-16 w-16 flex items-center justify-center rounded print:h-12 print:w-12 print:bg-gray-100'>
                <span className='text-xs text-gray-500 text-center print:text-2xs'>
                  QR Code
                </span>
              </div>
            </div>
            <div className='text-right'>
              <div className='border-t-2 border-black px-16 py-1 mb-1 print:border-t print:border-gray-400 print:px-12 print:pt-0 print:pb-1'>
                {' '}
                {/* Adjusted print border */}
                <span className='block h-6 print:h-4'></span>{' '}
                {/* Space for signature */}
              </div>
              <span className='font-medium text-gray-600 text-sm print:text-xs print:text-black'>
                Authorized Signature with Stamp
              </span>
            </div>
          </div>
        </div>{' '}
        {/* End of z-10 content wrapper */}
      </div>{' '}
      {/* --- End of receipt-content --- */}
      {/* --- Action Buttons (Edit and Print) --- */}
      <div className='flex justify-center items-center space-x-4 mt-6 print:hidden'>
        {' '}
        {/* Added print:hidden */}
        {/* Edit Button */}
        <button
          onClick={handleEdit}
          className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out flex items-center'
          aria-label={`Edit event ${data.id}`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 mr-2'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
            />
          </svg>
          Edit Details
        </button>
        {/* Print Button */}
        <button
          onClick={handlePrint}
          className='bg-yellow-700 hover:bg-yellow-800 text-white font-medium py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out flex items-center'
          aria-label='Print receipt'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 mr-2'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
            />
          </svg>
          Print Receipt
        </button>
      </div>
      {/* --- Global Print Styles --- */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait; /* Set to standard A4 paper size */
            margin: 1cm; /* Standard margin for printer safety */
          }

          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
            background-color: #fff !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 100% !important;
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
            height: auto; /* Allow content to flow */
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            font-size: 9.5pt !important; /* Slightly smaller base font for print */
            line-height: 1.3 !important;
            color: #000 !important;
            background-color: #fff !important;
            overflow: visible !important; /* Show all content */
          }

          /* Ensure watermark is behind content and centered */
          #receipt-content > div[aria-hidden='true'] {
            display: flex !important;
            opacity: 0.04 !important; /* Make sure it's subtle */
            position: fixed !important; /* Use fixed to center relative to page */
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            z-index: 0 !important; /* Ensure it's behind */
            max-width: 80%; /* Prevent excessive size */
            max-height: 80%;
          }
          #receipt-content > div[aria-hidden='true'] img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }

          /* Ensure color backgrounds print properly */
          .bg-gradient-to-r,
          .bg-gradient-to-br,
          .bg-yellow-50,
          .bg-gray-50,
          .bg-yellow-100 {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Ensure content stays above watermark */
          #receipt-content > div.relative.z-10 {
            /* Changed z-20 to z-10 */
            position: relative !important;
            z-index: 10 !important; /* Needs to be higher than watermark's z-0 */
            padding: 0 !important; /* Remove extra padding for print */
          }

          /* Hide elements marked with print:hidden */
          .print\\:hidden {
            display: none !important;
          }

          /* Optimize page breaks */
          div,
          section {
            /* Apply broadly but carefully */
            page-break-inside: avoid;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            page-break-after: avoid;
            page-break-inside: avoid;
          }
          ul,
          ol {
            page-break-inside: avoid;
          }

          /* Ensure borders specified for print appear */
          .print\\:border {
            border-width: 1px;
          }
          .print\\:border-t {
            border-top-width: 1px;
          }
          .print\\:border-b {
            border-bottom-width: 1px;
          }
          .print\\:border-gray-300 {
            border-color: #d1d5db;
          } /* Example gray */

          /* Force black text where needed for clarity */
          .print\\:text-black {
            color: #000 !important;
          }

          /* Reduce margins/padding for print */
          .print\\:mb-1 {
            margin-bottom: 0.25rem;
          }
          .print\\:mb-2 {
            margin-bottom: 0.5rem;
          }
          .print\\:mb-3 {
            margin-bottom: 0.75rem;
          }
          .print\\:mb-4 {
            margin-bottom: 1rem;
          }
          .print\\:mt-0 {
            margin-top: 0;
          }
          .print\\:p-0 {
            padding: 0;
          }
          .print\\:p-2 {
            padding: 0.5rem;
          }
          .print\\:p-3 {
            padding: 0.75rem;
          }
          .print\\:p-4 {
            padding: 1rem;
          }
          .print\\:pt-4 {
            padding-top: 1rem;
          }
          .print\\:pb-4 {
            padding-bottom: 1rem;
          }

          /* Specific print font sizes */
          .print\\:text-2xs {
            font-size: 0.65rem;
            line-height: 0.9rem;
          } /* ~8pt */
          .print\\:text-xs {
            font-size: 0.75rem;
            line-height: 1rem;
          } /* ~9pt */
          .print\\:text-sm {
            font-size: 0.875rem;
            line-height: 1.25rem;
          } /* ~10.5pt */
          .print\\:text-base {
            font-size: 1rem;
            line-height: 1.5rem;
          } /* ~12pt */
          .print\\:text-lg {
            font-size: 1.125rem;
            line-height: 1.75rem;
          } /* ~13.5pt */
          .print\\:text-xl {
            font-size: 1.25rem;
            line-height: 1.75rem;
          } /* ~15pt */
          .print\\:text-2xl {
            font-size: 1.5rem;
            line-height: 2rem;
          } /* ~18pt */
        }
      `}</style>
    </div> // --- End of main component container ---
  );
};

export default EventView;
