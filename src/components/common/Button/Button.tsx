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
          ? "px-10 bg-yellow-400 text-white border-yellow-400"
          : "px-20 bg-white text-yellow-400 border-yellow-200"
      } border font-semibold rounded  ${extendedClass ? extendedClass : ""}`}
    >
      {title}
    </button>
  );
};

export default memo(Button);
