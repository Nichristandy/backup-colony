
import LineCharts from "../../../../components/Chart/LineCharts";
import ItemDetails from "../../../../components/merchant/ItemDetails";
import MerchantCard from "../../../../components/merchant/MerchantCard";
import MerchantMenu from "../../../../components/merchant/MerchantMenu";
import CardTables from "../../../../components/tables/layouts/CardTables";
import { useState, useMemo, useEffect } from "react";
import { formatMoney } from '../../../../utils/useHooks/useFunction';
import { useRouter } from "next/router";
import { BillingProps } from "../../../../components/tables/components/billingData";
import { ColumnDef } from "@tanstack/react-table";
import SelectTables from "../../../../components/tables/layouts/SelectTables";
import OverviewMenu from "../../../../components/merchant/OverviewMenu";
import Category from "../../../../components/merchant/button/Category";
import { Items, itemData } from "../../../../components/tables/components/itemData";
import Button from "../../../../components/Button/Button";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";



type Props = {
    pageProps: any;
  };

const merchant = ({ pageProps }: Props) => {

    const router = useRouter();
    const { pathname, query } = router;

    const onOpenDetail = (items: any) => {
        // setDetails(items)
        // setSidebar(true)
        if(!items?.id){
            router.replace({ pathname })
        }
        router.push({ pathname: `/property/billings/receipt/${items.id}` })
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [search, setSearch] = useState(null);
    const [sort, setSort] = useState(false);
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState<Items>();
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    // data-table
    const [dataTable, setDataTable] = useState<Items[]>([]);
    const [isSelectedRow, setIsSelectedRow] = useState({});
    const [pages, setPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pageCount, setPageCount] = useState(2000);
    const [total, setTotal] = useState(1000);

    const onCloseDelete = () => {
        setDetails(undefined)
        setIsOpenDelete(false)
      };
      const onOpenDelete = (items: any) => {
        setDetails(items)
        setIsOpenDelete(true)
      };

    const columns = useMemo<ColumnDef<Items, any>[]>(() => [
        {
            accessorKey: 'code',
            header: (info) => (
                <div className='uppercase text-left'>ID</div>
            ),
            cell: ({ getValue, row }) => {
                let code = row?.original?.code
                return (
                    <div>
                        <span>{"C -" + code}</span>
                    </div>
                )
            },
            footer: props => props.column.id,
            enableColumnFilter: false,
        },
        {
            accessorKey: 'category',
            header:(info) =>(
                <div className="uppercase text-left">Category Name</div>
            ),
            cell:({getValue,row}) =>{
                let category = row?.original?.category
                return(
                    <div>
                        <span className="font-bold">{category}</span>
                    </div>
                )
            },
            footer: props => props.column.id,
            enableColumnFilter: false,
        },
        {
            accessorKey: 'description',
            header:(info) =>(
                <div className="uppercase text-left">Description</div>
            ),
            cell:({getValue,row})=>{
                return(
                    <div>
                        <span className="font-bold">-</span>
                    </div>
                )
            },
            footer: props => props.column.id,
            enableColumnFilter: false,
        },
        {
            accessorKey:'quantity',
            header:(info) =>(
                <div className="uppercase text-left">Items</div>
            ),
            cell:({getValue, row}) =>{
                let qty = row?.original?.quantity
                return(
                    <div className="flex justify-start">
                        <div className="flex w-3/12 p-1 text-white justify-center items-center bg-slate-300 rounded-sm">
                            <span>{qty}</span>
                        </div>                      
                    </div>
                )
            },
            footer: props => props.column.id,
            enableColumnFilter: false,

        },
        {
            accessorKey: 'id',
            cell: ({ row, getValue }) => {
              // console.log(row.original, "info")
              return (
                <div className='w-full text-center flex items-center justify-start cursor-pointer py-6'>
                  <Button
                    onClick={() => onOpenDetail(row?.original)}
                    className="px-0 py-0"
                    type="button"
                    variant="primary-outline-none"
                  >
                    <MdOutlineEdit className='w-5 h-5 text-gray-5' />
                  </Button>
                  <Button
                    onClick={() => onOpenDelete(row?.original)}
                    className="px-0 py-0"
                    type="button"
                    variant="danger-outline-none"
                  >
                    <MdOutlineDelete className='w-5 h-5 text-gray-5' />
                  </Button>
                </div>
              )
            },
            header: props => {
              return (
                <div className="uppercase text-left">Actions</div>
              )
            },
            footer: props => props.column.id,
            // enableSorting: false,
            enableColumnFilter: false,
            size: 10,
            minSize: 10
          }
    ], []);

    useEffect(() => {
        setDataTable(itemData(100))
      }, [itemData])


    return(
        <>
        <div className="flex flex-col overflow-x-scroll h-screen bg-[#1C2D3D] min-h-full">

        
        <div className="sticky top-0 z-30 w-full shadow bg-[#111F2C] md:w-full items-center transform transition-all duration-500 ease-in-out undefined">
            <div className="relative flex flex-row px-6">
                <div className="w-1/5 hidden lg:inline-block py-4">
                    <div className="text-gray-500 text-lg lg:text-xl tracking-wider">
                        <a className="inline-flex items-center py-2.5 font-bold text-white hover:text-[#5F59F7]">
                            <img className="w-10 h-10 object-cover object-center mr-2" src="../../image/logo-icon.svg"/>
                            <span className="uppercase">merchant</span>
                        </a>
                    </div>
                </div>
                <div className="hidden lg:block border border-[#1C2D3D] inset-y-0 mx-6"></div>
                
                <div className="w-full lg:w-3/4 flex flex-row justify-between items-center py-4">
                    <div className="w-full lg:w-1/2 flex justify-start items-center text-white">
                        <button>
                            <a>
                                <span>Menu</span>
                            </a>
                            <svg 
                                stroke="currentColor" 
                                fill="currentColor" 
                                stroke-width="0" 
                                viewBox="0 0 24 24" 
                                className="w-5 h-5 ml-2 hidden lg:inline-block" 
                                height="1em" 
                                width="1em" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                            </svg>
                        </button>
                        <button>
                            <a>
                                <span>Merchant</span>
                            </a>
                            <svg 
                                stroke="currentColor" 
                                fill="currentColor" 
                                stroke-width="0" 
                                viewBox="0 0 24 24" 
                                className="w-5 h-5 ml-2 hidden lg:inline-block" 
                                height="1em" 
                                width="1em" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                            </svg>
                        </button>
                        <button className="mx-2 flex flex-row items-center">
                            <img src="../../image/logo-icon.svg" className="w-10 h-10 mx-2"/>
                            <div className="flex flex-row items-center">
                                <a className="uppercase mx-2">Colony</a>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="transform transition-all ease-in-out text-gray-600 w-5 h-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M7 10l5 5 5-5z"></path></svg>
                            </div>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:w-1/2 justify-end">
                        <button className="flex flex-row items-center text-white">
                            <img src="../../image/user/user-01.png" className="w-10 h-10 mx-2 "/>
                            <span className="font-bold px-2">John Doe</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" aria-hidden="true" className="ml-2 -mr-1 h-5 w-5">
                                <path 
                                fill-rule="evenodd" 
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                                clip-rule="evenodd">
                                </path>
                            </svg>
                        </button>
                        <button>
                            <span>
                                <img/>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <main className="h-screen pt-4">
            <div className="flex flex-col space-y-2 lg:flex-row">
                <div className="w-full lg:w-7/12 px-8 flex flex-col">
                    {/* profile */}
                    <MerchantCard/>
                    {/* merchant menu */}
                    <div className="flex flex-col lg:flex-row justify-start lg:justify-between mt-2 items-center">
                        <MerchantMenu/>
                        <div className="w-full mt-2 lg:mt-0 lg:w-1/4 flex justify-start lg:justify-end">
                            <Category/>
                        </div>
                        
                    </div>

                    {/* card */}
                    <div className="flex flex-col mt-2 overflow-x-auto no-scrollbar">
                        <div className="flex flex-col space-y-2 no-scrollbar lg:space-y-0 mt-3 justify-center items-center lg:flex-row w-full">
                        <div className="w-full lg:w-[70%] flex flex-row justify-center items-center">
                                <div className="lg:w-[90%] w-full flex justify-center items-center bg-white rounded-lg mr-2 p-2">
                                    <input type="text" placeholder="search" className=" bg-transparent w-full"></input>
                                </div>
                                <div className="bg-[#5F59F7] p-3 flex justify-center items-center rounded-lg w-[10%]">
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
                            <div className="w-full flex flex-row justify-center px-2 items-center lg:w-[30%]">
                                <p className="w-[50%] text-white">Category :</p>
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
                                            xmlns="http://www.w3.org/2000/svg">
                                                <path fill="none" d="M0 0h24v24H0z"></path>
                                                <path d="M7 10l5 5 5-5z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white mt-2 w-full flex justify-center rounded-lg">
                        <SelectTables
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
                                />


                        </div>
                        {/* <ItemDetails/> */}

                    </div>
                    
                </div>
            <div className="w-full lg:w-5/12 pb-2 px-8 lg:px-4 flex flex-col">

                <OverviewMenu/>

            </div>


            </div>

        </main>
        </div>
        </>
    )



}

export default merchant;