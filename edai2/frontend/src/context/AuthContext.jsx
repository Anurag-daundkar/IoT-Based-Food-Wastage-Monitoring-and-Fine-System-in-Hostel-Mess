import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;
      try {
        // attach token to axios for subsequent requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const res = await axios.get('/api/auth/profile');
        setUser(res.data);
        // ensure role is available for ProtectedRoute checks
        if (res.data?.role) {
          localStorage.setItem('role', res.data.role);
        }
      } catch (_) {
        // token might be invalid/expired
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      }
    };
    if (token && !user) loadProfile();
  }, [token, user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Replace with your backend URL
      const res = await axios.post('/api/auth/login', { email, password });
      const { token: newToken } = res.data;
      setToken(newToken);
      localStorage.setItem('token', newToken);
      // set header and fetch full profile (with student fields)
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      let currentUser = null;
      try {
        const profileRes = await axios.get('/api/auth/profile');
        currentUser = profileRes.data;
        setUser(currentUser);
        if (currentUser?.role) {
          localStorage.setItem('role', currentUser.role);
        }
      } catch (_) {
        // fallback to minimal user from login response if any
        currentUser = res.data?.user || null;
        setUser(currentUser);
        if (currentUser?.role) {
          localStorage.setItem('role', currentUser.role);
        }
      }
      setLoading(false);
      return { success: true, user: currentUser };
    } catch (err) {
      setLoading(false);
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = { user, token, loading, login, logout, isAuthenticated: !!token };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
