import React, { memo } from "react";
import { Input, Select } from "@/components/common";
import { SelectOptionType, FormPropType } from "../../../constants/types";
import JSON from "../../../constants/data.json";

const ListDetails: React.FC<FormPropType> = ({ state, setstate }) => {
  const handleInputValue = (e: SelectOptionType) => {
    const { name, value } = e;
    setstate({ ...state, [name]: value });
  };

  return (
    <div>
      <h1 className="font-bold text-xl text-gray-700 py-3">Listed Address</h1>
      <div className="flex flex-wrap justify-between p-5 bg-white rounded-md">
        <Input
          name="number"
          inputValue={handleInputValue}
          label="Number"
          inputSize="large"
        />
        <Select
          name="direction"
          inputValue={handleInputValue}
          label="Direction"
          inputSize="large"
          inputAction={true}
          options={JSON.selectOptions.direction}
        />
        <Input
          name="street"
          inputValue={handleInputValue}
          label="Street"
          inputSize="large"
        />
        <Input
          name="zip"
          inputValue={handleInputValue}
          label="Zip"
          inputSize="large"
        />
        <Select
          name="suffix"
          inputValue={handleInputValue}
          label="Suffix"
          inputSize="large"
          inputAction={true}
          options={JSON.selectOptions.suffix}
        />
        <Select
          name="location"
          inputValue={handleInputValue}
          label="Location"
          inputSize="large"
          inputAction={true}
          options={JSON.selectOptions.location}
        />
        <Select
          name="city"
          inputValue={handleInputValue}
          label="City"
          inputSize="large"
          inputAction={true}
          options={JSON.selectOptions.city}
        />
        <Select
          name="state"
          inputValue={handleInputValue}
          label="State"
          inputSize="large"
          inputAction={true}
          options={JSON.selectOptions.state}
        />
      </div>
    </div>
  );
};

export default memo(ListDetails);
