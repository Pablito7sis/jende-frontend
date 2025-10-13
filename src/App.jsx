import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

// 🔹 Componentes de productos
import ListaProductos from "./components/ListaProductos";
import FormProducto from "./components/FormProducto";

// 🔹 Componentes de autenticación
import Login from "./components/Login";
import Register from "./components/Register";
import Recuperar from "./components/Recuperar";
import ResetPassword from "./components/ResetPassword";


function PanelProductos() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const navigate = useNavigate();

  // 🔹 Obtener productos del backend
  const obtenerProductos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      const res = await axios.get("http://localhost:4000/api/productos", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProductos(res.data);
    } catch (error) {
      console.error("❌ Error al obtener productos:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // 🔹 Agregar producto (con FormData)
  const agregarProducto = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:4000/api/productos", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Producto agregado correctamente");
      await obtenerProductos();
    } catch (error) {
      console.error("❌ Error al agregar producto:", error.response?.data || error);
      alert("❌ Error al agregar producto");
    }
  };

  // ✅ Editar producto
  const editarProducto = (producto) => setProductoEditando(producto);

  // ✅ Guardar edición (FormData)
  const guardarEdicion = async (formData, id) => {
    try {
      if (!id) return alert("Error: el producto no tiene un ID válido");
      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:4000/api/productos/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Producto actualizado correctamente");
      await obtenerProductos();
      setProductoEditando(null);
    } catch (error) {
      console.error("❌ Error al actualizar producto:", error.response?.data || error);
      alert("❌ Error al actualizar el producto");
    }
  };

  // 🗑 Eliminar producto
  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/productos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑 Producto eliminado correctamente");
      await obtenerProductos();
    } catch (error) {
      console.error("❌ Error al eliminar producto:", error);
      alert("❌ Error al eliminar el producto");
    }
  };

  // 🚪 Cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // 📄 Descargar PDF
  const descargarPDF = () => {
    window.open("http://localhost:4000/api/productos/pdf", "_blank");
  };

  return (
    <div>
      <header className="flex justify-between items-center bg-gray-100 p-4 shadow-md">
        <h1 className="text-xl font-bold">Gestión de Productos</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </header>

      <FormProducto
        onProductoAgregado={agregarProducto}
        productoEditando={productoEditando}
        onGuardarEdicion={guardarEdicion}
      />

      {/* 📌 Botón de PDF */}
      <div className="flex justify-center mt-4">
        <button
          onClick={descargarPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
        >
          📄 Descargar Inventario PDF
        </button>
      </div>

      <ListaProductos
        productos={productos}
        onEditar={editarProducto}
        onEliminar={eliminarProducto}
      />
    </div>
  );
}

// 🔒 Protección de rutas
function RutaProtegida({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔐 Rutas de autenticación */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recuperar" element={<Recuperar />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* 🧭 Rutas protegidas */}
        <Route
          path="/panel"
          element={
            <RutaProtegida>
              <PanelProductos />
            </RutaProtegida>
          }
        />

        {/* 🧭 Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
