import moment from 'moment';
import React, { DetailedHTMLProps, Fragment, HTMLAttributes, useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { MdOutlineChatBubbleOutline, MdOutlineDescription } from 'react-icons/md';
import Teams from '../../../Task/Teams';

type Props = {
    item: any | any[]
    data?: any | any[]
    token?: any
    index?: any
    loading?: boolean
}

const ListItem = ({ item, data, token, index, loading, }: Props) => {
    const [dataTask, setDataTask] = useState<any | any[]>([]);

    const dateFormat = (date: any) => {
        return moment(new Date(date)).format("DD MMM YYYY");
    };

    useEffect(() => {
        if (data) {
            setDataTask(data);
        }
    }, [data]);

    return (
        <Fragment>
            <Draggable draggableId={"draggable-" + item.id.toString()} index={index}>
                {(provided, snapshot) => {
                    return (
                        <div
                            className={`w-full p-3 relative bg-white mb-4 grid gap-5 rounded-xl max-w-xs mx-auto`}
                            // onDoubleClick={(id) => isOpenModalDetail(item.id)}
                            ref={provided?.innerRef}
                            // @ts-ignore
                            snapshot={snapshot}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            {dataTask?.task?.length > 0
                                ? dataTask?.task
                                    ?.filter((element: any) => element?.id == item?.id)
                                    .map((e: any) => (
                                        <React.Fragment key={e?.id}>
                                            <div className="flex justify-between text-[#555555] text-sm">
                                                <div className="font-bold">{item?.taskCode}</div>

                                                <div> Due : {dateFormat(e?.times?.scheduleEnd)} </div>
                                            </div>
                                            <div className="grid grid-cols-2  gap-1">
                                                {e?.detail?.tags?.length > 0
                                                    ? e?.detail?.tags?.map((i: any, idx: any) => (
                                                        <div
                                                            className="flex rounded-xl py-1 px-3 font-bold text-sm"
                                                            style={{
                                                                backgroundColor: i?.taskTagColor,
                                                                color: i?.taskTagTextColor,
                                                            }}
                                                            key={idx}
                                                        >
                                                            <span className="flex mx-auto">
                                                                {i?.taskTagName}
                                                            </span>
                                                        </div>
                                                    ))
                                                    : null}
                                            </div>
                                            <p className="font-bold"> {item?.content} </p>
                                            <p className="text-[#555555] text-sm flex flex-col">
                                                {e?.taskDescription}
                                                {/* {isReadMore
                                                    ? e?.taskDescription?.slice(0, 100)
                                                    : e?.taskDescription}
                                                {e?.taskDescription?.length > 100 && (
                                                    <>
                                                        {isReadMore ? "..." : ""}
                                                        {isReadMore ? (
                                                            <span
                                                                className="text-green-300 font-medium py-1 cursor-pointer"
                                                                onClick={toggleReadMore}
                                                            >
                                                                Read more
                                                            </span>
                                                        ) : (
                                                            <span
                                                                className="text-green-300 font-medium py-1 cursor-pointer"
                                                                onClick={toggleReadMore}
                                                            >
                                                                Read less
                                                            </span>
                                                        )}
                                                    </>
                                                )} */}
                                            </p>
                                        </React.Fragment>
                                    ))
                                : null}

                            <div className="flex w-full gap-3">
                                <button
                                    // onClick={(id) => handleAttachment(item?.id)}
                                    className="flex flex-row text-[#C4C4C4] hover:text-green-300"
                                >
                                    <MdOutlineDescription className="mr-2 w-5 h-5" />
                                    <p>{item?.fileCount}</p>
                                </button>

                                <button
                                    // onClick={(id) => handleSubtask(item?.id)}
                                    className="flex flex-row text-[#C4C4C4] hover:text-green-300"
                                >
                                    {/* <BsClipboardCheck className="mr-2 w-5 h-5" /> */}
                                    <p>{item?.subTaskCount}</p>
                                </button>
                            </div>

                            <div className="w-full flex justify-between ">
                                <div className="flex flex-row">
                                    <Teams items={item?.workers} />
                                </div>
                                <button 
                                    // onClick={() => handleComment(item?.id)}
                                >
                                    <div className="flex flex-row text-[#C4C4C4] hover:text-green-300">
                                        <MdOutlineChatBubbleOutline className="mr-2 w-6 h-6" />
                                        <p>{item?.commentCount}</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    );
                }}
            </Draggable>
        </Fragment>
    )
}

export default ListItem