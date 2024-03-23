"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/utils/prisma"

// create a new database of to-do tasks
export async function create(formData: FormData) {

    const input = formData.get("input") as string; // grab input from the textfield

    // if its empty, dont do anything
    if (!input.trim()) {return}

    // create the first task
    await prisma.todo.create({
        data: {
            title: input
        }
    })

    revalidatePath("/")
}

// change the status of the task
export async function changeStatus(formData: FormData) {

    const inputId = formData.get("inputId") as string // get the id of which task

    // find the matching id in database
    const todo = await prisma.todo.findUnique({
        where:{
            id: inputId
        }
    })

    const updatedStatus = !todo?.isCompleted // invert the current status of the task

    // update with new status and return the status
    await prisma.todo.update({
        where:{ id: inputId },
        data: { isCompleted: updatedStatus},
    
    })

    revalidatePath("/")

    return updatedStatus
}

// edit the to-do name
export async function edit(formData: FormData) {

    const input = formData.get("newTitle") as string // grab the input
    const inputId = formData.get("inputId") as string // grab the id of that to-do

    // update task using the matching id
    await prisma.todo.update({
        where: {
            id: inputId
        },
        data: {
            title: input
        }
    })

    revalidatePath("/")
}

// delete to-do
export async function deleteTodo(formData : FormData) {

    const inputId = formData.get("inputId") as string // grab the input id

    // delete the matching id in database
    await prisma.todo.delete({
        where:{
            id: inputId
        }
    })

    revalidatePath("/")
}

// delete all to-dos
export async function deleteAllToDos() {

    await prisma.todo.deleteMany()

    revalidatePath("/")
}

// grab all to-dos
export async function getAllToDos() {

    // if there is at least 1 to-do
    // grab all and return that data
    if (await prisma.todo.count() > 0){
        const data = await prisma.todo.findMany({
            select: {
              title: true,
              id: true,
              isCompleted: true,
            },
            orderBy: {
              createdAt: "desc"
            }
          });
        return data;
    }
  }