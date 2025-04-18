import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      alert("Пожалуйста, войдите в аккаунт");
      navigate("/login");
      return;
    }

    // Получаем текущие данные пользователя
    fetch(`http://localhost:3030/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.username || "",
          email: data.email || "",
          password: "",
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Ошибка при загрузке данных профиля");
      });
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      alert("Пользователь не авторизован");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3030/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: form.name,
          email: form.email,
          password: form.password || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка при обновлении профиля");
      }

      alert("Профиль успешно обновлён!");
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert(`Ошибка: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 text-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 p-8 rounded-2xl shadow-xl backdrop-blur-md border border-gray-700 text-center max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Редактирование профиля</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" autoComplete="off">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Имя"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Новый пароль"
            
          />
          <motion.button
            type="submit"
            className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            Сохранить изменения
          </motion.button>
        </form>
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

export default EditProfile;
