import { useState } from "react";
import style from "./Login.module.css";
import img from "../../img/aparatos.jpg";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [form, setForm] = useState({
    email: "",
    pass: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const input = e.target.id;
    const valor = e.target.value;
    setForm({ ...form, [input]: valor });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem(`email_${data.id}`, data.id);
        const email = localStorage.getItem(`email_${data.id}`);

        const obj = {
          cantidad: parseInt(localStorage.getItem(`cantidad_${data.id}`)), 
          total: parseInt(localStorage.getItem(`total_${data.id}`)),
          products: JSON.parse(localStorage.getItem(`productos_${data.id}`))
        }
        props.iniciarSesion(email, data.rol, obj);
        navigate('/');
      } else {
        // El inicio de sesión falló, muestra un mensaje de error al usuario
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.sub}>
        <div className={style.divImg}>
          <img src={img} alt="" />
        </div>
        <form onChange={handleChange} onSubmit={handleSubmit}>
          <input type="text" id="email" placeholder="E-mail:" />
          <input type="password" id="pass" placeholder="Password:" /> {/* Cambiado a type="password" para ocultar la contraseña */}
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
