import { useAuthStore } from "../stores/auth.store";
import { supabase } from "../lib/supabase";
import { useEffect } from "react";
import useTaskStore from "../stores/task.store";

const TasksPage = () => {
  // User
  const user = useAuthStore((state) => state.user);

  // Tasks
  const Tasks = useTaskStore((state) => state.Tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  const createTask = async () => {
    const { data, error } = await supabase.from("tasks").insert({
      user_id: user?.id,
      title: "My first task",
      priority: "high",
    });

    console.log(data);
    console.log(error);
  };

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

      <button
        className="cursor-pointer bg-red-500 text-white px-3 py-2 rounded-2xl mt-10"
        onClick={createTask}
      >
        Add tasks
      </button>
    </div>
  );
};

export default TasksPage;
