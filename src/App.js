import "./App.css";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import Menu from "./components/Menu/Menu";
import NavBar from "./components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Registro from "./components/Registro/Registro";
import ProductosGestion from "./components/ProductosGestion/ProductosGestion";

function App() {
  const [cantidad, setCantidad] = useState(0);
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [emailUser, setEmailUser] = useState(null);
  const [rol, setRol] = useState(2);
  const [productosElectronicos, setProductosElectronicos] = useState([])

  const iniciarSesion = (id, rol) => {
    setEmailUser(id);
    if(rol == 1) adminRol();
  };

  const cerrarSesion = () => {
    setEmailUser(null);
    userRol();
    setCantidad(0);
    setProductos([]);
    setTotal(0);
  };

  const adminRol = () => {
    setRol(1);
  }

  const userRol = () =>{
    setRol(2);
  }

  const { pathname } = useLocation();

  const addToCart = (id) => {
    const ids = productos.map((producto) => producto.producto.idproducto);
    if (ids.includes(id)) {
      const productoNew = productos.map((producto) => {
        if (producto.producto.idproducto == id) {
          producto.cantidad = producto.cantidad + 1;
          producto.totalPrecio = producto.cantidad * producto.producto.precio;
        }

        return producto;
      });
      setProductos(productoNew);
    } else {
      const producto = productosElectronicos.filter(
        (producto) => producto.idproducto == id
      );
      setProductos([
        ...productos,
        { cantidad: 1, producto: producto[0], totalPrecio: producto[0].precio },
      ]);
    }
  };

  const deleteToCart = (id) => {
    const productoNew = productos.map((producto) => {
      if (producto.producto.idproducto == id && producto.cantidad > 0) {
        producto.cantidad = producto.cantidad - 1;
        producto.totalPrecio = producto.cantidad * producto.producto.precio;
      }

      return producto;
    });
    setProductos(productoNew);
  };

  const sacarCart = (id) => {
    const productosNew = productos.filter(
      (producto) => producto.producto.idproducto != id
    );
    setProductos(productosNew);
  };

  useEffect(() => {
    let suma = 0;
    productos.forEach((producto) => {
      suma += Number(producto.totalPrecio);
    });
    setTotal(suma);

    let sumaCantidad = 0;
    productos.forEach((producto) => {
      sumaCantidad += producto.cantidad;
    });
    setCantidad(sumaCantidad);
  }, [productos]);

  return (
    <div className="App">
      <NavBar
        cantidad={cantidad}
        emailUser={emailUser}
        cerrarSesion={cerrarSesion}
        rol={rol}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Menu
              productosElectronicos={productosElectronicos}
              setProductosElectronicos={setProductosElectronicos}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              productos={productos}
              total={total}
              addToCart={addToCart}
              deleteToCart={deleteToCart}
              sacarCart={sacarCart}
              emailUser={emailUser}
            />
          }
        />

        <Route
          path="/login"
          element={<Login iniciarSesion={iniciarSesion} />}
        />

        <Route path="/registro" element={<Registro />} />

        <Route path="/productos" element={<ProductosGestion setProductosElectronicos={setProductosElectronicos} productosElectronicos={productosElectronicos} rol={rol} />} />
      </Routes>
    </div>
  );
}

export default App;
