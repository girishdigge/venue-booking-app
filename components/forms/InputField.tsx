'use client';

import { InputHTMLAttributes } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
}

const InputField = ({
  label,
  name,
  register,
  error,
  type = 'text',
  ...rest
}: InputFieldProps) => {
  return (
    <div className='flex flex-col gap-1'>
      <label
        htmlFor={name}
        className='text-sm font-medium text-gray-700 capitalize'
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        {...rest}
        className={`px-4 py-2 rounded-lg border transition outline-none ${
          error
            ? 'border-red-500 focus:ring-red-300'
            : 'border-gray-300 focus:ring-blue-300'
        } focus:ring-2`}
      />
      {error && (
        <span className='text-xs text-red-500 font-medium'>
          {error.message}
        </span>
      )}
    </div>
  );
};

export default InputField;
