import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === "GET"){
        
        // fetch all posts
        try {
            const data = await prisma.post.findMany({
                include: {
                    user: true,
                    Comment: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(403).json({err: 'error fetching a post'})
        }
    }
}

