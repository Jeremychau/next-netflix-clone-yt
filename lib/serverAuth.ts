import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "@/lib/prismadb";

const serverAuth = async(req:NextApiRequest) => {
    try {
        const session = await getSession({req});
        if (!session?.user?.email) throw new Error('Not signed In')

        const currentUser = await prismadb.user.findUnique({ where: { email: session.user.email } })
        if (!currentUser) throw new Error("Not Sign In");

        return { currentUser };
    } catch (error) {
        console.log(error);
    }
}

export default serverAuth;