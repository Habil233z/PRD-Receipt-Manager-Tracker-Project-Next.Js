import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {email, password} = body

        const user = await prisma.users.findFirst({where: {email}});
        const match = user ? await bcrypt.compare(password, user.password) : false
        if (!user || !match) {
            return NextResponse.json(
                {message: "User didnt exist or password wrong"},
                {status: 400}
        )}
        const identity = {id: user.id, name: user.name, email: user.email, photo_profile: user.photo_profile}
        const token = jwt.sign(
            {id:user.id, name: user.name, email: user.email, photo_profile: user.photo_profile},
            process.env.SECRET_KEY as string, 
            {expiresIn: '2 days'})
        return NextResponse.json(
            {message: "login successfull", token, identity},
            {status: 200}
        )
    } catch (error) {
        console.log(error)
    }
}