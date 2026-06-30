import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {email, password} = req.body

        const user = await prisma.users.findFirst({where: {email}});
        const match = user ? await bcrypt.compare(password, user.password) : false
        if (!user || !match) {
            return res.status(404).json({
                message: "User not found or password wrong"
        })}
        const identity = {id: user.id, name: user.name, email: user.email, photo_profile: user.photo_profile}
        const token = jwt.sign(
            {id:user.id, name: user.name, email: user.email, photo_profile: user.photo_profile},
            process.env.SECRET_KEY as string, 
            {expiresIn: '2 days'})
        res.status(200).json({
            message: "Success",
            token, identity
        })
    } catch (error) {
        console.log(error)
    }
}