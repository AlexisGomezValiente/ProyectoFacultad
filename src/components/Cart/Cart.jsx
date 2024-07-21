import ProductCart from "../ProductCart/ProductCart";
import style from "./Cart.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
    if (!props.productos.length) {
      alert("El carrito esta vacio");
    } else if (!props.emailUser) {
      abrir();
    } else {
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("Tienda Online", 10, 10);
      doc.setFontSize(14);
      doc.text("Detalle de Compra", 10, 20);

      const productos = props.productos.map((producto, index) => [
        index + 1,
        producto.producto.titulo,
        producto.producto.descripcion,
        `${producto.producto.precio} $`,
        producto.cantidad,
        `${producto.totalPrecio} $`,
      ]);

      doc.autoTable({
        head: [["#", "Título", "Descripción", "Precio", "Cantidad", "Total"]],
        body: productos,
        startY: 30,
      });

      // Total
      const totalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(14);
      doc.text(`Total a pagar: ${props.total} $`, 10, totalY);

      doc.save("detalle_compra.pdf");

      props.setProductos([]);
      alert("Compra exitosa");
      navigate("/");
    }
  };

  return (
    <div className={style.container}>
      {/* Esto es un comentario en el render */}
      <h2 className={style.h2}>Carrito de compras</h2>
      <div className={style.padre}>
        <div className={style.producto}>
          {/*Aca se recorre el arreglo de PRODUCTOS para mostrar cada productos con sus respectivos botones y acciones*/}
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
        {/*Aca muestra el total del carrito y esta el boton de FINALIZAR COMPRA*/}
        <div className={style.total}>
          <h2>Total Carrito</h2>
          <h2>Total: {props.total} $</h2>
          <button onClick={handleClick}>Finalizar Compra</button>
        </div>
      </div>
      {/*Este MODAL aparece si no esta logueado el usuario*/}
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
