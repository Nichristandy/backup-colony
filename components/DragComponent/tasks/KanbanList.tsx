import React, { useEffect, useState } from "react";

import { Droppable } from "react-beautiful-dnd";
import ListItem from "./component/ListItem";
// import ListItem from "./ListItem";

type KanbanProps = {
    prefix?: any;
    elements?: any;
    data?: any;
    token?: any;
    loading?: boolean
}

const KanbanList = ({ prefix, elements, data, token, loading }: KanbanProps) => {
    const [loadingStatus, setLoadingStatus] = useState(false);

    useEffect(() => {
        setLoadingStatus(loading as boolean);
    }, [loading]);

    return (
        <div
            className={`px-5 bg-gray rounded-xl ${loading ? `opacity-60` : `opacity-100`}`}
        >
            <div className="capitalize mb-5 font-bold text-[#787B80] text-sm md:text-lg py-5 min-w-[300px]">
                {prefix}
            </div>
            <Droppable droppableId={prefix}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{ minHeight: "300px" }}
                        className="pb-20"
                    >
                        {elements?.map((item: any, index: any) => (
                            <React.Fragment
                                key={index}
                            >
                                <ListItem
                                    item={item}
                                    index={index}
                                    data={data}
                                    token={token}
                                    loading={loading}
                                />
                            </React.Fragment>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default KanbanList;
