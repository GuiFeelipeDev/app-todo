import React from "react"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { ListTodo } from "lucide-react"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import LogoutButton from "./LogoutButton"

const NavBar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className="fixed top-0 mx-auto bg-slate-800 border-b-[1px] border-slate-800 w-full p-2 font-medium text-xl flex justify-center items-center">
      <div className="w-full flex justify-between items-center max-w-7xl text-white">
        <Link href={"/"} className="flex gap-1 items-center">
          <ListTodo /> AppTodo
        </Link>
        {session ? (
          <LogoutButton />
        ) : (
          <Link
            href="/sign-in"
            className={buttonVariants({
              variant: "default",
            })}
          >
            SignIn
          </Link>
        )}
      </div>
    </div>
  )
}

export default NavBar
