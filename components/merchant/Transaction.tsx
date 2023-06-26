import React,{useState,useMemo,useEffect} from "react";
import {Items, itemData } from "../tables/components/itemData";
import { ColumnDef } from "@tanstack/react-table";
import CardTables from "../tables/layouts/CardTables";
import SelectTables from "../tables/layouts/SelectTables";
import ScrollCardTables from "../tables/layouts/ScrollCardTables";


const Transaction = () => {

      //datatable
      const [pages, setPages] = useState(1);
      const [limit, setLimit] = useState(10);
      const [pageCount, setPageCount] = useState(1);
      const [total, setTotal] = useState(1);
      const [dataTable, setDataTable] = useState<Items[]>([]);
      const [isSelectedRow, setIsSelectedRow] = useState({});

      const [loading, setLoading] = useState(true);

      const columns = useMemo<ColumnDef<Items, any>[]>(() => [
        {
          accessorKey:'description',
          cell: info =>{
            return(
              <div className="flex flex-col p-2">
                <h3 className="text-primary text-left text-2xl font-bold">-</h3>
                <p className="text-grey">13/04/2023, 15:48</p>
              </div>
            )
          }
        },
        {
          accessorKey:'price',
          cell: info =>{
            let price = info?.row?.original?.price
            return(
              <div className="flex flex-col p-2">
                <div className="flex  w-full justify-end">
                  <div className="flex p-1 w-3/12 rounded-sm bg-primary text-white justify-center items-center">
                    <span>Order</span>
                  </div>
                </div>
                <div className="flex justify-end text-left">
                  <p className="text-base font-bold">{"IDR " + price}</p>
                </div>


              </div>
            )
          }
        }

      ], [])

      useEffect(() => {
        setDataTable(itemData(1))
      }, [itemData])




  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-2 no-scrollbar lg:space-y-0 mt-3 justify-center items-center lg:flex-row w-full">
        <div className="w-full lg:w-[50%] flex flex-row justify-center items-center">
          <div className="lg:w-[80%] w-full flex justify-center items-center bg-white rounded-lg mr-2 p-2">
            <input
              type="text"
              placeholder="search"
              className=" bg-transparent w-full focus:outline-none"
            ></input>
          </div>
          <div className="bg-[#5F59F7] p-3 flex justify-center items-center rounded-lg w-[20%]">
            <button>
              <svg
                width="18"
                height="18"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.33332 7.33326H7.80666L7.61999 7.15326C8.41999 6.21993 8.83332 4.9466 8.60666 3.59326C8.29332 1.73993 6.74666 0.259929 4.87999 0.0332621C2.05999 -0.313405 -0.313344 2.05993 0.0333232 4.87993C0.25999 6.74659 1.73999 8.29326 3.59332 8.6066C4.94666 8.83326 6.21999 8.41993 7.15332 7.61993L7.33332 7.80659V8.33326L10.1667 11.1666C10.44 11.4399 10.8867 11.4399 11.16 11.1666C11.4333 10.8933 11.4333 10.4466 11.16 10.1733L8.33332 7.33326ZM4.33332 7.33326C2.67332 7.33326 1.33332 5.99326 1.33332 4.33326C1.33332 2.67326 2.67332 1.33326 4.33332 1.33326C5.99332 1.33326 7.33332 2.67326 7.33332 4.33326C7.33332 5.99326 5.99332 7.33326 4.33332 7.33326Z"
                  fill="#9DACBA"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full flex flex-row justify-center px-2 items-center lg:w-[50%]">
          <p className="w-[50%] text-white text-center">Category :</p>
          <div className="w-full flex-row flex lg:w-[50%] justify-start bg-white rounded-lg p-2">
            <div className="w-3/4 text-left flex justify-start">
              <p>All</p>
            </div>
            <div className="w-1/4 flex border-l-2 justify-center items-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                className="transform transition-all ease-in-out text-gray-600 w-5 h-5"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M7 10l5 5 5-5z"></path>
              </svg>
            </div>
          </div>
        </div>


      </div>
      <ScrollCardTables
                                    loading={loading}
                                    setLoading={setLoading}
                                    pages={pages}
                                    setPages={setPages}
                                    limit={limit}
                                    setLimit={setLimit}
                                    pageCount={pageCount}
                                    columns={columns}
                                    dataTable={dataTable}
                                    total={total}
                                    setIsSelected={setIsSelectedRow}
                                    // isInfiniteScroll
                                    classTable="bg-gray p-4"
                                    isHideHeader
                                />
    </div>
  );
};

export default Transaction;
