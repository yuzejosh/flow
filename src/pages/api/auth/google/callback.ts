// pages/api/auth/google/callback.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { code } = req.query;
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`
    );

    const { tokens } = await oauth2Client.getToken(code as string);

    res.redirect(`/your-frontend-route?tokens=${encodeURIComponent(JSON.stringify(tokens))}`);
  } catch (error) {
    console.error('Failed to handle the OAuth2 callback', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
