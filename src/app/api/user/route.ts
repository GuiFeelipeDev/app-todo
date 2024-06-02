import { db } from "@/lib/db"
import { hash } from "bcrypt"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    const { name, email, password, favorite_framework, terms } = body

    // Checking if email already exists
    const existingMail = await db.user.findUnique({
      where: { email: email },
    })
    if (existingMail)
      return NextResponse.json({ msg: "O email já existe!" }, { status: 409 })

    //Checking if any field is empty
    const bodyKeys = Object.keys(body)
    for (let i = 0; i < bodyKeys.length; i++) {
      if (!body[bodyKeys[i]])
        return NextResponse.json(
          {
            msg: `Todos os campos devem ser preenchidos!`,
            fieldError: bodyKeys[i],
          },
          { status: 422 }
        )
    }

    //Create new user
    const hashedPass = await hash(password, 8)
    await db.user.create({
      data: {
        ...body,
        password: hashedPass,
      },
    })

    return NextResponse.json(
      { msg: `Conta criada com sucesso!` },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("id")

  if (!userId) return NextResponse.json("InvalidUrl", { status: 404 })

  try {
    const userExists = await db.user.findUnique({
      where: { id: parseInt(userId) },
    })

    if (!userExists)
      return NextResponse.json("User not found!", { status: 404 })

    const userReturn = {
      name: userExists.name,
      email: userExists.email,
      favorite_framework: userExists.favorite_framework,
    }

    return NextResponse.json(userReturn, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
