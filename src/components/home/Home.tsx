import { useState } from "react";
import Search from "@/assets/svg/search.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { ROUTE_CONSTANTS } from "@/constants/routeConstants";
import { setActiveTab, setOrderList } from "@/reducers/baseSlice";
import { useAppDispatch } from "@/hooks";
import axios from "axios";
import { useLazyOrderListQuery } from "./homeQuery";

function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [getOrderData, options] = useLazyOrderListQuery();

  const handleSearchData = () => {
    if (search) {
      getOrderData(search).then((res) => {
        if (res.data.length) {
          router.push(ROUTE_CONSTANTS.DIRECT_LISTING);
          console.log("order response", res);
          dispatch(setOrderList(res.data));
        }
      });
    }
  };

  return (
    <div className="flex w-full pt-40  flex-col justify-center items-center">
      <div className="title text-center  pb-8 font-semibold text-gray-700 text-3xl">
        Customer Listing Search
      </div>
      <div className="flex bg-gray-500 h-10 w-1/2 rounded pl-5 bg-opacity-10">
        <input
          type="text"
          placeholder="Search with account number"
          className="h-10 bg-transparent w-full outline-none border-r border-gray-400"
          name=""
          id=""
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Image
          className={`m-auto w-14 h-8 cursor-pointer`}
          src={Search}
          alt="search"
          onClick={handleSearchData}
        />
      </div>
      {/* {search.length > 0 &&
        <div className="searchResults w-1/2 mt-1  bg-gray-100 min-h-fit">
          {
            orderList?.filter((d:OrderListResponse)=> d.bookName.toUpperCase().includes(search.toUpperCase()))
            .map((data, i) => (
              <div key={i} className=" px-5 py-2 hover:bg-gray-200" onClick={handleSearchData}>{data.bookName}</div>
            ))
          }
        </div>
      } */}
    </div>
  );
}

export default Home;
