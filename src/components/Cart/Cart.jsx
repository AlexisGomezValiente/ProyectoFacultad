import ProductCart from "../ProductCart/ProductCart";
import style from "./Cart.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const abrir = () => {
    setModal(true);
  };

  const cerrar = () => {
    setModal(false);
  };

  const handleClick = () => {
    if (!props.productos.length){
      alert('El carrito esta vacio');
    }else if(props.emailUser == null ){
      abrir();
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.h2}>Carrito de compras</h2>
      <div className={style.padre}>
        <div className={style.producto}>
          {props.productos.map((producto) => {
            return (
              <ProductCart
                img={producto.producto.img}
                id={producto.producto.idproducto}
                title={producto.producto.titulo}
                desc={producto.producto.descripcion}
                precio={producto.producto.precio}
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
          <h2>Total: {props.total} $</h2>
          <button onClick={handleClick}>Finalizar Compra</button>
        </div>
      </div>

      {modal ? (
        <div className={style.modal}>
          <div>
            <button className={style.cerrar} onClick={cerrar}>
              X
            </button>
            <h2>Finalizar compra</h2>
            <p>Inicie sesión para continuar.</p>
            <button
              className={style.button}
              onClick={() => {
                navigate("/login");
              }}
            >
              INICIAR SESIÓN
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
