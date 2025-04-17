import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Register Data:", data);

      // Отправка данных на сервер
      const response = await fetch("http://localhost:3020/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          username: data.name, // передаем имя как username
        }),
      });

      // Проверка успешного ответа
      if (response.ok) {
        const result = await response.json();
        console.log("Registration successful:", result);
        navigate("/");
      } else {
        const error = await response.json();
        console.log("Registration error:", error);
        // здесь можно вывести сообщение об ошибке
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // обработка ошибок сети
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Регистрация</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm">Имя</label>
            <input
              type="text"
              {...register("name", { required: "Введите имя" })}
              className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm">Email</label>
            <input
              type="email"
              {...register("email", { required: "Введите email" })}
              className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm">Пароль</label>
            <input
              type="password"
              {...register("password", {
                required: "Введите пароль",
                minLength: { value: 6, message: "Минимум 6 символов" },
              })}
              className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded text-white font-bold"
          >
            Зарегистрироваться
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Уже есть аккаунт?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
