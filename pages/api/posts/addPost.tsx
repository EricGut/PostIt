import type { NextApiRequest, NextApiResponse } from "next";
import {getServerSession} from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === "POST"){
        const session = await getServerSession(req,res, authOptions)
        if(!session) 
            return res.status(401).json({message: 'Please sign in'})
        
        const title: String = req.body.title

        // get user
        const prismaUser = await prisma.user.findUnique({
            where: {email: session?.user?.email}
        })

        // check title
        if(title.length > 100) return res.status(403)
            .json({message: 'please write a short message'})
        if(!title.length) return res.status(403)
            .json({message: 'please do not leave this empty'})
        
        // Create post
        try {
            const result = await prisma.post.create({
                data: {
                    title,
                    userId: prismaUser.id
                }
            })
            res.status(200).json(result)
        } catch (error) {
            res.status(403).json({err: 'error making a post'})
        }
    }
}

