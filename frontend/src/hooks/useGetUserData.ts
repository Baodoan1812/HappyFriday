import { useState, useEffect } from "react";
import { getUserData } from "../services/auth/auth"
export default function useGetDataUser() {
  const [user, setUser] = useState(null);      // dữ liệu user
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        // Gọi API user, ví dụ endpoint: /user/me/
        const res = await getUserData();
        setUser(res);
      } catch (err) {
        console.error(err);
        setError(err.response?.data || { message: "Failed to fetch user" });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
