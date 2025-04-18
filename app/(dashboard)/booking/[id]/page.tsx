'use client';
import { EventSchema } from '@/schema/schema';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

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

// --- Improved Event Snapshot Component ---
interface ModernEventSnapshotProps {
  data: EventSchema;
  formatTime12hr: (time: string | undefined) => string;
  formatCurrency: (amount: number | undefined) => string;
}

function ModernEventSnapshot({
  data,
  formatTime12hr,
  formatCurrency,
}: ModernEventSnapshotProps) {
  if (!data) return null;

  // Format date and time
  const eventDate = new Date(data.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const weekday = new Date(data.date).toLocaleDateString('en-IN', {
    weekday: 'long',
  });

  const startTime = data.start_time ? formatTime12hr(data.start_time) : '-';
  const endTime = data.end_time ? formatTime12hr(data.end_time) : '-';

  // Format payment data
  const totalAmount = formatCurrency(data.amount);
  const advancePaid = formatCurrency(data.advance);
  const balanceDue = formatCurrency(data.balance);

  // Calculate percentage paid
  const percentPaid = Math.round((data.advance / data.amount) * 100);

  return (
    <div className='bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mb-8 print:shadow-none print:border print:border-gray-300 print:rounded-none print:mb-4'>
      {/* Event Type Banner - Improved with more elegant gradient */}
      <div className='bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 px-6 py-5'>
        <div className='flex justify-between items-center'>
          <div>
            <h3 className='text-xl font-bold text-white print:text-lg'>
              {data.event_name || 'Event'}
            </h3>
          </div>
          <div className='flex items-center justify-center gap-2 border-2 border-amber-900 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold tracking-widest px-4 py-2 rounded-lg text-md shadow-md backdrop-blur-sm'>
            <span className='flex items-center justify-center rounded-full w-2 h-2'>
              <span className='border-2 border-amber-900 bg-amber-900 rounded-full w-2 h-2'></span>
            </span>
            {data.hall || 'Main Hall'}
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className='p-6 print:p-4'>
        {/* Date & Time - Redesigned with better visual elements */}
        <div className='flex flex-wrap md:flex-nowrap print:flex-nowrap gap-4 mb-6 '>
          <div className='w-full md:w-1/3 print:w-3/5 bg-indigo-50 rounded-xl p-4 flex items-center hover:shadow-md transition-all duration-300'>
            <div className='h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 '>
              <svg
                className='h-6 w-6 text-indigo-600 '
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
            </div>
            <div>
              <p className='text-md font-medium text-indigo-600 mb-1 '>Date</p>
              <p className='font-bold text-gray-900 text-lg'>{eventDate}</p>
              <p className='text-gray-800 text-sm  font-semibold tracking-wider'>
                {weekday}
              </p>
            </div>
          </div>

          <div className='w-full md:w-2/3 flex gap-4'>
            <div className='flex-1 bg-purple-50 rounded-xl p-4 flex items-center hover:shadow-md transition-all duration-300 print:bg-purple-50 print:p-3'>
              <div className='h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 print:h-10 print:w-10'>
                <svg
                  className='h-6 w-6 text-purple-600 print:h-5 print:w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div>
                <p className='text-xs font-medium text-purple-600 mb-1 print:text-xs'>
                  Start Time
                </p>
                <p className='font-semibold text-gray-800 print:text-sm'>
                  {startTime}
                </p>
              </div>
            </div>

            <div className='flex-1 bg-pink-50 rounded-xl p-4 flex items-center hover:shadow-md transition-all duration-300 print:bg-pink-50 print:p-3'>
              <div className='h-12 w-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4 print:h-10 print:w-10'>
                <svg
                  className='h-6 w-6 text-pink-600 print:h-5 print:w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
                  />
                </svg>
              </div>
              <div>
                <p className='text-xs font-medium text-pink-600 mb-1 print:text-xs'>
                  End Time
                </p>
                <p className='font-semibold text-gray-800 print:text-sm'>
                  {endTime}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section - Improved with more visual interest */}
        <div className='mb-8 print:mb-4'>
          <h4 className='text-base font-semibold text-gray-700 mb-3 flex items-center print:text-sm print:mb-2'>
            <svg
              className='h-5 w-5 mr-2 text-indigo-600 print:h-4 print:w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              />
            </svg>
            Event Details
          </h4>
          <div className='bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 print:bg-gray-50 print:border print:border-gray-200 print:p-3'>
            <p className='text-gray-700 text-sm leading-relaxed print:text-xs print:leading-normal'>
              {data.details || 'No additional details provided.'}
            </p>
          </div>
        </div>

        {/* Payment Summary - Enhanced with interactive elements */}
      </div>
      <div className='bg-white w-full rounded-xl border border-gray-100 shadow-lg overflow-hidden print:border print:border-gray-300 print:shadow-none'>
        <div className='bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-5 py-4 text-white print:bg-gradient-to-r print:from-emerald-600 print:to-teal-600'>
          <h4 className='text-base font-bold flex items-center print:text-sm'>
            <svg
              className='h-5 w-5 mr-2 print:h-4 print:w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z'
              />
            </svg>
            Payment Summary
          </h4>
        </div>

        <div className='p-6 print:p-3'>
          {/* Progress Bar - Enhanced with animation */}
          <div className='mb-6 print:mb-3'>
            <div className='flex justify-between items-center mb-2 print:mb-0.5'>
              <span className='text-xs font-medium text-gray-600 print:text-2xs'>
                Payment Progress
              </span>
              <span className='text-sm font-semibold text-emerald-600 print:text-2xs'>
                {percentPaid}% Paid
              </span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-3 print:h-2 overflow-hidden'>
              <div
                className='bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 h-3 rounded-full transition-all duration-700 ease-out print:bg-gradient-to-r print:from-emerald-500 print:to-teal-500 print:h-2'
                style={{ width: `${percentPaid}%` }}
              ></div>
            </div>
          </div>

          {/* Payment Details - Enhanced with hover effects */}
          <div className='grid grid-cols-3 gap-4 print:gap-3'>
            <div className='bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-100 transition-all duration-300 hover:shadow-md print:p-3 print:border print:border-gray-200'>
              <p className='text-xs font-medium text-gray-500 mb-1 print:text-2xs print:mb-0.5'>
                Total Amount
              </p>
              <p className='text-xl font-bold text-gray-800 print:text-base'>
                {totalAmount}
              </p>
            </div>

            <div className='bg-gradient-to-br from-emerald-50 to-white rounded-xl p-5 border border-emerald-100 transition-all duration-300 hover:shadow-md print:p-3 print:border print:border-gray-200'>
              <p className='text-xs font-medium text-emerald-600 mb-1 print:text-2xs print:mb-0.5'>
                Advance Paid
              </p>
              <p className='text-xl font-bold text-emerald-600 print:text-base'>
                {advancePaid}
              </p>
            </div>

            <div className='bg-gradient-to-br from-amber-50 to-white rounded-xl p-5 border border-amber-100 transition-all duration-300 hover:shadow-md print:p-3 print:border print:border-gray-200'>
              <p className='text-xs font-medium text-amber-600 mb-1 print:text-2xs print:mb-0.5'>
                Balance Due
              </p>
              <p className='text-xl font-bold text-amber-600 print:text-base'>
                {balanceDue}
              </p>
              <p className='text-xs text-amber-500 mt-1'>Due before event</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Component Definition ---
const EventView = () => {
  const [data, setData] = useState<EventSchema>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/event/id`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch event data');
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching event:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-96'>
        <div className='animate-pulse flex flex-col items-center'>
          <div className='h-16 w-16 bg-amber-200 rounded-full mb-4'></div>
          <div className='h-4 w-48 bg-gray-200 rounded mb-2'></div>
          <div className='h-3 w-36 bg-gray-200 rounded'></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className='text-center p-10 bg-red-50 rounded-xl border border-red-100 shadow-md'>
        <svg
          className='h-12 w-12 text-red-500 mx-auto mb-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
          />
        </svg>
        <h3 className='text-xl font-bold text-red-700 mb-2'>
          Event Data Not Found
        </h3>
        <p className='text-red-600 mb-4'>
          {error || 'Unable to load event information.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className='bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg shadow transition duration-150'
        >
          Try Again
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleEdit = () => {
    console.log(`Edit button clicked for event ID: ${data.id}`);
    alert(`Edit functionality for Event ID ${data.id} is not implemented yet.`);
  };

  return (
    <div className='w-full max-w-4xl mx-auto p-4 md:p-6 space-y-6 print:p-0 print:m-0'>
      {/* Action Bar */}
      <div className='bg-white shadow-md rounded-xl p-4 flex justify-between items-center print:hidden'>
        <div className='flex items-center'>
          <div className='h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center'>
            <svg
              className='h-6 w-6 text-amber-700'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
              />
            </svg>
          </div>
          <div className='ml-3'>
            <h2 className='font-semibold text-gray-800'>Event #{data.id}</h2>
            <p className='text-sm text-gray-500'>Manage booking details</p>
          </div>
        </div>
        <div className='flex space-x-2'>
          <button
            onClick={() => window.history.back()}
            className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-150'
          >
            Back
          </button>
        </div>
      </div>

      {/* Printable Receipt Area */}
      <div
        id='receipt-content'
        className='relative overflow-hidden bg-white shadow-xl rounded-2xl border border-gray-100 p-6 md:p-8 space-y-6 text-gray-800 font-sans print:shadow-none print:border-none print:p-0 print:m-0 print:space-y-3'
      >
        {/* Watermark */}
        <div
          aria-hidden='true'
          className='absolute inset-0  flex items-center justify-center z-100 pointer-events-none'
          style={{
            color: 'rgba(79, 70, 229, 0.03)',
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          <Image
            src='/logo_water.png'
            alt='logo watermark'
            height={400}
            width={600}
            className='opacity-30'
          />
        </div>

        {/* Receipt Content */}
        <div className='relative z-10 space-y-6 print:space-y-3'>
          {/* Modern Header with Gradient */}
          <div className='bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white p-2 rounded-xl shadow-lg'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <div className='w-32 h-32 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl shadow-inner mr-4 border border-amber-600'>
                  <Image
                    src='/logo.jpg'
                    alt='logo'
                    height={120}
                    width={120}
                    className='transform rounded-xl hover:scale-105 transition-transform duration-300'
                  />
                </div>
                <div>
                  <h1 className='text-3xl font-bold text-white print:text-2xl'>
                    KOHINOOR
                  </h1>
                  <p className='text-amber-100 text-sm mt-1 print:text-xs'>
                    Mangal Karyalay & Open Lawn
                  </p>
                  <p className='text-amber-200 text-xs mt-1 font-semibold print:text-2xs'>
                    GST No: 27AALFK2963D1ZQ
                  </p>
                </div>
              </div>
              <div className='text-right text-sm text-amber-100 print:text-xs bg-amber-900/40 p-3 rounded-lg backdrop-blur-sm'>
                <p className='font-semibold'>Ph: 7588203811</p>
                <p>Bastegav Road, Akkalkot Dist.</p>
                <p>Solapur, Maharashtra 413216</p>
              </div>
            </div>
          </div>

          {/* Enhanced Receipt Title with Ornamental Design */}
          <div className='text-center my-8 print:my-4'>
            <div className='flex items-center justify-center'>
              <div className='flex-grow h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent max-w-xs print:via-amber-600'></div>
              <svg
                className='h-8 w-8 mx-3 text-amber-700 print:h-6 print:w-6'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
              >
                <path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' />
              </svg>
              <h2 className='text-2xl font-semibold mx-3 text-amber-800 print:text-xl'>
                Venue Booking Receipt
              </h2>
              <svg
                className='h-8 w-8 mx-3 text-amber-700 print:h-6 print:w-6'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
              >
                <path d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z' />
              </svg>
              <div className='flex-grow h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent max-w-xs print:via-amber-600'></div>
            </div>
          </div>

          {/* Render the Modern Event Snapshot Component */}
          <ModernEventSnapshot
            data={data}
            formatTime12hr={formatTime12hr}
            formatCurrency={formatCurrency}
          />

          {/* Client Information Section - Enhanced with better spacing and layout */}
          <div className='bg-gradient-to-r from-indigo-50 to-white rounded-xl p-6 border border-indigo-100 shadow-sm space-y-4 hover:shadow-md transition-all duration-300 print:bg-indigo-50 print:border print:border-gray-300 print:p-4 print:space-y-2 print:shadow-none'>
            <div className='flex items-center border-b border-indigo-200 pb-3 print:pb-2 print:border-b print:border-gray-300'>
              <div className='bg-indigo-100 p-2 rounded-lg mr-3 print:p-1.5'>
                <svg
                  className='h-5 w-5 text-indigo-600 print:h-4 print:w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-indigo-900 print:text-base print:text-black'>
                <span className='text-base font-medium text-gray-800 print:text-sm'>
                  {data.client_name.toUpperCase() || '—'}
                </span>
              </h3>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 print:gap-4 print:grid-cols-2'>
              <div className='space-y-5 print:space-y-2'>
                <div>
                  <span className='text-xs font-semibold text-violet-600 uppercase tracking-wider block mb-1.5 print:text-2xs print:mb-0.5'>
                    Contact Number
                  </span>
                  <span className='text-gray-700 print:text-sm'>
                    {data.contact || '—'}
                  </span>
                </div>
                <div>
                  <span className='text-xs font-semibold text-violet-600 uppercase tracking-wider block mb-1.5 print:text-2xs print:mb-0.5'>
                    Email Address
                  </span>
                  <span className='text-gray-700 print:text-sm'>
                    {data.email || '—'}
                  </span>
                </div>
              </div>

              <div className='space-y-5 print:space-y-2'>
                <div>
                  <span className='text-xs font-semibold text-violet-600 uppercase tracking-wider block mb-1.5 print:text-2xs print:mb-0.5'>
                    Booking Date
                  </span>
                  <span className='text-gray-700 print:text-sm'>
                    {new Date(data?.createdAt)?.toLocaleDateString('en-IN', {
                      day: 'numeric',
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                </div>
                <div>
                  <span className='text-xs font-semibold text-violet-600 uppercase tracking-wider block mb-1.5 print:text-2xs print:mb-0.5'>
                    Address
                  </span>
                  <span className='text-sm text-gray-700 print:text-xs'>
                    {data.address || '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with Signature */}
          <div className='flex flex-col md:flex-row justify-between items-end border-t border-gray-200 pt-4 print:pt-3 print:border-t print:border-gray-300 print:flex-row'>
            <div className='flex flex-col items-start mb-4 md:mb-0 print:mb-0'>
              <div className='text-xs text-gray-500 print:text-2xs'>
                <p>
                  Generated:{' '}
                  {new Date().toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              {/* Modern QR Code Placeholder */}
              <div className='mt-2 bg-gradient-to-br from-gray-100 to-gray-50 h-16 w-16 flex items-center justify-center rounded-lg border border-gray-200 print:h-12 print:w-12 print:bg-gray-100'>
                <svg
                  className='h-10 w-10 text-gray-400 print:h-8 print:w-8'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z'
                  />
                </svg>
              </div>
            </div>
            <div className='text-right'>
              <div className='border-t-2 border-black px-16 py-1 mb-1 print:border-t print:border-gray-600 print:px-12 print:pt-0 print:pb-1'>
                <span className='block h-6 print:h-4'></span>
              </div>
              <span className='font-medium text-gray-600 text-sm print:text-xs print:text-black'>
                Authorized Signature with Stamp
              </span>
            </div>
          </div>
        </div>
      </div>
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
