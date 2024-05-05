export interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime: string;
  };
}

export const fetcher = async (url: string, token: string): Promise<CalendarEvent[]> => {
  const res = await fetch(`${url}?token=${encodeURIComponent(token)}`);
  const data = await res.json();
  return data.items as CalendarEvent[];
}
