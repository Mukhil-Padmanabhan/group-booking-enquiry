'use client';

import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

type RadioGroupProps = {
  name: string;
  options: { label: string; value: string }[];
  label: string;
  error?: string;
  id?: string;
};

export default function RadioGroup({ name, options, label, error, id }: RadioGroupProps) {
  const {
    register,
    watch,
  } = useFormContext();
  const groupId = id;
  const selectedValue = watch(name);

  return (
    <fieldset className="space-y-2">
      <legend
        className={clsx('text-sm font-medium mb-1', {
          'text-red-600': error,
          'text-gray-900': !error
        })}
      >
        {label}
      </legend>

      <div className="grid gap-2">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <label
              key={option.value}
              htmlFor={`${groupId}-${option.value}`}
              className={clsx(
                'flex items-center gap-2 px-4 py-3 border rounded cursor-pointer transition-colors',
                {
                  'border-purple-600 bg-purple-50 ring-2 ring-purple-500': isSelected,
                  'border-gray-300 hover:bg-gray-50': !isSelected,
                  'border-red-600': error
                }
              )}
            >
              <input
                {...register(name)}
                type="radio"
                id={`${groupId}-${option.value}`}
                value={option.value}
              />
              <span className="text-sm">{option.label}</span>
            </label>
          );
        })}
      </div>

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </fieldset>
  );
}
