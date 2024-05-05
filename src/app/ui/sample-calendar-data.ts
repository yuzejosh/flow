export type CalendarEvent = {
    id: string;
    title: string;
    start: Date;
    end: Date;
  };
  
  export const sampleEvents: CalendarEvent[] = [
    {
      id: '1',
      title: '',
      start: new Date('2024-05-06T10:00:00'),
      end: new Date('2024-05-06T11:00:00'),
    },
    {
      id: '2',
      title: '',
      start: new Date('2024-05-07T12:00:00'),
      end: new Date('2024-05-07T13:00:00'),
    },
    {
      id: '2',
      title: '',
      start: new Date('2024-05-01T12:00:00'),
      end: new Date('2024-05-01T13:00:00'),
    },
    {
      id: '2',
      title: '',
      start: new Date('2024-05-14T12:00:00'),
      end: new Date('2024-05-14T13:00:00'),
    },
  ];
  