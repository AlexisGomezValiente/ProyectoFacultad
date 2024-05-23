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
  console.log(localStorage)
  const [emailUser, setEmailUser] = useState(null);
  const [cantidad, setCantidad] = useState(() => {
    return parseInt(localStorage.getItem(`cantidad_${emailUser}`)) || 0;
  });
  const [productos, setProductos] = useState(() => {
    return JSON.parse(localStorage.getItem(`productos_${emailUser}`)) || [];
  });
  const [total, setTotal] = useState(() => {
    return parseInt(localStorage.getItem(`total_${emailUser}`)) || 0;
  });
  const [rol, setRol] = useState(2);
  const [productosElectronicos, setProductosElectronicos] = useState([]);

  const iniciarSesion = (id, rol, obj) => {
    setEmailUser(id);
    if (rol === 1) adminRol();

    setCantidad(obj.cantidad ? obj.cantidad : 0)
    setTotal(obj.total ? obj.total : 0)
    setProductos(obj.products ? obj.products : [])
  };

  const cerrarSesion = () => {
    // Guardar los datos del carrito en localStorage
    localStorage.setItem(`productos_${emailUser}`, JSON.stringify(productos));
    localStorage.setItem(`total_${emailUser}`, total);
    localStorage.setItem(`cantidad_${emailUser}`, cantidad);
    localStorage.setItem(`email_${emailUser}`, emailUser);

    setEmailUser(null);
    userRol();
    setCantidad(0);
    setProductos([]);
    setTotal(0);
    localStorage.removeItem("token");
  };

  const adminRol = () => {
    setRol(1);
  };

  const userRol = () => {
    setRol(2);
  };

  const { pathname } = useLocation();

  const addToCart = (id) => {
    const actualizarProductos = (id) => {
      const ids = productos.map((producto) => producto.producto.idproducto);
      if (ids.includes(id)) {
        const productoNew = productos.map((producto) => {
          if (producto.producto.idproducto === id) {
            producto.cantidad = producto.cantidad + 1;
            producto.totalPrecio = producto.cantidad * producto.producto.precio;
          }
          return producto;
        });
        setProductos(productoNew);
      } else {
        const producto = productosElectronicos.find(
          (producto) => producto.idproducto === id
        );
        setProductos([
          ...productos,
          {
            cantidad: 1,
            producto: producto,
            totalPrecio: producto.precio,
          },
        ]);
      }
    };

    actualizarProductos(id);
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
    if (productos !== null) {
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
  
      if(localStorage.getItem('token')){
        localStorage.setItem(`productos_${emailUser}`, JSON.stringify(productos))
      }
    }
  }, [productos]);

  useEffect(() => {
    // Almacenar en localStorage después de actualizar total y cantidad
    if (localStorage.getItem("token")) {
      localStorage.setItem(`total_${emailUser}`, total);
      localStorage.setItem(`cantidad_${emailUser}`, cantidad);
    }
  }, [total, cantidad]);

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

        <Route
          path="/productos"
          element={
            <ProductosGestion
              setProductosElectronicos={setProductosElectronicos}
              productosElectronicos={productosElectronicos}
              rol={rol}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
