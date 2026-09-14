import { useAuthStore } from "../stores/auth.store";
import { useState } from "react";
import { useEffect } from "react";
import useTaskStore from "../stores/task.store";

const TasksPage = () => {
  // User
  const user = useAuthStore((state) => state.user);

  // Tasks
  const Tasks = useTaskStore((state) => state.Tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const createTask = useTaskStore((state) => state.createTask);

  // Inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  useEffect(() => {
    if (!user) return;

    fetchTasks(user);
  }, [user]);

  return (
    <div className="p-10">
      <h1>Task</h1>
      <div className="flex flex-col">
        {Tasks.map((task) => (
          <div key={task.id}>{task.title} </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (!user) return;

          createTask({
            user_id: user.id,
            title,
            description,
            subject,
            priority,
          });
        }}
        className="flex flex-col gap-3 mt-10"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border p-2 rounded"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 rounded"
        />

        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="border p-2 rounded"
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
          className="border p-2 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          type="submit"
          className="cursor-pointer bg-red-500 text-white px-3 py-2 rounded-2xl"
        >
          Add task
        </button>
      </form>
    </div>
  );
};

export default TasksPage;
