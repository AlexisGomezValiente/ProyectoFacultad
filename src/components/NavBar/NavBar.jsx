import style from "./NavBar.module.css";
import logo from "../../img/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const navigate = useNavigate();

  return (
    <nav className={style.nav}>
      <div className={style.divNav1}>
        <Link to="/" className={style.linkh2}>
          <h2>Inicio</h2>
        </Link>
        {props.rol == 1 ? (
          <Link to="/productos" className={style.linkh2}>
            <h2>Articulos</h2>{" "}
          </Link>
        ) : null}

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
        {props.emailUser ? (
          <>
            <h2>
              <span className={style.email}>{props.emailUser}</span>
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
