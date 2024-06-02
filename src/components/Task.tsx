"use client"

import React from "react"
import { Checkbox } from "./ui/checkbox"
import { Trash } from "lucide-react"
import { Todo } from "@prisma/client"
import { DeleteDialog } from "./DeleteDialog"

interface TaskProps {
  data: Todo
  patchTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

const Task = ({ data, patchTodo, deleteTodo }: TaskProps) => {
  return (
    <div className="w-full grid grid-cols-10 place-items-center items-center py-1 ">
      <div
        className="w-full col-span-9 grid grid-cols-9 place-items-center items-center cursor-pointer "
        onClick={() => patchTodo(data.id.toString())}
      >
        <Checkbox checked={data.isCompleted} className="col-span-1" />
        <p
          className={`col-span-8 place-self-start text-elipsis-1 text-lg  ${
            data.isCompleted && "line-through"
          }`}
        >
          {data.title}
        </p>
      </div>
      <DeleteDialog id={data.id.toString()} deleteTodo={deleteTodo} />
    </div>
  )
}

export default Task
