"use client"
import React from "react"
import { Button, buttonVariants } from "../ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const HomeView = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="  w-full  flex pt-[120px] md:pt-[200px] flex-col items-center">
        <section className="w-full max-w-7xl flex flex-col items-center md:items-start text-center md:text-start text-zinc-100 justify-center">
          <h1 className="text-4xl font-bold">Bem vindo ao APP-TODO</h1>
          <p>A melhor solução para organizar suas tarefas!</p>
          <Link
            className={cn(
              buttonVariants({
                variant: "default",
                className: "bg-slate-100 text-slate-800 mt-5 ",
              })
            )}
            href={"/sign-up"}
          >
            Crie uma Conta!
          </Link>
        </section>
        <div className="max-w-7xl w-full flex mt-12 items-center flex-col">
          <h2 className="text-zinc-100 text-2xl mb-4">
            Começe a usar agora. É grátis!
          </h2>
          <Link className={buttonVariants()} href={"/todos"}>
            Acessar minhas tarefas!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomeView
