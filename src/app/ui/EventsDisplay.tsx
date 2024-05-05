import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// Define a type for calendar events
interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime: string;
  };
}

const EventsDisplay = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      if (session?.accessToken) {  // Check that accessToken is not undefined
        setIsLoading(true);
        try {
          const res = await fetch(`/api/events?token=${encodeURIComponent(session.accessToken)}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
          }
          const data: CalendarEvent[] = await res.json();
          setEvents(data);
        } catch (err: any) {  // Catch block to handle errors properly
          setError(err.message ?? "An unknown error occurred");
        }
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [session]);

  if (error) return <div>Failed to load events: {error}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!events.length) return <div>No events found for this week.</div>;

  return (
    <ul>
      {events.map(event => (
        <li key={event.id}>{event.summary} - {new Date(event.start.dateTime).toLocaleString()}</li>
      ))}
    </ul>
  );
};

export default EventsDisplay;
