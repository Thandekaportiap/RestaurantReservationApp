// AdminContext.js - Context for admin authentication and restaurant data

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  loginAdmin, 
  logoutAdmin, 
  getCurrentAdmin, 
  getRestaurantData 
} from './firebase';

// Create a context for admin authentication
const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const adminData = await getCurrentAdmin();
        
        if (adminData) {
          setAdmin(adminData);
          
          // Fetch restaurant data
          const restaurantResult = await getRestaurantData(adminData.restaurantId);
          if (restaurantResult.success) {
            setRestaurant(restaurantResult.data);
          } else {
            setError(restaurantResult.message);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await loginAdmin(email, password);
      
      if (result.success) {
        const adminData = await getCurrentAdmin();
        setAdmin(adminData);
        
        // Fetch restaurant data
        const restaurantResult = await getRestaurantData(adminData.restaurantId);
        if (restaurantResult.success) {
          setRestaurant(restaurantResult.data);
          navigate('/dashboard');
          return true;
        } else {
          setError(restaurantResult.message);
          return false;
        }
      } else {
        setError(result.message);
        return false;
      }
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      const result = await logoutAdmin();
      
      if (result.success) {
        setAdmin(null);
        setRestaurant(null);
        navigate('/login');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    admin,
    restaurant,
    loading,
    error,
    login,
    logout
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use the admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};