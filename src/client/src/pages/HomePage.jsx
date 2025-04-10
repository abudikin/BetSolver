import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/create-dispute");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            BetSolver
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
            Организуйте, отслеживайте и выигрывайте дружеские споры с легкостью
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 bg-opacity-50 p-6 rounded-xl backdrop-blur-sm border border-gray-700"
          >
            <div className="text-blue-400 text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold mb-2">Создавайте споры</h3>
            <p className="text-gray-300">
              Определите условия, ставки и пригласите друзей в качестве
              участников или арбитров
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 bg-opacity-50 p-6 rounded-xl backdrop-blur-sm border border-gray-700"
          >
            <div className="text-blue-400 text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Отслеживайте результаты</h3>
            <p className="text-gray-300">
              Загружайте доказательства, следите за историей и повышайте свой
              рейтинг побед
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gray-800 bg-opacity-50 p-6 rounded-xl backdrop-blur-sm border border-gray-700"
          >
            <div className="text-blue-400 text-4xl mb-4">⏱️</div>
            <h3 className="text-xl font-bold mb-2">Управляйте временем</h3>
            <p className="text-gray-300">
              Устанавливайте таймеры для споров с ограничением по времени и
              получайте уведомления
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-row justify-center items-center gap-4 flex-wrap text-center"
        >
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={handleButtonClick}
          >
            Начать спор
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => navigate("/profile")}
          >
            Профиль
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => navigate("/disputes")}
          >
            Список споров
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
