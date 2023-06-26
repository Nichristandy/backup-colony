import React, {useEffect} from 'react'
import LineCharts from '../Chart/LineCharts'
import { useState, useMemo } from 'react';
import { DivisionProps } from '../tables/components/taskData';
import { ColumnDef } from '@tanstack/react-table';
import DropdownDefault from '../Dropdown/DropdownDefault';
import { MdMoreHoriz } from 'react-icons/md';
import Teams from '../Task/Teams';
import CardTables from '../tables/layouts/CardTables';
import { itemData, Items } from '../tables/components/itemData';
import ToggleSwitch from './button/ToggleSwitch';
import SelectTables from '../tables/layouts/SelectTables';

const Overview = () => {


    const [loading, setLoading] = useState(true);

    // data-table
    const [dataTable, setDataTable] = useState<Items[]>([]);
    const [isSelectedRow, setIsSelectedRow] = useState({});
    const [pages, setPages] = useState(10);
    const [limit, setLimit] = useState(1);
    const [pageCount, setPageCount] = useState(10);
    const [total, setTotal] = useState(10)

    useEffect(() => {
        setDataTable(itemData(100))
      }, [itemData])

    const columns = useMemo<ColumnDef<Items, any>[]>(() => [
        {
            accessorKey: "transId",
            header: props => {
                return (
                  <div className='uppercase'>Transaction ID</div>
                )
              },enableColumnFilter: false,
        },
        {
            accessorKey: "transName",
            header: props => {
                return (
                  <div className='uppercase'>Transaction name</div>
                )
              },enableColumnFilter: false,
        },
        {
            accessorKey: "transDate",
            header: props => {
                return (
                  <div className='uppercase'>Transaction date</div>
                )
              },enableColumnFilter: false,
        },
    ], []);



  return (
    <div>
        <div className="flex mt-2 overflow-x-hidden p-2 flex-col w-full bg-white rounded-lg">
                    <h1 className="font-bold mb-2 text-left lg:text-xl">Revenue Streams By Last 12 Months</h1>
                    {/* chart */}
                    <LineCharts/>
                    {/* transaction table */}
                    <div className="mt-2 w-full flex p-2 flex-col">
                        <h1 className="font-bold">Recent Transaction</h1>
                        <div className="w-full flex flex-col overflow-auto gap-2.5 lg:gap-6">
                            {/* table */}
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

                    </div>

                </div>
    </div>
  )
}

export default Overview