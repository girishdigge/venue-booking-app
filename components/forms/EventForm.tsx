'use client';

import { EventSchema, eventSchema } from '@/schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import InputField from './InputField';

const EventForm = ({
  type,
  data,
}: {
  type: 'create' | 'update';
  data?: Partial<EventSchema>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: data,
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className='w-full max-w-3xl bg-white shadow-md rounded-xl p-8 space-y-6'
    >
      <div className='space-y-1'>
        <h1 className='text-2xl font-semibold text-gray-800'>
          {type === 'create' ? 'Create New Event' : 'Update Event'}
        </h1>
        <p className='text-sm text-gray-500'>
          Fill in the event details below.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        <InputField
          label='Name'
          name='name'
          register={register}
          error={errors.name}
        />
        <InputField
          label='Event Type'
          name='event'
          register={register}
          error={errors.event}
        />
        <InputField
          label='Date'
          name='date'
          type='date'
          register={register}
          error={errors.date}
        />
        <InputField
          label='Hall'
          name='hall'
          register={register}
          error={errors.hall}
        />
        <InputField
          label='Email'
          name='email'
          type='email'
          register={register}
          error={errors.email}
        />
        <InputField
          label='Contact'
          name='contact'
          register={register}
          error={errors.contact}
        />
        <InputField
          label='Start Time'
          name='startTime'
          type='time'
          register={register}
          error={errors.startTime}
        />
        <InputField
          label='End Time'
          name='endTime'
          type='time'
          register={register}
          error={errors.endTime}
        />
        <InputField
          label='Amount'
          name='amount'
          type='number'
          register={register}
          error={errors.amount}
        />
        <InputField
          label='Advance'
          name='advance'
          type='number'
          register={register}
          error={errors.advance}
        />
        <InputField
          label='Address'
          name='address'
          register={register}
          error={errors.address}
        />
        <InputField
          label='Details'
          name='details'
          register={register}
          error={errors.details}
        />
      </div>

      <div className='pt-4'>
        <button
          type='submit'
          className='w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition'
        >
          {type === 'create' ? 'Create Event' : 'Update Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
