"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type GoogleCalendarEvent = {
  summary: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
};

const CalendarPage = () => {
  const [events, setEvents] = useState<GoogleCalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  const authenticateGoogle = () => {
    router.push('/api/auth/google/start');
  };

  const fetchEvents = async (tokens: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/calendar/events?tokens=${encodeURIComponent(tokens)}`);
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      setError('Failed to load events');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams) {
      const tokens = searchParams.get('tokens');
      if (tokens) {
        fetchEvents(tokens);
      }
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-bold my-4">Google Calendar Events</h1>
      <button onClick={authenticateGoogle} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Connect Google Calendar
      </button>
      <button onClick={() => {
        const tokens = searchParams.get('tokens');
        if (tokens) {
            fetchEvents(tokens);
        }
        }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Refresh Events
    </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {events.map((event, index) => (
          <li key={index} className="mt-2">
            {event.summary} at {new Date(event.start.dateTime).toLocaleString()}
          </li>
        ))}
      </ul>

      <p>
        d
      </p>
    </div>
  );
};

export default CalendarPage;
