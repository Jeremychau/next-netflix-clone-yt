import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'DELETE' && req.method !== 'POST') return res.status(404).json('wrong request');

        let updatedResult;
        // const { currentUser }: any = await serverAuth(req);
        const { movieId, currentUser } = req.body;
        const existingMovie = await prismadb.movie.findUnique({ where: {id: movieId} })
        if(!existingMovie) throw Error('Invalud ID')

        if (req.method === 'POST') {
            updatedResult = await prismadb.user.update({where: { email: currentUser.email || '' },
                data: { favoriteIds: { push: movieId} }
            })
        }

        if(req.method === 'DELETE') {
            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);
            updatedResult = await prismadb.user.update({
                where: { email: currentUser.email || '' },
                data: {
                    favoriteIds: updatedFavoriteIds
                }
            })
        }

        return res.status(200).json(updatedResult);
    } catch (error) {
        console.log(error);
        return res.status(400).end()
    }
}