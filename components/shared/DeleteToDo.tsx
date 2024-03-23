"use client"

import Button from "../ui/Button"
import Form from "../ui/Form"
import Input from "../ui/Input"
import { deleteTodo } from "@/app/Actions/todoActions"
import { todoType } from "@/types/todoType"
import { BsFillTrashFill } from "react-icons/bs"

const DeleteToDo = ({todo} : {todo :todoType}) => {
  return (
    <Form action={deleteTodo}>
        <Input type="hidden" name="inputId" value={todo.id}/>
        <Button text={<BsFillTrashFill/>}/>
    </Form>
  )
}

export default DeleteToDo