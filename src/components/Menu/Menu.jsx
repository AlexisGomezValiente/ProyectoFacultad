import Carrusel from "../Carrusel/Carrusel";
import Producto from "../Producto/Producto";
import style from "./Menu.module.css";
import { useEffect } from "react";

const Menu = (props) => {
  useEffect(()=>{
    const consulta = async () =>{
      try {
        const response = await fetch("/consultaproductos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        });
  
        const res = await response.json();
  
        if (response.ok) {
          props.setProductosElectronicos(res.datos)
        } else {
          alert("Error al consultar productoss");
        }
      } catch (error) {
        console.error("Error al consultar producto:", error);
      }
    }

    consulta();
  },[])

  return (
    <div>
      <Carrusel />

      {props.productosElectronicos.length ? (
        <div className={style.prod}>
          <div className={style.title}>
            <h2>Productos Recomendados</h2>
          </div>
          {props.productosElectronicos.map((producto) => {
            return (
              <Producto
                id={producto.idproducto}
                title={producto.titulo}
                img={producto.img}
                precio={producto.precio}
                desc={producto.descripcion}
                add={props.add}
                addToCart={props.addToCart}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Menu;
