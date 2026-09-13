import { useAuthStore } from "../stores/auth.store";
import { supabase } from "../lib/supabase";

const TasksPage = () => {
  const user = useAuthStore((state) => state.user);

  const createTask = async () => {
    const { data, error } = await supabase.from("tasks").insert({
      user_id: user?.id,
      title: "My first task",
      priority: "high",
    });

    console.log(data);
    console.log(error);
  };

  return (
    <div className="p-10">
      <h1>Task</h1>
      <div></div>

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
