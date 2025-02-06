import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.cookies.token; // Get token from cookies
    try {
        const response = await axios.get(process.env.BACKEND_NESTJS_URL + '/challenges', {
            headers: { Authorization: `Bearer ${token}` },
        });
        res.status(200).json(response.data);
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Failed to fetch challenges' });
    }

    if (req.method === 'POST') {
        try {
            const response = await axios.post(process.env.BACKEND_NESTJS_URL + '/challenges', req.body, {
                headers: { Authorization: `Bearer ${token}` },
            });
            res.status(200).json(response.data);
        } catch (error: any) {
            res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Failed to create challenge' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}