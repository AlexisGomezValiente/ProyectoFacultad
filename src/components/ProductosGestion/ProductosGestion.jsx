import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./ProductosGestion.module.css";
import img from "../../img/aparatos.jpg";
import { useEffect } from "react";

const ProductosGestion = (props) => {
  const [form, setForm] = useState({
    img: "",
    precio: 0,
    titulo: "",
    descripcion: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (props.rol != 1) navigate("/");
  }, []);

  const handleChange = (e) => {
    const input = e.target.id;
    const valor = e.target.value;
    setForm({ ...form, [input]: valor });
  };

  const verificar = (form) => {
    let veri = false;
    for (let key in form) {
      if (!form[key].length) {
        veri = true;
        return veri;
      }
    }

    return veri;
  };

  const verificarPrecio = (precio) => {
    if (/^-?\d*\.?\d*$/.test(precio)) {
      return true;
    }

    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!verificar(form)) {
      if (verificarPrecio(form.precio)) {
        try {
          const response = await fetch("/addproducto", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          });

          const res = await response.json();

          if (response.ok) {
            props.setProductosElectronicos(res.datos);
            alert("Registrado con exito");
          } else {
            alert("Error al registrar productoss");
          }
        } catch (error) {
          console.error("Error al registrar producto:", error);
        }

        for (let i = 0; i < event.target.length; i++) {
          event.target[i].value = "";
        }
      } else {
        alert("Ingrese un precio valido");
      }
    } else {
      alert("Complete los datos");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.sub}>
        <div className={style.divImg}>
          <img src={img} alt="" />
        </div>
        <form onChange={handleChange} onSubmit={handleSubmit}>
          <input type="text" id="img" placeholder="URL de imagen:" />
          <input type="text" id="titulo" placeholder="Titulo:" />
          <input type="text" id="precio" placeholder="Precio:" />
          <input type="text" id="descripcion" placeholder="Descripcion:" />
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default ProductosGestion;
