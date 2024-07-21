import React, { useState, useEffect } from "react";
import style from "./NavBar.module.css";
import logo from "../../img/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const navigate = useNavigate();
  const [cartQuantity, setCartQuantity] = useState(() => {
    // Obtener la cantidad almacenada en localStorage, o 0 si no hay datos
    return parseInt(localStorage.getItem(`cantidad_${props.emailUser}`)) || 0;
  });

  // Actualizar la cantidad del carrito cuando cambie en las propiedades
  useEffect(() => {
    setCartQuantity(props.cantidad);
    if (localStorage.getItem("token")) {
      localStorage.setItem(`cantidad_${props.emailUser}`, props.cantidad);
    }
  }, [props.cantidad]);

  return (
    <nav className={style.nav}>
      <div className={style.divNav1}>
        <Link to="/" className={style.linkh2}>
          <h2>Inicio</h2>
        </Link>
        {localStorage.getItem('rol') == '1' ? (
          <Link to="/productos" className={style.linkh2}>
            <h2>Articulos</h2>
          </Link>
        ) : null}

        <h2
          className={style.carth2}
          onClick={() => {
            navigate("/cart");
          }}
        >
          <FaShoppingCart className={style.cart} />
          <span>{cartQuantity}</span>
        </h2>
      </div>
      <div>
        <img src={logo} alt="" />
      </div>
      <div className={style.divNav2}>
        {localStorage.getItem("token") ? (
          <>
            <h2>
              <span className={style.email}>
                {localStorage.getItem(`email_${props.emailUser}`)}
              </span>
            </h2>
            <h2 onClick={props.cerrarSesion}>Cerrar Sesion</h2>
          </>
        ) : (
          <>
            <Link to="/login" className={style.linkh2}>
              <h2>Inicio de Sesion</h2>
            </Link>
            <Link to="/registro" className={style.linkh2}>
              <h2>Registrarse</h2>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
