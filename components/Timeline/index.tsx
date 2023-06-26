import React from "react";

import CusCalendar from "./Calendar";
import { CalendarProvider } from "./CalendarContext";

export const Calendar = (props: any) => {
    return (
        <CalendarProvider>
            <CusCalendar {...props} />
        </CalendarProvider>
    );
};
