// frontend/src/components/ListaProductos.jsx
import React from "react";

export default function ListaProductos({ productos = [], onEditar, onEliminar }) {
  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📦 Inventario de Productos</h2>

      {productos.length === 0 ? (
        <p className="text-gray-600 text-center py-6">No hay productos registrados aún.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((p) => {
            // Corrección automática de ruta de imagen
            const imageUrl = p.foto
              ? p.foto.startsWith("http")
                ? p.foto
                : `http://localhost:4000${p.foto}`
              : "https://via.placeholder.com/120?text=Sin+Imagen"; // Placeholder elegante

            return (
              <div
                key={p._id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center border hover:shadow-lg transition"
              >
                <img
                  src={imageUrl}
                  alt={p.nombre}
                  className="w-28 h-28 object-cover rounded-md border mb-3"
                />

                <h3 className="text-lg font-semibold text-gray-800">
                  {p.nombre}{" "}
                  <span className="text-sm text-gray-500">({p.sku || "Sin SKU"})</span>
                </h3>

                <p className="text-gray-600 text-sm mt-1 text-center">{p.descripcion}</p>

                <div className="mt-2 text-gray-700 text-sm">
                  💰 <b>${p.precio}</b> · 📦 <b>Stock: {p.stock}</b>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => onEditar && onEditar(p)}
                    className="px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-sm font-medium"
                  >
                    ✏ Editar
                  </button>
                  <button
                    onClick={() => onEliminar && onEliminar(p._id)}
                    className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm font-medium"
                  >
                    🗑 Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
