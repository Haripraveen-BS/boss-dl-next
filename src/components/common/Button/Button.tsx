import React, { memo } from "react";
interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
  extendedClass?: string;
  btnType: "primary" | "secondary";
}
const Button = ({ title, btnType, extendedClass, ...restProps }: Props) => {
  return (
    <button
      {...restProps}
      className={`py-2 text-center ${
        btnType === "primary"
          ? "px-10 bg-blue-600 text-white border-blue-700"
          : "px-20 bg-blue-100 text-blue-700 border-blue-200"
      } border font-semibold rounded  ${extendedClass ? extendedClass : ""}`}
    >
      {title}
    </button>
  );
};

export default memo(Button);
