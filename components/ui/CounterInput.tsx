'use client';

type CounterInputProps = {
    value: number;
    onChange: (val: number) => void;
    label: string;
    description?: string;
    min?: number;
    max?: number;
    disabled?: boolean;
    error?: string;
};

export default function CounterInput({
    value,
    onChange,
    label,
    description,
    min = 0,
    max = 99,
    disabled = false,
    error,
}: CounterInputProps) {
    const handleDecrement = () => {
        if (!disabled) onChange(Math.max(min, value - 1));
    };

    const handleIncrement = () => {
        if (!disabled) onChange(Math.min(max, value + 1));
    };

    return (
        <div>
            <label className={`font-medium ${error ? 'text-red-600' : 'text-black'}`}>
                {label}
                {description && (
                    <span className="text-sm text-gray-500 ml-1">({description})</span>
                )}
            </label>

            <div className="flex items-center gap-3 mt-1">
                <button
                    type="button"
                    onClick={handleDecrement}
                    className="text-xl px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                    aria-label={`Decrease ${label}`}
                    disabled={disabled}
                >
                    –
                </button>

                <input
                    type="number"
                    value={value}
                    readOnly
                    aria-invalid={!!error}
                    className={`w-16 text-center border p-2 rounded ${error ? 'border-red-600' : 'border-gray-300'
                        }`}
                />

                <button
                    type="button"
                    onClick={handleIncrement}
                    className="text-xl px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                    aria-label={`Increase ${label}`}
                    disabled={disabled}
                >
                    +
                </button>
            </div>

            {error && (
                <p className="text-red-600 text-sm mt-1" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
