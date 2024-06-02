import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import React, { lazy } from "react"
const SignInForm = lazy(() => import("@/components/SignInForm"))

const page = async () => {
  const session = await getServerSession(authOptions)
  if (session) redirect("/todos")
  return (
    <div className="mt-[120px]">
      <SignInForm />
    </div>
  )
}

export default page
