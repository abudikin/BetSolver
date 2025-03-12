import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const categories = ["Финансовый", "Юридический", "Технический", "Личный"];

const CreateDispute = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setErrorMsg("");

    try {
      console.log("Отправка данных:", data);
      navigate("/disputes");
    } catch (error) {
      setErrorMsg("Ошибка при создании спора.", error);
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
            {...register("description", { required: "Введите описание спора" })}
            placeholder="Описание"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded h-20"
          />
          {errors.description && (
            <p className="text-red-400 text-sm">{errors.description.message}</p>
          )}

          <select
            {...register("category", { required: "Выберите категорию" })}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          >
            <option value="">Выберите категорию</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-400 text-sm">{errors.category.message}</p>
          )}

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
