import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.query.token as string; // Ensuring the token is passed correctly
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: token });

  try {
    const calendar = google.calendar({ version: 'v3', auth });
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekEnd = new Date(now.setDate(weekStart.getDate() + 6));

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: weekStart.toISOString(),
      timeMax: weekEnd.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    res.status(200).json(response.data.items); // Make sure you are sending the correct data back
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events', error });
  }
}
