// src/components/TaskForm.tsx
import { useState } from "react";
import { createTask } from "../services/task/task";

type TaskFormProps = {
  onSuccess: () => void; // callback khi tạo task thành công
  onCancel: () => void;  // callback khi đóng form
};

export default function TaskForm({ onSuccess, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTask = { title, des, deadline, status: "todo" };
      const res = await createTask(newTask);
      console.log("Created task:", res);
      if (res) {
        setTitle("");
        setDes("");
        setDeadline("");
        onSuccess(); // reload lại danh sách
      }
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Tạo Task Mới</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Tiêu đề</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Mô tả</label>
            <textarea
              value={des}
              onChange={(e) => setDes(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Lưu Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
