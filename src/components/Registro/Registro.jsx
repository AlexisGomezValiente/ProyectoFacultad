import style from "./Regsitro.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../img/aparatos.jpg";

const Registro = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.email && form.pass) {
      try {
        const response = await fetch("/registro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const res = await response.json();

        if(!res.repetido){
          if (response.ok) {
            alert("Registro exitoso");
            navigate("/");
          } else {
            // El inicio de sesión falló, muestra un mensaje de error al usuario
            alert("Registro fallido");
          }
        }else{
          alert('Usuario ya existente');
        }        
      } catch (error) {
        console.error("Error al registrar:", error);
      }
    } else {
      alert("Complete los campos");
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
          <button type="submit">Regsitrarme</button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
