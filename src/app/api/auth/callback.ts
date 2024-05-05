import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default handleAuth({
  callback: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handleCallback(req, res, {
        redirectUri: 'http://localhost:3000/dashboard'
      });
    } catch (error) {
      console.error(error);
    }
  }
});