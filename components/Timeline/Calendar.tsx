import React, { useState, useEffect } from "react";
// import { ICalendar, IItem, IGroup } from "./types";

import Timeline, {
    TimelineHeaders,
    SidebarHeader,
    DateHeader,
    TimelineKeys,
    TodayMarker,
    TimelineMarkers,
    CursorMarker,
    CustomMarker,
    CustomHeader,
    TodayMarkerProps
} from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import moment from "moment";

// import _ from "lodash";
import { useCalendarContext } from "./CalendarContext";
import DropdownSelect from "../Dropdown/DropdownSelect";

const optSelected = [
    { value: "month", label: "Month" },
    { value: "week", label: "Week" },
];

const stylesSelect = {
    indicatorsContainer: (provided: any) => ({
        ...provided,
        padding: 0,
        minHeight: 0
    }),
    indicatorSeparator: (provided: any) => ({
        ...provided,
        display: 'none'
    }),
    dropdownIndicator: (provided: any) => {
        return ({
            ...provided,
            color: '#7B8C9E',
            padding: 0
        })
    },
    clearIndicator: (provided: any) => {
        return ({
            ...provided,
            color: '#7B8C9E',
            padding: 0
        })
    },
    singleValue: (provided: any) => {
        return ({
            ...provided,
            color: '#5F59F7',
        })
    },
    control: (provided: any, state: any) => {
        return ({
            ...provided,
            background: "",
            padding: '0px',
            borderRadius: "0px",
            borderColor: state.isFocused ? "#5F59F7" : "#E2E8F0",
            color: "#5F59F7",
            "&:hover": {
                color: state.isFocused ? "#E2E8F0" : "#5F59F7",
                borderColor: state.isFocused ? "#E2E8F0" : "#5F59F7"
            },
            minHeight: 29,
        })
    },
    menuList: (provided: any) => (provided)
};

const CusCalendar = ({
    groups,
    items,
    onItemMove,
    onCanvasClick,
    onItemContextMenu,
    onItemDoubleClick,
    onItemSelect,
    ...props
}: any) => {
    const { setOpen, item, setItem } = useCalendarContext();
    const [isSelectedFilter, setIsSelectedFilter] = useState(optSelected[1]);

    const itemRender = ({
        item,
        timelineContext,
        itemContext,
        getItemProps
    }: any) => {
        console.log("content item :", item)
        const backgroundColor = itemContext.selected ? itemContext.dragging
            ? "#5F59F7"
            : "#5F59F7"
            : "white";
        // : item?.color;
        const color = itemContext.selected ? itemContext.dragging
            ? "white"
            : "white"
            : "gray";

        return (
            <div
                {...getItemProps({
                    style: {
                        backgroundColor,
                        color,
                        // border: "0px solid " + item?.color,
                        border: "1px solid #EFF4FB",
                        borderRadius: 8,
                        zIndex: 30,
                        overflow: "hidden",
                    },
                    onMouseDown: () => {
                        onItemSelect(itemContext.id);
                    }
                })}
                className="shadow-card transition-all duration-300 ease-in-out"
            >
                <div
                    style={{
                        height: itemContext.dimensions.height,
                        overflow: "hidden",
                        paddingLeft: 20,
                        // textOverflow: "ellipsis",
                        // whiteSpace: "nowrap",
                        position: "relative",
                        width: "100%",
                        padding: "2px 10px 2px 14px"
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: '0px',
                            left: '0px',
                            borderLeft: "8px solid #5F59F7",
                            height: "100%"
                        }}></div>
                    <div className="w-full h-full flex items-start gap-4 justify-between">
                        <div className="w-full h-full max-w-max flex flex-col justify-center leading-normal">
                            <div className="font-semibold capitalize">{item.workType}</div>
                            <div>{item.workName}</div>
                        </div>
                        <div className="w-full h-full max-w-max flex flex-col justify-center items-end leading-normal">
                            <div className="">Schedules</div>
                            <div className="">
                                {moment(item.start_time).format("DD/MM")} -{" "}
                                {moment(item.end_time).format("DD/MM")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const onBoundsChange = (canvasTimeStart: any, canvasTimeEnd: any) => {
        // console.log(moment(canvasTimeStart).toDate());
        // console.log(moment(canvasTimeEnd).toDate());
    };

    const canvasClickHandler = (groupId: any, time: any, e: any) => {
        onCanvasClick(groupId, time, e);
    };

    const moveItemHandler = (itemId: any, dragTime: any, newGroupOrder: any) => {
        // console.log(85, itemId);
        // console.log(86, newGroupOrder);

        onItemMove(newGroupOrder, dragTime, itemId);
    };

    const groupRenderer = ({ group }: any) => {
        // console.log(100, group)
        return (
            <div className="w-full h-full flex items-center py-2 px-2 my-auto">
                {/* <span style={{
                    height: 20,
                    border: "solid 2px " + group.color,
                }}></span> */}
                <span className="text-sm ml-1">{group.title}</span>
            </div>
        )
    };

    const todayCustomMarker = ({ date }: TodayMarkerProps) => {
        return (
            <div style={{ backgroundColor: "red", width: "4px" }}></div>
        );
    };

    const sidebarContent = (info: any) => {
        console.log("content info :", info)
    }

    return (
        <React.Fragment>
            <Timeline
                groups={groups}
                items={items}
                itemHeightRatio={0.6}
                itemRenderer={itemRender} //customer render Item
                canMove={false} // item can move around
                canResize={false} // Item can not resize
                stackItems={true} // Item stack over each other in a group
                defaultTimeStart={moment().startOf("isoWeek").startOf("day").add(-1, "day").toDate()} // start of calendar is start of current week
                defaultTimeEnd={moment().endOf("isoWeek").add(20, "day").toDate()} // end of calendar is end of current week
                dragSnap={1000 * 60 * 60 * 24} // span moved item to start to date
                minZoom={1000 * 60 * 60 * 24 * 7} // min size of calendar is week
                maxZoom={1000 * 60 * 60 * 24 * 7 * 4} // max size of calendar is week
                // onCanvasClick={canvasClickHandler} // click on calendar handler
                // onItemContextMenu={false} on item right click -> edit item
                onItemMove={moveItemHandler} // move item handler
                onBoundsChange={onBoundsChange} // use for render more data when time on calendar change
                lineHeight={100} // height of each group
                sidebarWidth={300}
                groupRenderer={groupRenderer}
                onItemDoubleClick={onItemDoubleClick}
                className="shadow-card"
            >
                <TimelineHeaders
                    className="rounded-t-xl shadow-card tracking-wide"
                    style={{
                        backgroundColor: "#F5F9FD",
                        color: ""
                    }}
                >
                    <SidebarHeader>
                        {({ getRootProps }) => {
                            return (
                                <div
                                    {...getRootProps({
                                        style: {
                                            display: "flex-col",
                                            placeItems: "flex-start",
                                            color: "#495057",
                                            backgroundColor: "#F5F9FD",
                                        }
                                    })}
                                    className="flex flex-col items-start tracking-wider"
                                >
                                    <div className="w-full py-1 px-2 shadow-1">
                                        <DropdownSelect
                                            customStyles={stylesSelect}
                                            value={isSelectedFilter}
                                            onChange={setIsSelectedFilter}
                                            error=""
                                            className='text-xs font-normal text-gray-5 w-full lg:w-2/10'
                                            classNamePrefix=""
                                            formatOptionLabel=""
                                            instanceId='1'
                                            isDisabled={false}
                                            isMulti={false}
                                            placeholder='Filters...'
                                            options={optSelected}
                                            icon=''
                                        />
                                    </div>
                                    <div className='flex justify-center items-center py-3 text-xs font-bold px-2'>
                                        List of projects
                                    </div>
                                </div>
                            );
                        }}
                    </SidebarHeader>
                    {isSelectedFilter?.value == "month" ?
                        <CustomHeader height={40} headerData={{ someData: 'data' }} unit="month">
                            {({
                                headerContext: { intervals },
                                getRootProps,
                                getIntervalProps,
                                showPeriod,
                                data,
                            }: any) => {
                                return (
                                    <div {...getRootProps()}>
                                        {intervals.map((interval: any) => {
                                            const intervalStyle = {
                                                lineHeight: '30px',
                                                textAlign: 'center',
                                                borderLeft: '1px solid #CED4DA',
                                                borderBottom: '1px solid #CED4DA',
                                                cursor: 'pointer',
                                                // backgroundColor: 'Turquoise',
                                                color: '#333',
                                                padding: "3px"
                                            }
                                            return (
                                                <div
                                                    onClick={() => {
                                                        showPeriod(interval.startTime, interval.endTime)
                                                    }}
                                                    {...getIntervalProps({
                                                        interval,
                                                        style: intervalStyle
                                                    })}
                                                >
                                                    <div className="sticky text-xs">
                                                        <div className="flex flex-col py-2">
                                                            <span>{interval.startTime.format('MMMM, YYYY')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            }}
                        </CustomHeader> : null
                    }
                    {isSelectedFilter?.value == "week" ?
                        <CustomHeader height={40} headerData={{ someData: 'data' }} unit="week">
                            {({
                                headerContext: { intervals },
                                getRootProps,
                                getIntervalProps,
                                showPeriod,
                                data,
                            }: any) => {
                                return (
                                    <div {...getRootProps()}>
                                        {intervals.map((interval: any) => {
                                            const intervalStyle = {
                                                lineHeight: '30px',
                                                textAlign: 'center',
                                                borderLeft: '1px solid #CED4DA',
                                                borderBottom: '1px solid #CED4DA',
                                                cursor: 'pointer',
                                                // backgroundColor: 'Turquoise',
                                                color: '#333',
                                                padding: "3px"
                                            }
                                            return (
                                                <div
                                                    onClick={() => {
                                                        showPeriod(interval.startTime, interval.endTime)
                                                    }}
                                                    {...getIntervalProps({
                                                        interval,
                                                        style: intervalStyle
                                                    })}
                                                >
                                                    <div className="sticky text-xs">
                                                        <div className="flex flex-col py-2">
                                                            <span>{interval.startTime.format('MMMM, Do')} Week</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            }}
                        </CustomHeader> : null
                    }
                    <CustomHeader height={40} headerData={{ someData: 'data' }} unit="day">
                        {({
                            headerContext: { intervals },
                            getRootProps,
                            getIntervalProps,
                            showPeriod,
                            data,
                        }: any) => {
                            return (
                                <div {...getRootProps()}>
                                    {intervals.map((interval: any) => {
                                        const intervalStyle = {
                                            lineHeight: '30px',
                                            textAlign: 'center',
                                            borderLeft: '1px solid #CED4DA',
                                            cursor: 'pointer',
                                            // backgroundColor: 'Turquoise',
                                            color: '#333',
                                            padding: "3px"
                                        }
                                        return (
                                            <div
                                                onClick={() => {
                                                    showPeriod(interval.startTime, interval.endTime)
                                                }}
                                                {...getIntervalProps({
                                                    interval,
                                                    style: intervalStyle
                                                })}
                                            >
                                                <div className="sticky text-xs">
                                                    <div className="flex flex-col">
                                                        <span>{interval.startTime.format('ddd')}</span>
                                                        <span>{interval.startTime.format('DD')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }}
                    </CustomHeader>
                </TimelineHeaders>
                {/* <TodayMarker>
                    {({ date, styles }: Readonly<TodayMarkerProps>) => (
                        <div style={{ ...styles, backgroundColor: "red", width: '4px' }} />
                    )}
                </TodayMarker> */}
                {/* <TodayMarker>{todayCustomMarker}</TodayMarker> */}

                <CursorMarker>
                    {({ styles, date }) =>
                        <div style={{ ...styles, backgroundColor: "#5F59F7" }} />
                    }
                </CursorMarker>
            </Timeline>
        </React.Fragment>
    );
};

export default CusCalendar;
