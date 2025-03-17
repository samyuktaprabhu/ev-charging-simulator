import { memo, useCallback } from "react";

interface Props {
  selectedValue: string | number;
  onChange: (value: string | number) => void;
  options: {
    value: string;
    label: string;
  }[];
  label?: string;
}

export const ValidatedDropdownInput: React.FC<Props> = memo(
  ({ selectedValue, label, onChange, options }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = isNaN(Number(e.target.value))
          ? e.target.value
          : Number(e.target.value);
        onChange(newValue);
      },
      [onChange]
    );

    return (
      <div className="w-full flex flex-col">
        {label && (
          <label className="block text-xs font-medium text-gray-600 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            value={selectedValue}
            onChange={handleChange}
            className="w-full text-sm px-3 py-2 border border-slate-50 bg-white shadow-xs rounded-md focus:outline-none focus:ring-1 focus:ring-slate-50 focus:border-slate-50 transition-all duration-200 appearance-none"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
            <svg
              className="h-4 w-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
    );
  }
);

export default ValidatedDropdownInput;
