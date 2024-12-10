import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { fileName, fileContent } = req.body;

        if (!fileName || !fileContent) {
            return res.status(400).json({ message: 'Invalid request. Provide fileName and fileContent.' });
        }

        const LAMBDA_ENDPOINT: string = process.env.LAMBDA_ENDPOINT || "";

        const response = await axios.post(LAMBDA_ENDPOINT, { fileName, fileContent });

        return res.status(200).json(response.data);
    } catch (error: any) {
        console.error('Error uploading file:', error.message);
        res.status(500).json({ message: 'Failed to upload file', error: error.message });
    }
}