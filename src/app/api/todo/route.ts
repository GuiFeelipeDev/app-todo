import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: Request) => {
  try {
    const { title, userId } = await req.json()

    if (!title)
      return NextResponse.json(
        { msg: "O conteúdo não pode ser vazio!" },
        { status: 422 }
      )

    if (!userId)
      return NextResponse.json(
        { msg: "Usuário não pode ser vazio!" },
        { status: 422 }
      )

    const userExists = await db.user.findUnique({
      where: { id: userId },
    })

    if (!userExists)
      return NextResponse.json(
        { msg: "Sessão de usuário inválida!" },
        { status: 401 }
      )

    await db.todo.create({
      data: {
        title,
        isCompleted: false,
        userId,
      },
    })

    return NextResponse.json(
      { msg: "Tarefa adicionada com sucesso" },
      { status: 201 }
    )
  } catch (err) {
    return NextResponse.json(
      { msg: "Erro interno do Servidor" },
      { status: 500 }
    )
  }
}

export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get("id")

  if (!userId)
    return NextResponse.json({ msg: "Url inválida!" }, { status: 404 })

  try {
    const todos = await db.todo.findMany({
      where: { userId: parseInt(userId) },
      orderBy: {
        createdAt: "desc",
      },
    })

    const newTodos = todos.map((item) => {
      const { userId, ...rest } = item
      return rest
    })

    return NextResponse.json(newTodos, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { msg: "Erro interno do Servidor" },
      { status: 500 }
    )
  }
}

export const PATCH = async (req: NextRequest) => {
  const todoId = req.nextUrl.searchParams.get("id")

  if (!todoId)
    return NextResponse.json({ msg: "Url inválida!" }, { status: 404 })

  try {
    const { userId } = await req.json()

    const userExists = await db.user.findUnique({
      where: { id: parseInt(userId) },
    })

    if (!userExists)
      return NextResponse.json(
        { msg: "Sessão de usuário inválida!" },
        { status: 401 }
      )

    const taskExists = await db.todo.findUnique({
      where: { id: parseInt(todoId) },
    })

    if (!taskExists)
      return NextResponse.json({ msg: "Tarefa inválida!" }, { status: 404 })

    await db.todo.update({
      where: { id: parseInt(todoId) },
      data: { isCompleted: !taskExists.isCompleted },
    })

    return NextResponse.json(
      { msg: "Tarefa atualizada com sucesso!" },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { msg: "Erro interno do Servidor" },
      { status: 500 }
    )
  }
}

export const DELETE = async (req: NextRequest) => {
  const todoId = req.nextUrl.searchParams.get("id")

  if (!todoId)
    return NextResponse.json({ msg: "Url inválida!" }, { status: 404 })
  try {
    const taskExists = await db.todo.findUnique({
      where: { id: parseInt(todoId) },
    })

    if (!taskExists)
      return NextResponse.json({ msg: "Tarefa inválida!" }, { status: 404 })

    await db.todo.delete({
      where: { id: taskExists.id },
    })

    return NextResponse.json(
      { msg: "Tarefa excluida com Sucesso!" },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { msg: "Erro interno do Servidor" },
      { status: 500 }
    )
  }
}
