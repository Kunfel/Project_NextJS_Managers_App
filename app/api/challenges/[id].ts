import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.cookies.token;
    const { id } = req.query;
    if (req.method === 'PUT') {
        try {
            const response = await axios.put(process.env.BACKEND_NESTJS_URL + `/challenges/${id}`, req.body, {
                headers: { Authorization: `Bearer ${token}` },
            });
            res.status(200).json(response.data);
        } catch (error: any) {
            res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Failed to update challenge' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }

    if (req.method === 'DELETE') {
        try {
            const response = await axios.delete(process.env.BACKEND_NESTJS_URL + `/challenges/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            res.status(200).json(response.data);
        } catch (error: any) {
            res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Failed to delete challenge' });
        }
    }
}

