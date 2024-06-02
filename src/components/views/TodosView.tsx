"use client"

import React from "react"
import { Card } from "../ui/card"
import Task from "../Task"
import { Session } from "next-auth"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { useToast } from "../ui/use-toast"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Todo } from "@prisma/client"
import api from "@/services/api"
import { Skeleton } from "../ui/skeleton"

interface TodosViewProps {
  session: Session
}

interface AddTodo {
  title: string
}

const TodosView = ({ session }: TodosViewProps) => {
  const { register, handleSubmit, resetField } = useForm<AddTodo>()

  const { toast } = useToast()

  const queryClient = useQueryClient()

  const allTodos = useQuery<Todo[]>({
    queryKey: ["todosQuery"],
    queryFn: async () =>
      api.get("/api/todo/?id=" + session.user.id).then((res) => res.data),
    enabled: !!session,
  })

  const postTodo = useMutation({
    mutationFn: async (data: { title: string; userId: number }) =>
      await api.post("/api/todo/", data),
    onError: () =>
      toast({
        variant: "destructive",
        title: "Falha ao adicionar Tarefa, tente novamente!",
      }),
    onSuccess: () => {
      toast({ title: "Tarefa adicionada com sucesso!" })
      queryClient.invalidateQueries({ queryKey: ["todosQuery"] })
      resetField("title")
    },
  })

  const onSubmit = (data: AddTodo) => {
    if (!data.title) {
      toast({
        variant: "destructive",
        title: "A tarefa não pode ser vazia.",
      })
      return
    }

    if (!session.user.id) return

    postTodo.mutate({
      title: data.title,
      userId: parseInt(session.user.id),
    })
  }

  const patchTodo = useMutation({
    mutationFn: async (id: string) =>
      await api.patch("/api/todo/?id=" + id, { userId: session.user.id }),
    onError: () =>
      toast({
        variant: "destructive",
        title: "Falha ao atualizar tarefa, tente novamente!",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todosQuery"] })
      toast({ title: "Tarefa atualizada com sucesso!" })
    },
  })

  const handlePatchTodo = (id: string) => {
    patchTodo.mutate(id)
  }

  const deleteTodo = useMutation({
    mutationFn: async (id: string) => api.delete("/api/todo/?id=" + id),
    onError: () =>
      toast({
        variant: "destructive",
        title: "Falha ao excluir tarefa, tente novamente!",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todosQuery"] })
      toast({ title: "Tarefa excluida com sucesso!" })
    },
  })

  const handleDeleteTodo = (id: string) => {
    deleteTodo.mutate(id)
  }

  return (
    <div className="w-full text-zinc-100 px-4 gap-4 flex flex-col items-center max-w-7xl">
      <div className="text-center">
        <h3 className="text-xl mt-10 font-regular">
          Olá, {session.user?.name}
        </h3>
        <h3 className="text-3xl  font-medium">Sua lista de Tarefas</h3>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2 w-full max-w-3xl"
      >
        <Input {...register("title")} disabled={postTodo.isPending} />
        <Button type="submit" isLoading={postTodo.isPending}>
          Adicionar
        </Button>
      </form>

      {allTodos.isLoading && (
        <Card className="w-full max-w-3xl px-8 py-2 flex flex-col gap-8 h-[600px]  overflow-scroll">
          <Skeleton className="w-full h-6 mt-2" />
          <Skeleton className="w-full h-6 " />
          <Skeleton className="w-full h-6 " />
        </Card>
      )}

      {allTodos.isSuccess && (
        <Card className="w-full max-w-3xl px-3 py-2 flex flex-col gap-4 h-[600px]  overflow-scroll">
          {allTodos.data.map((item: Todo) => {
            return (
              <Task
                key={item.id}
                data={item}
                patchTodo={handlePatchTodo}
                deleteTodo={handleDeleteTodo}
              />
            )
          })}
          {allTodos.data.length === 0 && (
            <p className="text-xl w-full text-center mt-6">
              Cadastre sua primeira tarefa! 🤗
            </p>
          )}
        </Card>
      )}
    </div>
  )
}

export default TodosView
