import { useState } from "react";
import api from "../api";

const Recuperar = () => {
  const [email, setEmail] = useState("");

  const handleRecuperar = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/recuperar", { email });
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("❌ Error al recuperar contraseña");
    }
  };

  return (
    <form onSubmit={handleRecuperar}>
      <h2>Recuperar Contraseña</h2>
      <input
        type="email"
        placeholder="Correo registrado"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Enviar correo</button>
    </form>
  );
};

export default Recuperar;
