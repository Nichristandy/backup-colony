import React, { useEffect, useMemo, useState } from 'react'
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd';
import KanbanList from './KanbanList';

type Props = {
    item?: any | any[],
    token?: any;
    taskData?: any | any[];
    loading?: boolean
}

type ElementProps = {
    id: number | string | any;
    status: string | any;
    index: any;
}

const lists = ["To Do", "On Progress", "Resolved", "Done"];

const Kanban = ({ item, token, loading }: Props) => {
    const newData = useMemo(() => item, [item])
    const [items, setItems] = useState<any | any[]>([]);
    const [elementRemoved, setElementRemoved] = useState<any | any[]>();
    const [movedTask, setMovedTask] = useState<any | any[]>()

    const getElement = (prefix: any, item: any) => {
        let items: any[] = [];
        if (item?.task?.length == 0) return;
        item?.task?.filter((x: any) => x?.taskStatus === prefix).map((e: any) => {
            items.push({
                id: e?.id,
                workName: item?.workName,
                prefix: e?.taskStatus,
                content: e?.taskName,
                description: e?.description,
                member: item?.member,
                executionStart: item?.executionStart,
                executionEnd: item?.executionEnd,
                scheduleStart: item?.scheduleStart,
                scheduleEnd: item?.scheduleEnd,
                workCategory: item?.workCategory?.workCategoryName,
                workers: e?.detail?.workers,
                commentCount: e?.detail?.discussions?.length,
                subTaskCount: e?.detail?.subTask?.length,
                fileCount: e?.detail?.files?.length,
                times: e?.times,
                taskRequestStatus: e?.taskRequestStatus
            })
        });
        console.log(items, 'element')
        return items;
    };

    const generateElement = lists.reduce((previous, prefix) => ({
        ...previous,
        [prefix]: getElement(prefix, newData),
    }), {});

    useEffect(() => {
        setItems(generateElement as any);
    }, [newData]);

    console.log(newData, 'data')

    const removeFromList = (list: any, index: any) => {
        const result = Array.from(list);
        const [removed] = result.splice(index, 1);
        // const [removed] = result.find((item, idx) => idx == index);
        return [removed, result];
    };

    const addToList = (list: any, index: any, element: any) => {
        const result = Array.from(list);
        result.splice(index, 0, element);
        return result;
    };

    const onDragEnd = async (result: any) => {
        if (!result.destination) return;
        const listCopy = { ...items };

        const sourceList = listCopy[result.source.droppableId];
        let [removedElement, newSourceList] = removeFromList(sourceList, result.source.index);
        listCopy[result.source.droppableId] = newSourceList;
        const destinationList = listCopy[result.destination?.droppableId || 0];
        listCopy[result.destination.droppableId] = addToList(destinationList, result.destination?.index || 0, removedElement);

        setElementRemoved(removedElement);
        setItems(listCopy);
        resetServerContext();
        setMovedTask({
            // @ts-ignore
            id: removedElement?.id,
            status: result?.destination?.droppableId,
            index: result?.destination?.index,
        });


        // console.log(11, listCopy);
        // console.log(11, item?.id, "id work");
        // console.log(12, sourceList);
        // console.log(13, result?.destination?.droppableId);
        // console.log(14, removedElement);
        // console.log(15, destinationList);
        // console.log(166, result);
        // console.log(100, item);

        // dispatch(getWork(token, query?.id));
        // openModalConfirm();
        // console.log(removedElement?.prefix, "=", result?.destination?.droppableId);
    };
    
    console.log({ elementRemoved, movedTask }, 'removed')

    const onMove = async () => {
        // try {
        //     const config = {
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${token}`,
        //         },
        //     };
        //     let items = {
        //         status: movedTask?.status,
        //         index: movedTask?.index,
        //     };

        //     const res = await axios.patch(
        //         `task/changeStatus/${movedTask?.id}`,
        //         items,
        //         config
        //     );
        //     let { data, status } = res;
        //     if (status == 200 || status == 201) {
        //         toast.success("Task Moved!");
        //     }
        // } catch (error) {
        //     let { data, status } = error?.response;
        //     toast.error(data?.message);
        // } finally {
        //     await dispatch(getWork(token, query?.id));
        //     closeMOdalConfirm();
        // }
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="w-full grid col-span-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {lists.map((listKey) => {
                    return (
                        <KanbanList
                            key={listKey?.toString()}
                            elements={items[listKey]}
                            prefix={listKey}
                            data={item}
                            token={token}
                            loading={loading}
                        />
                    );
                })}

                {/* Confirm move modal */}
                {/* <AlertModal
                    isOpen={isShow}
                    closeModal={() => closeMOdalConfirm()}
                    title="Move Task"
                    content="Are you sure want to move this task ?"
                    buttonText="Yes, move it!"
                    variant="primary"
                    sizes="max-w-sm"
                    onSubmit={onMove}
                /> */}
            </div>
        </DragDropContext>
    )
}

export default Kanban