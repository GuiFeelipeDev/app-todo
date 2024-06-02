import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import React, { lazy } from "react"

const SignUpForm = lazy(() => import("@/components/SignUpForm"))

const page = async () => {
  const session = await getServerSession(authOptions)
  if (session) redirect("/")
  return (
    <div className="mt-[80px] md:mt-[120px]">
      <SignUpForm />
    </div>
  )
}

export default page
