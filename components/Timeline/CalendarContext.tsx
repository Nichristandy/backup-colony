import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import moment from "moment";

type CalendarType = {
    item?: any
    setItem?: Dispatch<SetStateAction<any>>;
    open?: boolean;
    setOpen?: Dispatch<SetStateAction<boolean>>;
};

const CalendarContext = createContext<CalendarType | undefined>(undefined);

export const useCalendarContext = () => {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

const initItem = {
    title: "",
    group: undefined,
    start_time: moment().startOf("date").toDate(),
    end_time: moment().endOf("date").toDate()
};

export const CalendarProvider = ({ uiEvent, children }: any) => {
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState(initItem);

    const value = {
        item,
        setItem,
        open,
        setOpen
    };

    return (
        <CalendarContext.Provider value={value}>
            {children}
        </CalendarContext.Provider>
    );
};
