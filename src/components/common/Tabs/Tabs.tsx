import React from "react";
import { TabItem } from "@/constants/types";
import { useAppSelector } from "../../../hooks";
import { RootState } from "../../../store";

interface TabProps {
  items: TabItem[],
  tabchange: (item: TabItem) => void;
}
function Tabs(props: TabProps) {
  const { items, tabchange } = props;
  const baseState = useAppSelector((state: RootState) => state.application);

  return (
    <div className="w-full h-20 px-12">
      <div className="pt-12 flex gap-5 items-end border-blue-400 border-b">
        {items?.map((item, i) => (
          <button
            key={i}
            onClick={() => tabchange(item)}
            className={`font-semibold cursor-pointer px-[18px] py-[7px] text-center text-blue-700 pb-[9.5px] ${baseState.activeTabId === item.key
              ? "text-opacity-100 bg-opacity-10 bg-blue-700 relative top-[1px] border border-x-blue-400 border-t-blue-400"
              : "text-opacity-50 "
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
