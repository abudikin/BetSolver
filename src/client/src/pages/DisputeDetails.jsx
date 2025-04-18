import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DisputeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dispute, setDispute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedWinnerId, setSelectedWinnerId] = useState(null);
  const statusTranslations = {
    pending: "В ожидании",
    active: "Активен",
    completed: "Завершён",
  };

  // Получаем спор
  useEffect(() => {
    const fetchDispute = async () => {
      try {
        const res = await fetch(`http://localhost:3030/disputes/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Ошибка при загрузке данных");

        const data = await res.json();
        setDispute(data);
      } catch (err) {
        setError(err.message || "Не удалось загрузить спор");
      } finally {
        setLoading(false);
      }
    };

    fetchDispute();
  }, [id]);

  // Получаем всех пользователей
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`http://localhost:3030/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Ошибка при загрузке пользователей");

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectUser = async (e) => {
    const selectedId = e.target.value;
    setSelectedUserId(selectedId);

    try {
      const res = await fetch(`http://localhost:3030/disputes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          status: "active",
        }),
      });

      const updated = await res.json();
      if (!res.ok) {
        console.error("Ошибка:", updated);
        throw new Error("Не удалось обновить статус спора");
      }

      console.log("Обновлённый спор:", updated);
      setDispute(updated);
    } catch (err) {
      console.error("Ошибка при обновлении:", err);
    }
  };

  const handleCompleteDispute = () => {
    setShowModal(true);
  };

  const confirmWinner = async () => {
    try {
      const res = await fetch(`http://localhost:3030/disputes/${id}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          winnerId: selectedWinnerId,
        }),
      });

      if (!res.ok) throw new Error("Ошибка завершения спора");

      const updated = await res.json();
      setDispute(updated);
      setShowModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="text-center text-white">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!dispute) {
    return <div className="text-center text-white">Спор не найден</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white flex flex-col items-center justify-center">
      <div className="bg-gray-800 bg-opacity-50 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-gray-700 text-center max-w-lg">
        <h2 className="text-3xl font-bold mb-4">{dispute.title}</h2>
        <p className="text-gray-400">
          Статус: {statusTranslations[dispute.status] || dispute.status}
        </p>
        <p className="text-gray-300 mt-4">{dispute.description}</p>

        {dispute.status === "pending" && (
          <>
            <select
              value={selectedUserId || ""}
              onChange={handleSelectUser}
              className="mt-6 bg-gray-700 text-white p-2 rounded-full w-full"
            >
              <option value="">Выберите пользователя</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username || user.email}
                </option>
              ))}
            </select>

            {selectedUserId && (
              <button
                className="mt-4 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-full transition-all"
                onClick={handleCompleteDispute}
              >
                Завершить
              </button>
            )}
          </>
        )}

        {dispute.status === "active" && (
          <button
            className="mt-6 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-full transition-all"
            onClick={() => setShowModal(true)}
          >
            Завершить
          </button>
        )}

        <button
          className="mt-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-all"
          onClick={() => navigate(-1)}
        >
          ← Назад
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-6 max-w-md w-full text-center shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Кто победил?</h2>

            <select
              className="w-full p-2 rounded bg-gray-200 mb-6"
              value={selectedWinnerId || ""}
              onChange={(e) => setSelectedWinnerId(e.target.value)}
            >
              <option value="">Выберите победителя</option>
              <option value={dispute.author?.id}>
                {dispute.author?.username || dispute.author?.email || "Автор"}
              </option>
              <option value={selectedUserId}>
                {
                  users.find((u) => u.id.toString() === selectedUserId)?.username ||
                  "Участник"
                }
              </option>
            </select>

            <div className="flex justify-center gap-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-full"
                onClick={confirmWinner}
                disabled={!selectedWinnerId}
              >
                Подтвердить
              </button>
              <button
                className="bg-gray-400 px-4 py-2 rounded-full"
                onClick={() => setShowModal(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DisputeDetails;
