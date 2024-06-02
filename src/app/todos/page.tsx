import TodosView from "@/components/views/TodosView"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import React from "react"

const page = async () => {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/sign-in")

  return <TodosView session={session} />
}

export default page
