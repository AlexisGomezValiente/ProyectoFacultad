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

      const res = await response.json();
      props.iniciarSesion(res.id, res.rol);

      if (response.ok) {
        navigate('/')
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
          <input type="text" id="pass" placeholder="Password:" />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
