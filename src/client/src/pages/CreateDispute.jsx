import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateDispute = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const onSubmit = async (data) => {
    setErrorMsg("");

    try {

      // Преобразуем строку даты в ISO-формат, если нужно
      const payload = {
        ...data,
        deadline: data.deadline ? new Date(data.deadline).toISOString() : undefined,
      };

      const response = await axios.post(
        "http://localhost:3030/disputes",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Спор создан:", response.data);
      navigate("/disputes");
    } catch (error) {
      console.error(error);
      setErrorMsg("Ошибка при создании спора.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Создать спор</h2>

        {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            {...register("title", { required: "Введите название спора" })}
            placeholder="Название спора"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
          {errors.title && (
            <p className="text-red-400 text-sm">{errors.title.message}</p>
          )}

          <textarea
            {...register("description", {
              required: "Введите описание спора",
            })}
            placeholder="Описание"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded h-20"
          />
          {errors.description && (
            <p className="text-red-400 text-sm">
              {errors.description.message}
            </p>
          )}

          <input
            type="text"
            {...register("stake")}
            placeholder="Ставка (например: ужин, деньги, уважение)"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />

          <input
            type="date"
            {...register("deadline")}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 py-2 rounded font-bold"
          >
            Создать спор
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full bg-gray-600 py-2 rounded font-bold mt-2"
          >
            Отмена
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDispute;
