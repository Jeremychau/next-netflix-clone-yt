import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function hander (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') return res.status(404).json('wrong request');

    try {
        const { movieId } = req.query;

        if( !movieId || typeof movieId !== 'string') throw new Error('Invalid ID');

        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        });

        if(!movie) throw new Error('Invalid ID');

        return res.status(200).json(movie)
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}