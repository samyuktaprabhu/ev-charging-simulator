import React, { useCallback, useState, useEffect } from "react";
import { z } from "zod";

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

  const numberSchema = useCallback(() => {
    return z
      .string()
      .refine((val) => val === "" || !isNaN(Number(val)), {
        message: "Input must be a valid number",
      })
      .transform((val) => (val === "" ? defaultValue : Number(val)))
      .refine(
        (val) =>
          (min === undefined || val >= min) &&
          (max === undefined || val <= max),
        {
          message: `Number must be between ${min ?? "-∞"} and ${max ?? "∞"}`,
        }
      );
  }, [min, max, defaultValue]);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      const val = e.target.value.trim();
      const result = numberSchema().safeParse(val);
      const finalValue = result.success ? result.data : defaultValue;
      setError("");
      setInputValue(finalValue.toString());
      onChange(finalValue);
      if (onBlur) onBlur(finalValue);
    },
    [onChange, onBlur, defaultValue, numberSchema]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);

      const result = numberSchema().safeParse(val);
      if (result.success) {
        setError("");
        onChange(result.data);
      } else {
        setError(result.error.errors[0]?.message || "Invalid number");
      }
    },
    [onChange, numberSchema]
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
