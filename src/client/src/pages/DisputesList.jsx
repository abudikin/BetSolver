import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const disputes = [
  {
    id: 1,
    title: "Кто быстрее пробежит 5 км?",
    status: "Активен",
    participants: 3,
  },
  {
    id: 2,
    title: "Сможет ли Петя выучить React за 1 месяц?",
    status: "Завершён",
    participants: 2,
  },
  {
    id: 3,
    title: "Кто выиграет в шахматы?",
    status: "Активен",
    participants: 4,
  },
];

const DisputesList = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Список споров
        </motion.h1>

        {/* Список споров */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disputes.map((dispute) => (
            <motion.div
              key={dispute.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 bg-opacity-50 p-6 rounded-xl backdrop-blur-sm border border-gray-700 cursor-pointer hover:bg-opacity-75 transition"
            >
              <h2 className="text-xl font-bold">{dispute.title}</h2>
              <p className="text-gray-400">Статус: {dispute.status}</p>
              <p className="text-gray-400">
                Участников: {dispute.participants}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Кнопка назад */}
        <div className="text-center mt-8">
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-all"
            onClick={() => navigate(-1)}
          >
            ← Назад
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisputesList;
