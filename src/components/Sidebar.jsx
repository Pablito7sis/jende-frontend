// frontend/src/components/Sidebar.jsx
import { FaCoffee, FaPlus, FaFilePdf, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-[#4b2e2a] text-white flex flex-col shadow-lg">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-[#7b4a2d]">
        <img src="/descarga.jpeg" alt="Jende Logo" className="w-14 h-14 rounded-full object-cover shadow-md" />
      </div>

      {/* Menu */}
      <nav className="flex-1 flex flex-col mt-4">
        <Link
          to="/panel"
          className="flex items-center gap-3 px-5 py-3 hover:bg-[#7b4a2d] transition-all"
        >
          <FaCoffee className="text-lg" />
          Productos
        </Link>

        <a
          href="#agregar"
          className="flex items-center gap-3 px-5 py-3 hover:bg-[#7b4a2d] transition-all"
          onClick={() => {
            const form = document.querySelector("form");
            if (form) form.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <FaPlus className="text-lg" />
          Agregar Producto
        </a>

        <a
          href="http://localhost:4000/api/productos/pdf"
          target="_blank"
          className="flex items-center gap-3 px-5 py-3 hover:bg-[#7b4a2d] transition-all"
        >
          <FaFilePdf className="text-lg" />
          Descargar PDF
        </a>
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-3 px-5 py-3 bg-[#7b4a2d] hover:bg-red-600 transition-all"
      >
        <FaSignOutAlt className="text-lg" />
        Cerrar Sesión
      </button>
    </aside>
  );
}
