// components/WeekViewCalendar.tsx

import { add, eachDayOfInterval, startOfWeek } from 'date-fns';
import WeekViewCalendarClient from './week-view-calendar-client';

export default function WeekViewCalendar() {
  const currentDate = new Date();
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: add(weekStart, { days: 6 }),
  });

  return <WeekViewCalendarClient initialDate={currentDate} />;
}
