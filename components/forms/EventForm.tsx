// 'use client';

// import { EventSchema, eventSchema } from '@/schema/schema';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import InputField from './InputField';

// const EventForm = ({
//   type,
//   data,
// }: {
//   type: 'create' | 'update';
//   data?: Partial<EventSchema>;
// }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<EventSchema>({
//     resolver: zodResolver(eventSchema),
//     defaultValues: data,
//   });

//   const onSubmit = handleSubmit((data) => {
//     console.log(data);
//   });

//   return (
//     <form
//       onSubmit={onSubmit}
//       className='w-full max-w-3xl bg-white shadow-md rounded-xl p-8 space-y-6'
//     >
//       <div className='space-y-1'>
//         <h1 className='text-2xl font-semibold text-gray-800'>
//           {type === 'create' ? 'Create New Event' : 'Update Event'}
//         </h1>
//         <p className='text-sm text-gray-500'>
//           Fill in the event details below.
//         </p>
//       </div>

//       <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
//         <InputField
//           label='Name'
//           name='name'
//           register={register}
//           error={errors.name}
//         />
//         <InputField
//           label='Event Type'
//           name='event'
//           register={register}
//           error={errors.event}
//         />
//         <InputField
//           label='Date'
//           name='date'
//           type='date'
//           register={register}
//           error={errors.date}
//         />
//         <InputField
//           label='Hall'
//           name='hall'
//           register={register}
//           error={errors.hall}
//         />
//         <InputField
//           label='Email'
//           name='email'
//           type='email'
//           register={register}
//           error={errors.email}
//         />
//         <InputField
//           label='Contact'
//           name='contact'
//           register={register}
//           error={errors.contact}
//         />
//         <InputField
//           label='Start Time'
//           name='startTime'
//           type='time'
//           register={register}
//           error={errors.startTime}
//         />
//         <InputField
//           label='End Time'
//           name='endTime'
//           type='time'
//           register={register}
//           error={errors.endTime}
//         />
//         <InputField
//           label='Amount'
//           name='amount'
//           type='number'
//           register={register}
//           error={errors.amount}
//         />
//         <InputField
//           label='Advance'
//           name='advance'
//           type='number'
//           register={register}
//           error={errors.advance}
//         />
//         <InputField
//           label='Address'
//           name='address'
//           register={register}
//           error={errors.address}
//         />
//         <InputField
//           label='Details'
//           name='details'
//           register={register}
//           error={errors.details}
//         />
//       </div>

//       <div className='pt-4'>
//         <button
//           type='submit'
//           className='w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition'
//         >
//           {type === 'create' ? 'Create Event' : 'Update Event'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EventForm;

// EventForm.tsx

'use client';

import { EventSchema, eventSchema } from '@/schema/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from './InputField';
// import { useState } from 'react';

const EventForm = ({
  type,
  data,
}: {
  type: 'create' | 'update';
  data?: Partial<EventSchema>;
}) => {
  // Format a Date or string to an ISO date string (YYYY-MM-DD)
  const formatInitialDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const d = date instanceof Date ? date : new Date(date);
    return d.toISOString().split('T')[0];
  };

  // Set default values for the form
  const initialValues: Partial<EventSchema> = {
    ...data,
    date: data?.date ? formatInitialDate(data.date) : '',
    amount: data?.amount ?? 0,
    advance: data?.advance ?? 0,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialValues,
  });

  // const [formErrors, setFormErrors] = useState<string | null>(null);

  const onSubmit = handleSubmit((data) => {
    console.log('Form submitted successfully:', data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className='w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8 space-y-8'
    >
      {/* Header */}
      <div className='border-b pb-4'>
        <h1 className='text-3xl font-bold text-gray-800'>
          {type === 'create' ? 'Create New Event' : 'Update Event'}
        </h1>
        <p className='text-sm text-gray-500 mt-2'>
          Complete the event details below to{' '}
          {type === 'create' ? 'schedule a new event' : 'modify your event'}.
        </p>
      </div>

      {/* {formErrors && (
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
          {formErrors}
        </div>
      )} */}

      {/* Event Basic Info */}
      <div className='space-y-6'>
        <div className='flex items-center gap-2'>
          <div className='h-6 w-1 bg-blue-600 rounded-full'></div>
          <h2 className='text-xl font-semibold text-gray-700'>
            Event Information
          </h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <InputField
            label='Event Name'
            name='name'
            register={register}
            error={errors.name}
            placeholder='Enter event name'
            required
          />
          <InputField
            label='Event Type'
            name='event'
            register={register}
            error={errors.event}
            placeholder='Wedding, Birthday, etc.'
            required
          />
        </div>
      </div>

      {/* Time & Location */}
      <div className='space-y-6'>
        <div className='flex items-center gap-2'>
          <div className='h-6 w-1 bg-green-500 rounded-full'></div>
          <h2 className='text-xl font-semibold text-gray-700'>Date & Time</h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <InputField
            label='Date'
            name='date'
            type='date'
            register={register}
            error={errors.date}
            required
            helperText='Select event date'
          />
          <InputField
            label='Hall'
            name='hall'
            register={register}
            error={errors.hall}
            placeholder='Select venue/hall'
            required
          />
          <InputField
            label='Start Time'
            name='startTime'
            type='time'
            register={register}
            error={errors.startTime}
            helperText='Format: HH:MM (24-hour)'
          />
          <InputField
            label='End Time'
            name='endTime'
            type='time'
            register={register}
            error={errors.endTime}
            helperText='Format: HH:MM (24-hour)'
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className='space-y-6'>
        <div className='flex items-center gap-2'>
          <div className='h-6 w-1 bg-amber-500 rounded-full'></div>
          <h2 className='text-xl font-semibold text-gray-700'>
            Contact Information
          </h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <InputField
            label='Email'
            name='email'
            type='email'
            register={register}
            error={errors.email}
            placeholder='contact@example.com'
          />
          <InputField
            label='Contact Number'
            name='contact'
            register={register}
            error={errors.contact}
            placeholder='Phone number'
          />
        </div>
        <div className='sm:col-span-2'>
          <InputField
            label='Address'
            name='address'
            register={register}
            error={errors.address}
            placeholder='Client address'
          />
        </div>
      </div>

      {/* Financial Details */}
      <div className='space-y-6'>
        <div className='flex items-center gap-2'>
          <div className='h-6 w-1 bg-purple-500 rounded-full'></div>
          <h2 className='text-xl font-semibold text-gray-700'>
            Financial Details
          </h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <InputField
            label='Total Amount'
            name='amount'
            type='number'
            register={register}
            error={errors.amount}
            placeholder='0'
            valueAsNumber
          />
          <InputField
            label='Advance Payment'
            name='advance'
            type='number'
            register={register}
            error={errors.advance}
            placeholder='0'
            valueAsNumber
          />
        </div>
      </div>

      {/* Additional Details */}
      <div className='space-y-6'>
        <div className='flex items-center gap-2'>
          <div className='h-6 w-1 bg-red-500 rounded-full'></div>
          <h2 className='text-xl font-semibold text-gray-700'>
            Additional Details
          </h2>
        </div>
        <div className='grid grid-cols-1 gap-6'>
          <InputField
            label='Special Requirements'
            name='details'
            register={register}
            error={errors.details}
            placeholder='Any special requirements or notes'
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className='pt-6 border-t'>
        <div className='flex justify-end gap-4'>
          <button
            type='button'
            className='px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={isSubmitting}
            className='px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2'
          >
            {isSubmitting && (
              <svg
                className='animate-spin h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
            )}
            {type === 'create' ? 'Create Event' : 'Update Event'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
