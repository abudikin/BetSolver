import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DisputesList = () => {
  const navigate = useNavigate();
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const statusTranslations = {
    pending: "В ожидании",
    active: "Активен",
    completed: "Завершён",
  };
  useEffect(() => {
    const fetchDisputes = async () => {
      try {
        const response = await axios.get(`http://5.35.125.167:3030/disputes/${userId}/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDisputes(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке споров:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisputes();
  }, []);

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

        {/* Лоадер или список */}
        {loading ? (
          <p className="text-center text-gray-400">Загрузка споров...</p>
        ) : disputes.length === 0 ? (
          <p className="text-center text-gray-400">Споры не найдены.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disputes.map((dispute) => (
              <motion.div
                key={dispute.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-800 bg-opacity-50 p-6 rounded-xl backdrop-blur-sm border border-gray-700 cursor-pointer hover:bg-opacity-75 transition"
                onClick={() => navigate(`/dispute/${dispute.id}`)}
              >
                <h2 className="text-xl font-bold">{dispute.title}</h2>
                <p className="text-gray-400">Статус: {statusTranslations[dispute.status] || dispute.status}</p>

              </motion.div>
            ))}
          </div>
        )}

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
