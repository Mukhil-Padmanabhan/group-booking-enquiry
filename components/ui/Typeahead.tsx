'use client';

import { Combobox } from '@headlessui/react';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

type Option = {
  label: string;
  value: string;
};

type TypeaheadProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  id?: string;
};

export default function Typeahead({
  options,
  value,
  onChange,
  placeholder,
  error,
  id,
}: TypeaheadProps) {
  const inputId = id;

  const getInitialQuery = () => {
    const matchedOption = options.find((o) => o.value === value);
    return matchedOption ? matchedOption.label : '';
  };

  const [query, setQuery] = useState(getInitialQuery);

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="relative">
      <Combobox value={value ?? ''} onChange={onChange}>
        <div className="relative">
          <Combobox.Input
            id={inputId}
            className={`w-full border p-2 rounded text-sm text-black focus:outline-none ${error
              ? 'border-red-600 focus:ring-red-600'
              : 'border-gray-300 focus:ring-purple-600'
              }`}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            placeholder={placeholder}
            displayValue={(val: string) =>
              options.find((o) => o.value === val)?.label || ''
            }
            onChange={(e) => setQuery(e.target.value)}
          />

          <Combobox.Button
            className="absolute inset-y-0 right-2 flex items-center text-gray-400"
            aria-label="Toggle options"
          >
            <FaChevronDown />
          </Combobox.Button>
        </div>

        {filteredOptions.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white border shadow-md text-sm">
            {filteredOptions.map((option) => (
              <Combobox.Option
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 ${active
                    ? 'bg-purple-100 text-purple-800'
                    : 'text-gray-900'
                  }`
                }
              >
                {option.label}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}

        {error && (
          <p
            id={`${inputId}-error`}
            className="text-red-600 text-sm mt-1"
            role="alert"
          >
            {error}
          </p>
        )}
      </Combobox>
    </div>
  );
}
