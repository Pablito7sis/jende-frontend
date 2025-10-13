import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });

      if (res.status === 200 && res.data.token) {
        localStorage.setItem("token", res.data.token);
        setMensaje("Inicio de sesión exitoso ✅");

        // 🔁 Esperar un momento y redirigir al panel
        setTimeout(() => {
          navigate("/panel");
        }, 800);
      } else {
        setMensaje(res.data.message || "Credenciales incorrectas ❌");
      }
    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error);
      setMensaje(
        error.response?.data?.message || "Error de conexión con el servidor"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 border rounded p-2"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 border rounded p-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        >
          Ingresar
        </button>

        <p className="text-sm text-center mt-3">
          <Link to="/recuperar" className="text-blue-600">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
        <p className="text-sm text-center mt-1">
          <Link to="/register" className="text-blue-600">
            Crear cuenta nueva
          </Link>
        </p>

        {mensaje && (
          <p className="mt-3 text-center text-sm text-gray-700">{mensaje}</p>
        )}
      </form>
    </div>
  );
}
