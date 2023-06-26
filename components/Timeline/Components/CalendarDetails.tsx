import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";

import { MdCalendarToday, MdRefresh, MdWarning, MdWork } from "react-icons/md";
import Modal from "../../Modal";
import { ModalHeader } from "../../Modal/ModalComponent";

type DetailProps = {
    isOpen: boolean
    closeModal: () => void
    onSubmit: () => void
    item?: any
    loading?: boolean
}

export const CalendarDetail = ({ isOpen, closeModal, onSubmit, item, loading }: DetailProps) => {
    // console.log("item :", item)

    const dateFormat = (date: any) => {
        return moment(new Date(date)).format("DD MMMM YYYY");
    };

    const colouring = (val: any) => {
        let color = "";
        if (val == "Project") color = "#EC286F";
        if (val == "Complaint Handling") color = "#FF8859";
        if (val == "Reguler Task") color = "#38B7E3";
        if (val == "Maintenance") color = "#5E59CE";
        return color;
    };

    return (
        <React.Fragment>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                size="small"
            >
                <Fragment>
                    <ModalHeader
                        isClose={false}
                        className=""
                    >
                        <div className="w-full text-gray-700 p-2">
                            <div className="w-full flex justify-between items-center">
                                {loading ? null : <h3
                                    className={`py-1 px-2 text-sm capitalize text-white rounded`}
                                    style={{ backgroundColor: colouring(item?.workType) }}
                                >{item?.workType}</h3>}
                                {item?.workCategory?.urgency ? <MdWarning className="w-7 h-7 text-yellow-300" /> : null}
                            </div>
                            <div className={loading ? "" : "w-full mt-3 mx-4 tracking-wide"}>
                                <p className="text-lg uppercase font-bold">{loading ? <span className="text-gray-500">Loading...</span> : item?.workCode}</p>
                                {loading ? null : <p className="text-md">{item?.workName} - <span className="">{item?.workCategory?.workCategoryName}</span></p>}
                            </div>
                        </div>
                    </ModalHeader>

                    <div className="p-4 w-full text-sm flex flex-col items-center tracking-wide">
                        <div className="mb-3 w-full flex justify-between">
                            <h3 className="w-1/2 pl-6 font-bold">Created</h3>
                            <p className="w-1/2">{loading ? <span className="text-gray-500">Loading...</span> : dateFormat(item?.createdAt)}</p>
                        </div>
                        <div className="mb-3 w-full flex justify-between">
                            <h3 className="w-1/2 pl-6 font-bold">Start</h3>
                            <p className="w-1/2">{loading ? <span className="text-gray-500">Loading...</span> : dateFormat(item?.scheduleStart)}</p>
                        </div>
                        <div className="mb-3 w-full flex justify-between">
                            <h3 className="w-1/2 pl-6 font-bold">Due</h3>
                            <p className="w-1/2">{loading ? <span className="text-gray-500">Loading...</span> : dateFormat(item?.scheduleEnd)}</p>
                        </div>
                        <div className="mb-3 w-full flex justify-between">
                            <h3 className="w-1/2 pl-6 font-bold">Updated</h3>
                            <p className="w-1/2">{loading ? <span className="text-gray-500">Loading...</span> : dateFormat(item?.updatedAt)}</p>
                        </div>
                    </div>
                    <div className="border border-gray-200"></div>
                    <div className="p-4 w-full text-xs flex flex-row items-center justify-between">
                        <button
                            onClick={closeModal}
                            className={`font-bold py-1 px-2 rounded border focus:outline-none
                            ${item?.workStatus == "Closed"
                                    ? "text-green-300 bg-green-100 border-green-300"
                                    : item?.workStatus == "Overdue"
                                        ? "text-red-300 bg-red-100 border-red-300"
                                        : "text-yellow-400 bg-yellow-100 border-yellow-400"}
                        `}
                        >{loading ? "Loading..." : item?.workStatus ? item?.workStatus : "None"}</button>
                        <div className="flex items-center">
                            <MdWork className="w-5 h-5 text-gray-500" />
                            <div className="ml-2 font-bold">{item?.task?.length}</div>
                        </div>
                    </div>
                </Fragment>
            </Modal>
        </React.Fragment>
    );
};
