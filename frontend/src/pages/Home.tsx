// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { getTasks } from "../services/task/task";
import TaskForm from "../components/TaskForm";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

type Task = {
  id: number;
  title: string;
  des?: string;
  start?: string;
  deadline?: string;
  status: string;
};

const localizer = momentLocalizer(moment);

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

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

  // Helper: parse ISO string but TREAT IT AS LOCAL (bỏ 'Z' / timezone)
  const parseAsLocal = (iso?: string) => {
    if (!iso) return null;
    // remove timezone marker 'Z' and fractional seconds if any
    const s = iso.replace(/Z$/, "").split(".")[0];
    const parts = s.split("T");
    if (parts.length !== 2) {
      // fallback: try normal Date parse
      return new Date(iso);
    }
    const [date, time] = parts;
    const [y, m, d] = date.split("-").map((v) => parseInt(v, 10));
    const [hh = "0", mm = "0", ss = "0"] = time.split(":");
    return new Date(
      y,
      (m || 1) - 1,
      d || 1,
      parseInt(hh as string, 10) || 0,
      parseInt(mm as string, 10) || 0,
      parseInt((ss as string).split(":")[0], 10) || 0
    );
  };

  // Chuyển task -> event cho calendar, coi start/deadline như "local time"
  const events = tasks
    .filter((task) => task.deadline)
    .map((task) => {
      const startDate = task.start ? parseAsLocal(task.start) : null;
      let endDate = task.deadline ? parseAsLocal(task.deadline) : null;

      // nếu không có start mà chỉ có deadline, ta có thể để start = deadline - 1h
      if (!startDate && endDate) {
        const tmp = new Date(endDate.getTime() - 60 * 60 * 1000);
        return {
          id: task.id,
          title: `${task.title} (${task.status})`,
          start: tmp,
          end: endDate,
        };
      }

      // nếu start có nhưng end null -> end = start +1h
      if (startDate && !endDate) {
        endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
      }

      return {
        id: task.id,
        title: `${task.title} (${task.status})`,
        start: startDate || new Date(),
        end: endDate || new Date(),
      };
    });

  console.log("Events for calendar:", events);

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

      <div style={{ height: "80vh" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.WEEK}
          views={[Views.WEEK, Views.DAY]}
          step={60}
          timeslots={1}
          date={currentDate}
          onNavigate={(newDate) => setCurrentDate(newDate)}
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
}
