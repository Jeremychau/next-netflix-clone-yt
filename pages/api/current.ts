import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method !== 'GET') return res.status(405).end();

        const result = await serverAuth(req);
        if (!result?.currentUser) throw new Error('not auth');
        return res.status(200).json(result.currentUser);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}