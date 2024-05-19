import ProductCart from "../ProductCart/ProductCart";
import ps4 from "../../img/ps4.jpg";
import style from "./Cart.module.css";
import { useEffect } from "react";

const Cart = (props) => {

  return (
    <div className={style.container}>
      <h2 className={style.h2}>Carrito de compras</h2>
      <div className={style.padre}>
        <div className={style.producto}>
          {props.productos.map((producto) => {
            return (
              <ProductCart
                img={ps4}
                id={producto.producto.id}
                title={producto.producto.title}
                desc={producto.producto.description}
                precio={producto.producto.price}
                cantidad={producto.cantidad}
                total={producto.totalPrecio}
                addToCart={props.addToCart}
                deleteToCart={props.deleteToCart}
                sacarCart={props.sacarCart}
              />
            );
          })}
        </div>

        <div className={style.total}>
          <h2>Total Carrito</h2>
          <h2>Total: {props.total} Gs.</h2>
          <button>Finalizar Compra</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
