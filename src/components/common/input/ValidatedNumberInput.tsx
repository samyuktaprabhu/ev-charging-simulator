import React, { useCallback, useState, useEffect } from "react";

interface NumberInputProps {
  label?: string;
  value: number;
  onBlur?: (value: number) => void;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  defaultValue?: number;
}

export const ValidatedNumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onBlur,
  onChange,
  min,
  max,
  defaultValue = 1,
}) => {
  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>(value.toString());
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (!isFocused) {
      setInputValue(value.toString());
    }
  }, [value, isFocused]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      const val = e.target.value.trim();

      if (val === "") {
        setInputValue(defaultValue.toString());
        setError("");
        onChange(defaultValue);
        if (onBlur) onBlur(defaultValue);
        return;
      }

      const numericMatch = val.match(/^-?\d+(\.\d+)?/);
      if (!numericMatch) {
        setInputValue(defaultValue.toString());
        setError("");
        onChange(defaultValue);
        if (onBlur) onBlur(defaultValue);
        return;
      }

      const numericValue = numericMatch[0];
      const numValue = Number(numericValue);

      let finalValue = numValue;
      if (min !== undefined && numValue < min) {
        finalValue = min;
      } else if (max !== undefined && numValue > max) {
        finalValue = max;
      }

      setError("");
      setInputValue(finalValue.toString());
      onChange(finalValue);
      if (onBlur) onBlur(finalValue);
    },
    [onChange, onBlur, min, max, defaultValue]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);

      if (val === "") {
        setError("");
        return;
      }

      const numValue = Number(val);
      if (isNaN(numValue)) {
        setError("Invalid number");
        return;
      }

      if (min !== undefined && numValue < min) {
        setError(`Value must be at least ${min}`);
      } else if (max !== undefined && numValue > max) {
        setError(`Value must be at most ${max}`);
      } else {
        setError("");
        const constrainedValue = Math.max(
          min ?? -Infinity,
          Math.min(max ?? Infinity, numValue)
        );

        onChange(constrainedValue);
      }
    },
    [onChange, min, max]
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-xs font-medium text-left text-gray-600">
          {label}
        </label>
      )}
      <input
        className={`rounded-lg px-3 py-2 text-xs text-gray-600 min-w-24 max-w- font-medium border shadow-sm bg-white transition-all
          focus:outline-none focus:ring-2 focus:ring-offset-1
          ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-400"
          }
        `}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        style={{ width: "100%" }}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
