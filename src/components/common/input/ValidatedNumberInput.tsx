import React, { useCallback } from "react";

interface NumberInputProps {
  label: string;
  value: number;
  onBlur?: (value: number) => void;
  onChange: (value: number) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
}

export const ValidatedNumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onBlur,
  onChange,
  placeholder = "",
  required = false,
  min,
  max,
}) => {
  const [error, setError] = React.useState<string>("");

  const handleBlur = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (required && (value === undefined || value === null || value === 0)) {
        setError("This field is required");
      } else {
        setError("");
      }
      const newValue = Number(e.target.value);
      if (onBlur) onBlur(newValue);
    },
    [onBlur]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = Number(e.target.value);

      if (isNaN(newValue)) {
        setError("Invalid number");
        return;
      }

      if (min !== undefined && newValue < min) {
        setError(`Value must be at least ${min}`);
      } else if (max !== undefined && newValue > max) {
        setError(`Value must be at most ${max}`);
      } else {
        setError("");
      }

      newValue = Math.max(
        min ?? -Infinity,
        Math.min(max ?? Infinity, newValue)
      );

      onChange(newValue);
    },
    [onChange, min, max]
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs font-medium text-left text-gray-600">
        {label}
      </label>
      <input
        className={`rounded-lg px-3 py-2 text-xs text-gray-600 font-medium border shadow-sm bg-white transition-all
      focus:outline-none focus:ring-2 focus:ring-offset-1
      ${
        error
          ? "border-red-500 focus:ring-red-400"
          : "border-gray-300 focus:ring-blue-400"
      }
    `}
        type={"number"}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        min={min ? min : undefined}
        max={max ? max : undefined}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
