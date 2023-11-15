import React, { memo, useState, useEffect, useRef } from "react";
import { Icons } from "@/components/common";
import { SelectOptionType } from "../../../constants/types";

interface Select extends React.HTMLProps<HTMLInputElement> {
  label: string;
  inputSize?: "small" | "medium" | "large";
  inputAction?: boolean;
  name: string;
  options?: SelectOptionType[];
  inputValue: (e: SelectOptionType) => void;
}
const Select: React.FC<Select> = ({
  label,
  inputSize,
  inputAction,
  inputValue,
  options,
  ...restProps
}) => {
  const [input, setInput] = useState<string| number>("");
  const [select, setSelcet] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputSizes: { [key: string]: string } = {
    small: "w-48",
    medium: "w-80",
    large: "w-[26rem]",
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setSelcet(false);
    }
  };


  const handleClick = (options: SelectOptionType) => {
    const { name, value } = options;
    inputValue({ name, value });
    setInput(value);
    setSelcet(false);
  };
  return (
    <div className="mb-5">
      <label className="block text-gray-600 text-md font-semibold mb-2">
        {label}
      </label>
      <div className="relative cursor-pointer" ref={selectRef}>
        <input
          {...restProps}
          value={input}
          readOnly
          onClick={()=>setSelcet(!select)}
          className={`${
            inputSize ? inputSizes[inputSize] : "w-full"
          } cursor-pointer shadow appearance-none border border-gray-300  rounded px-3 py-2 text-gray-700
                 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-300`}
          type="text"
        />
        {select && (
          <div className={`absolute top-12 shadow-md z-10  rounded w-1/2 mt-1  bg-white min-h-fit ${inputSize ? inputSizes[inputSize] : 'w-full'}`}>
            <div className=" px-5 py-2 text-gray-600">Select Any Options</div>
           {options?.map((o) => (
              <div key={o.name} className=" px-5 py-2 hover:bg-gray-100"  onClick={() => handleClick(o)}>{o.value}</div>
            ))
          }
        </div>
        )}
        {inputAction && (
          <Icons
            classname={"absolute top-1 right-1"}
            type="open"
            onClick={() => setSelcet(!select)}
          />
        )}
      </div>
    </div>
  );
};
export default memo(Select);
