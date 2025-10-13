import { useState, useEffect } from "react";

export default function FormProducto({
  onProductoAgregado,
  productoEditando,
  onGuardarEdicion,
}) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (productoEditando) {
      setNombre(productoEditando.nombre || "");
      setPrecio(productoEditando.precio || "");
      setDescripcion(productoEditando.descripcion || "");
      setStock(productoEditando.stock || "");
      setPreview(productoEditando.foto ? `http://localhost:4000/uploads/${productoEditando.foto}` : null);
      setFoto(null);
    } else {
      setNombre("");
      setPrecio("");
      setDescripcion("");
      setStock("");
      setPreview(null);
      setFoto(null);
    }
  }, [productoEditando]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    formData.append("descripcion", descripcion);
    formData.append("stock", stock);

    // Solo se envía nueva imagen si el usuario seleccionó una
    if (foto) formData.append("foto", foto);

    if (productoEditando) {
      onGuardarEdicion(formData, productoEditando._id);
    } else {
      onProductoAgregado(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 mb-6 grid grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          setFoto(file);
          if (file) setPreview(URL.createObjectURL(file));
        }}
        className="border p-2 rounded w-full"
        accept="image/*"
      />

      {preview && (
        <img
          src={preview}
          alt="Vista previa"
          className="w-32 h-32 object-cover rounded border col-span-2"
        />
      )}

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="border p-2 rounded w-full col-span-2"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 col-span-2"
      >
        {productoEditando ? "Guardar Cambios" : "Agregar Producto"}
      </button>
    </form>
  );
}
