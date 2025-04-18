import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      }
    };

    if (userId && token) {
      fetchUser();
    } else {
      navigate("/login");
    }
  }, [userId, token, navigate]);

  const handleEditProfile = () => {
    navigate("/edit");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Загрузка профиля...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-gray-700 text-center"
      >
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-300">{user.email}</p>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <span className="text-xl font-bold">{user.createdDisputes.length}</span>
            <p className="text-gray-400 text-sm">Споры</p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 mt-6">
          <motion.button
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
            onClick={handleEditProfile}
            whileHover={{ scale: 1.1 }}
          >
            Редактировать профиль
          </motion.button>

          <motion.button
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
            onClick={handleLogout}
            whileHover={{ scale: 1.1 }}
          >
            Выйти
          </motion.button>

          <button
            className="mt-4 text-gray-400 hover:text-white transition-all"
            onClick={() => navigate(-1)}
          >
            Назад
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfile;
