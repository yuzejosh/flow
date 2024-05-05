export type CalendarEvent = {
    id: string;
    title: string;
    start: Date;
    end: Date;
  };
  
  export const sampleEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Meeting with Team',
      start: new Date('2024-05-06T10:00:00'),
      end: new Date('2024-05-06T11:00:00'),
    },
    {
      id: '2',
      title: 'Available for 1:1',
      start: new Date('2024-05-07T12:30:00'),
      end: new Date('2024-05-07T13:30:00'),
    },
  ];
  