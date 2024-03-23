import ChangeToDo from "./ChangeToDo"
import EditToDo from "./EditToDo"
import DeleteToDo from "./DeleteToDo"
import { todoType } from "@/types/todoType"

const ToDo = ( { todo }: {todo :todoType} ) => {

    const taskStyling = {
        textDecoration: 
        todo.isCompleted === true ? "line-through" : "none",
        opacity: todo.isCompleted === true ? 0.5 : 1
    }

    return (
        <div className="w-full flex items-center justify-between bg-white py-3 px-20 border border-emerald-700" style={taskStyling}>
            <ChangeToDo todo={todo}/>
            <span className="text-center font-bold uppercase ">
                {todo.title}
            </span>
            <div className="flex items-center gap-5">
                <EditToDo todo={todo} />
                <DeleteToDo todo={todo}/>
            </div>
        </div>
    )
}

export default ToDo