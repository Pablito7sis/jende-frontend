import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token"); // 👈 Leer token de la URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      return setMensaje("Token inválido o ausente ❌");
    }

    try {
      const res = await axios.post("http://localhost:4000/api/auth/reset-password", {
        token,
        newPassword,
      });

      alert("✅ Contraseña actualizada correctamente. Inicia sesión.");
      navigate("/"); // 👈 Redirigir al login
    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al actualizar contraseña. Token expirado o inválido.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Restablecer contraseña</h2>

        {mensaje && <p className="text-red-500 text-sm mb-3">{mensaje}</p>}

        <input
          type="password"
          placeholder="Nueva contraseña"
          className="border p-2 rounded w-full mb-3"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700"
        >
          Actualizar contraseña
        </button>
      </form>
    </div>
  );
}
