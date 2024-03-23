"use client"

import Form from "../ui/Form"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { useState } from "react"
import { todoType } from "@/types/todoType"
import { edit } from "@/app/Actions/todoActions"
import { BiEdit } from "react-icons/bi"

const EditToDo = ( {todo}: {todo :todoType} ) => {

    const [editTodo, setEdiTodo ] = useState(false)

    const handleEdit = () => { 
        if (todo.isCompleted === false) { 
            setEdiTodo(!editTodo) 
        }         
    }

  return (
    <div className="flex gap-5 items-center">
        <Button onClick={handleEdit} text = {<BiEdit/>} actionButton />
        {editTodo? (
            <Form action = {edit} onSubmit= {() =>{ setEdiTodo(false)}} >
                <Input name="inputId" value={todo.id} type="hidden" />
                <div className="flex justify-center">
                    <Input type="text" name="newTitle" placeholder="Edit todo..." />
                    <Button type="submit" text ="Save" />
                </div>
            </Form>
        ): null}
    </div>
  )
}

export default EditToDo