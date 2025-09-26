// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { getTasks } from "../services/task/task";
import TaskForm from "../components/TaskForm";
type Task = {
  id: number;
  title: string;
  des?: string;
  deadline?: string;
  status: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Lấy danh sách task
  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      console.log("Fetched tasks:", res);
      setTasks(res);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  return (
    <div className="home-container p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Task</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Tạo Task
      </button>

      {showForm && (
        <TaskForm
          onSuccess={() => {
            fetchTasks();
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <p>Đang tải...</p>
      ) : tasks.length === 0 ? (
        <p>Chưa có task nào</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="border rounded p-3 shadow-sm bg-white">
              <h2 className="font-semibold">{task.title}</h2>
              {task.des && <p className="text-gray-600">{task.des}</p>}
              {task.deadline && (
                <p className="text-sm text-red-500">
                  Deadline: {new Date(task.deadline).toLocaleDateString()}
                </p>
              )}
              <span className="text-sm text-gray-500">
                Trạng thái: {task.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
