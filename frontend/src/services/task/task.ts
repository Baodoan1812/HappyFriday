import api from "../axios";

export const getTasks = async () => {
  try {
    const res = await api.get("/tasks/",
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
export const createTask = async (task: { title: string; des: string; deadline: string; status?: string }) => {
    try {
        const res = await api.post("/tasks/", task,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        return res.data;
    } catch (error) {
        throw error;
    }
}