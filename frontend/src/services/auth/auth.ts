import api from "../axios";

export const signin = async (email: string, password: string) => {
  try {
    const res= await api.post("/signin/", {email, password});
    return res.data;
  } catch (error) {
    throw error;
  }
}
export const signup = async (email: string, username: string, password: string) => {
  try {
    const res= await api.post("/signup/", {email, username, password});
    return res.data;
  } catch (error) {
    throw error;
  }
}