import Carrusel from "../Carrusel/Carrusel";
import Producto from "../Producto/Producto";
import ps4 from "../../img/ps4.jpg";
import style from "./Menu.module.css";

const Menu = (props) => {
  return (
    <div>
      <Carrusel />

      <div className={style.prod}>
        <div className={style.title}>
          <h2>Productos Recomendados</h2>
        </div>
        {props.productosElectronicos.map((producto) => {
          return (
            <Producto
              id={producto.id}
              title={producto.title}
              img={ps4}
              precio={producto.price}
              desc={producto.description}
              add={props.add}
              addToCart={props.addToCart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
