import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const response = await axios.post(process.env.BACKEND_URL + '/manager/signin', req.body);
            res.status(200).json(response.data);
        } catch (error: any) {
            res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'Signin failed' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}