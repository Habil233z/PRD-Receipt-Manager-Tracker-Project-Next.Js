import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {name, email, password} = body
        const checkUser = await prisma.users.findFirst({where: {email}})
        if (checkUser) {
            return NextResponse.json(
                {message: "User already created"},
                {status: 400}
            )
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
        const identity = {id: user?.id, name: user?.name, email: user?.email, photo_profile: user?.photo_profile}
        const token = jwt.sign(
            {id: user?.id, name: user?.name, email: user?.email, photo_profile: user?.photo_profile},
            process.env.SECRET_KEY as string, 
            {expiresIn: '2 days'})
        return NextResponse.json(
            {message: "Account created", token, identity},
            {status: 200})
    } catch (error) {
        console.log(error)
    }
}