import style from "./NavBar.module.css";
import logo from "../../img/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const navigate = useNavigate();

  return (
    <nav className={style.nav}>
      <div className={style.divNav1}>
        <h2>Inicio</h2>
        <h2>Articulos</h2>
        <h2
          className={style.carth2}
          onClick={() => {
            navigate("/cart");
          }}
        >
          <FaShoppingCart className={style.cart} />
          <span>{props.cantidad}</span>
        </h2>
      </div>
      <div>
        <img src={logo} alt="" />
      </div>
      <div className={style.divNav2}>
        <h2>Inicio de Sesion</h2>
        <h2>Registrarse</h2>
      </div>
    </nav>
  );
};

export default NavBar;
