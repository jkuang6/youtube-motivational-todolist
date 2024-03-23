import Form from "../ui/Form"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { create } from "@/app/Actions/todoActions"

const AddItem = () => {

    return (
        <Form action={create} className="2-1/2 m-auto border border-emerald-700">
            <div className="flex">
                <Input
                    name="input"
                    type="text"
                    placeholder="Add task..."
                />
                <Button type="submit" text="Add" />
            </div>
        </Form>
    )
}

export default AddItem