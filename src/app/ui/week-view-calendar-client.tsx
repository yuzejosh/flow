"use client";

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  add,
  eachDayOfInterval,
  format,
  differenceInMinutes,
  startOfHour,
  endOfHour,
  startOfWeek,
} from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { CalendarEvent, sampleEvents } from './sample-calendar-data';

type CalendarClientProps = {
  initialDate: Date;
};

const hours = Array.from({ length: 24 }, (_, i) => i);

export default function WeekViewCalendarClient({ initialDate }: CalendarClientProps) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: add(weekStart, { days: 6 }),
  });

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const handlePreviousWeek = () => {
    setCurrentDate((prev) => add(prev, { days: -7 }));
  };

  const handleNextWeek = () => {
    setCurrentDate((prev) => add(prev, { days: 7 }));
  };

  const handleResync = () => {
    setCurrentDate(new Date());
  };

  const getEventsForHour = (day: Date, hour: number): CalendarEvent[] => {
    return sampleEvents.filter((event) => {
      const start = new Date(event.start);
      const end = new Date(event.end);

      const hourStart = startOfHour(add(day, { hours: hour }));
      const hourEnd = endOfHour(hourStart);
      return (
        (start < hourEnd && end > hourStart) && 
        start.toDateString() === day.toDateString()
      );
    });
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center bg-[#D9D9D9B2] p-5 rounded
                      w-2/5">
        <div className="mb-4 flex justify-between w-full ">
          <DatePicker
            selected={currentDate}
            onChange={(date: Date) => setCurrentDate(date)}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="yyyy/MM/dd"
            className="p-2 border rounded"
          />
          <button onClick={handleResync} className="bg-gray-300 p-2 ml-2">
            Resync to Today
          </button>
        </div>
        <div className="flex justify-between w-full mb-4">
          <button onClick={handlePreviousWeek} className="bg-gray-300 p-2">
            Previous Week
          </button>
          <button onClick={handleNextWeek} className="bg-gray-300 p-2">
            Next Week
          </button>
        </div>
        <div className="grid grid-cols-8 gap-1 w-full">
          <div className="bg-gray-200 p-2">Time/Day</div>
          {weekDays.map((day) => (
            <div key={day.toString()} className="bg-gray-200 p-2">
              {format(day, 'eee, MMM d')}
            </div>
          ))}
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div className="bg-gray-100 p-2">{hour}:00</div>
              {weekDays.map((day) => (
                <div key={`${day.toString()}-${hour}`} className="border relative">
                  {getEventsForHour(day, hour).map((event) => {
                    const minutes = differenceInMinutes(event.end, event.start);
                    const height = (minutes / 60) * 100;
                    return (
                      <div
                        key={event.id}
                        className="bg-blue-200 text-xs rounded p-1 absolute"
                        style={{
                          top: `${(event.start.getMinutes() / 60) * 100}%`,
                          height: `${height}%`,
                          width: "90%",
                        }}
                      >
                        {event.title}
                      </div>
                    );
                  })}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="w-2/5">
      {selectedEvent && (
        <MeetingAgenda
          title={selectedEvent.title}
          time={format(selectedEvent.start, 'p')}
          duration={`${differenceInMinutes(selectedEvent.end, selectedEvent.start)} minutes`}
          attendees="" // You'll need to handle attendees etc. in your data
          description="" // Add more details as needed
          location=""
          notes=""
          actionItems={[]} // Add any relevant items
        />
      )}
      </div>
    </div>
  );
}
