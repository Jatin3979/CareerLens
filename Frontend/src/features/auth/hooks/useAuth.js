import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "../services/auth.api";

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userData = await loginUser({ email, password });
      setUser(userData.user);
      setLoading(false);
      return userData;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  const register = async (username, email, password) => {
    setLoading(true);
    try {
      const userData = await registerUser({ username, email, password });
      setUser(userData.user);
      setLoading(false);
      return userData;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  const fetchCurrentUser = async () => {
    setLoading(true);
    try {
      const userData = await getCurrentUser();
      setUser(userData.user);
      setLoading(false);
      return userData;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    fetchCurrentUser,
  };
};
