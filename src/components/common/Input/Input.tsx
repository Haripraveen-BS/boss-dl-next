import React, { memo, useState, ChangeEvent } from "react";
import { Icons } from "@/components/common";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  inputSize?: "small" | "medium" | "large" | "xLarge";
  inputAction?: boolean;
  name: string;
  inputValue: (e: { name: string; value: string }) => void;
}
const Input: React.FC<InputProps> = ({
  label,
  inputSize,
  inputAction = true,
  inputValue,
  className,
  ...restProps
}) => {
  const [input, setInput] = useState<string>("");
  const inputSizes: { [key: string]: string } = {
    small: "w-48",
    medium: "w-80",
    large: "w-[26rem]",
    xLarge: "w-[42rem]",
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    inputValue({ name, value });
    setInput(value);
  };
  return (
    <div className={`${className} mb-5`}>
      <label className="block text-gray-600 text-md font-semibold mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          {...restProps}
          value={input}
          onChange={handleChange}
          className={`${
            inputSize ? inputSizes[inputSize] : "w-full"
          } shadow appearance-none border border-gray-300  rounded px-3 py-2 text-gray-700
                 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-300`}
          type="text"
        />
        {inputAction && (
          <Icons
            classname={"absolute top-1 right-1"}
            type="close"
            onClick={() => setInput("")}
          />
        )}
      </div>
    </div>
  );
};
export default memo(Input);
