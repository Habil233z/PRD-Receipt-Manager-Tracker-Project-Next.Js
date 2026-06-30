import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default async function register(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {name, email, password} = req.body
        const checkUser = await prisma.users.findFirst({where: {email}})
        if (checkUser) {
            return res.status(400).json({message: "User already created"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        const user = await prisma.users.findFirst({where: {email}})
        const token = jwt.sign(
            {id: user?.id, name: user?.name, email: user?.email, photo_profile: user?.photo_profile},
            process.env.SECRET_KEY as string, 
            {expiresIn: '2 days'})
        return res.status(201).json({message: "Account created", token})
    } catch (error) {
        console.log(error)
    }
}