interface SliderInputProps {
  label: string;
  disabled?: boolean;
  onChange: (value: number) => void;
  value?: number;
  min?: number;
  max?: number;
}

const SliderInput = (props: SliderInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = Number(e.target.value);
    props.onChange(newValue);
  };

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-xs font-medium text-left text-gray-500">
          {props.label} : {props.value}
        </label>
        <input
          type="range"
          min="20"
          max="200"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-slate-500"
          value={props.value}
          disabled={props.disabled || false}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default SliderInput;
