import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { showNotification } from "@/lib/notification";
import { Input } from "@/components/ui/input";

const Popup: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const form = evt.target as HTMLFormElement;
    const formData = new FormData(form);

    const newActivity = String(formData.get("activity"));

    setTodos((todos) => [...todos, newActivity]);

    form.reset();

    showNotification({ title: "Success Test", message: `Added: ${newActivity}` });
  };

  return (
    <div className="w-[400px] h-[400px] shadow p-4">
      <p className="text-xl font-bold mb-4">My To Do App</p>
      <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
        <Input name="activity" required autoComplete="off" />
        <Button type="submit" onClick={() => console.log("Test")}>
          Add
        </Button>
      </form>
      <p className="font-bold text-lg">List of Items</p>
      <div className="py-4 text-base">
        {todos.length > 0 ? (
          <ul className="pl-4">
            {todos.map((todo, id) => (
              <li className="list-disc" key={id}>
                {todo}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center font-medium text-md">No Data</div>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
