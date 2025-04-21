'use client';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  error?: string;
};

export default function CustomPhoneInput({ name, error }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="w-full">
          <div
            className={`relative ${error ? 'ring-2 ring-red-600 rounded-md' : ''
              }`}
          >
            <PhoneInput
              {...field}
              country="gb"
              enableSearch
              inputProps={{
                name,
                required: true,
                autoFocus: false,
                'aria-invalid': !!error,
                'aria-describedby': error ? `${name}-error` : undefined,
              }}
              inputClass={`!w-full !py-2 !pl-12 !pr-4 !text-sm !border !rounded-md !border-gray-300 focus:!border-purple-600 focus:!ring-2 focus:!ring-purple-600 ${error ? '!border-red-600' : ''
                }`}
              buttonClass="!bg-transparent !border-none !outline-none"
              containerClass="!w-full"
              dropdownClass="!z-50"
              onChange={(value) => {
                const finalValue = '+' + value;
                field.onChange(finalValue);
              }}
            />
          </div>

          {error && (
            <span
              id={`${name}-error`}
              className="text-red-600 text-sm mt-1 block"
              role="alert"
            >
              {error}
            </span>
          )}
        </div>
      )}
    />
  );
}
