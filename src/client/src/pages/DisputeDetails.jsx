import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const disputes = [
  {
    id: 1,
    title: "Кто быстрее пробежит 5 км?",
    status: "Активен",
    description:
      "Спор между Иваном и Сергеем о том, кто пробежит 5 км быстрее.",
  },
  {
    id: 2,
    title: "Сможет ли Петя выучить React за 1 месяц?",
    status: "Завершён",
    description: "Петя утверждает, что освоит React за месяц. Он справился?",
  },
  {
    id: 3,
    title: "Кто выиграет в шахматы?",
    status: "Активен",
    description: "Соревнование между Алексеем и Димой в шахматах.",
  },
];

const DisputeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispute = disputes.find((d) => d.id === Number(id));

  if (!dispute) {
    return <div className="text-center text-white">Спор не найден</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white flex flex-col items-center justify-center">
      <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-gray-700 text-center max-w-lg">
        <h2 className="text-3xl font-bold mb-4">{dispute.title}</h2>
        <p className="text-gray-400">Статус: {dispute.status}</p>
        <p className="text-gray-300 mt-4">{dispute.description}</p>
        <button
          className="mt-6 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-all"
          onClick={() => navigate(-1)}
        >
          ← Назад
        </button>
      </div>
    </div>
  );
};

export default DisputeDetails;
