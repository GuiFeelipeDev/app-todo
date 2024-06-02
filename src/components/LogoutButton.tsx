"use client"

import React from "react"
import { Button } from "./ui/button"
import { signOut } from "next-auth/react"

const LogoutButton = () => {
  return (
    <Button
      className="bg-slate-100 text-slate-900 "
      onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
    >
      Logout
    </Button>
  )
}

export default LogoutButton
