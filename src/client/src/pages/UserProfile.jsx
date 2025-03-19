import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    alert("Редактирование профиля пока не доступно!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-gray-700 text-center"
      >
        {/* Аватар */}
        <motion.img
          src="https://via.placeholder.com/150"
          alt="User Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />

        {/* Информация о пользователе */}
        <h2 className="text-2xl font-bold">БудикинАртур</h2>
        <p className="text-gray-300">Test@example.com</p>

        {/* Статистика */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <span className="text-xl font-bold">12</span>
            <p className="text-gray-400 text-sm">Споры</p>
          </div>
          <div className="text-center">
            <span className="text-xl font-bold">8</span>
            <p className="text-gray-400 text-sm">Победы</p>
          </div>
          <div className="text-center">
            <span className="text-xl font-bold">4</span>
            <p className="text-gray-400 text-sm">Поражения</p>
          </div>
        </div>

        {/* Кнопка редактирования */}
        <motion.button
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
          onClick={handleEditProfile}
          whileHover={{ scale: 1.1 }}
        >
          Редактировать профиль
        </motion.button>

        {/* Кнопка назад */}
        <button
          className="mt-4 text-gray-400 hover:text-white transition-all"
          onClick={() => navigate(-1)}
        >
          Назад
        </button>
      </motion.div>
    </div>
  );
};

export default UserProfile;
