import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import client from '../../../app/lib/googleClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tokens } = req.query;
  if (!tokens) {
    return res.status(400).json({ error: 'Missing tokens' });
  }

  try {
    client.setCredentials(JSON.parse(tokens as string));
    const calendar = google.calendar({ version: 'v3', auth: client });

    const { data } = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    res.status(200).json(data.items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch calendar events', details: error });
  }
}
