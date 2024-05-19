import "./App.css";
import Cart from "./components/Cart/Cart";
import Menu from "./components/Menu/Menu";
import NavBar from "./components/NavBar/NavBar";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [cantidad, setCantidad] = useState(0);
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  const productosElectronicos = [
    {
      id: 1,
      image: "https://example.com/images/producto1.jpg",
      price: 299.99,
      title: "Smartphone",
      description:
        "Smartphone con pantalla de 6.5 pulgadas y 128GB de almacenamiento.",
    },
    {
      id: 2,
      image: "https://example.com/images/producto2.jpg",
      price: 199.99,
      title: "Tablet",
      description:
        "Tablet con pantalla de 10 pulgadas y 64GB de almacenamiento.",
    },
    {
      id: 3,
      image: "https://example.com/images/producto3.jpg",
      price: 99.99,
      title: "Auriculares Inalámbricos",
      description: "Auriculares inalámbricos con cancelación de ruido.",
    },
    {
      id: 4,
      image: "https://example.com/images/producto4.jpg",
      price: 499.99,
      title: "Portátil",
      description: "Portátil con procesador Intel i7 y 16GB de RAM.",
    },
    {
      id: 5,
      image: "https://example.com/images/producto5.jpg",
      price: 79.99,
      title: "Smartwatch",
      description: "Smartwatch con monitor de ritmo cardíaco y GPS integrado.",
    },
    {
      id: 6,
      image: "https://example.com/images/producto6.jpg",
      price: 149.99,
      title: "Cámara Digital",
      description: "Cámara digital de 20MP con lente zoom de 10x.",
    },
    {
      id: 7,
      image: "https://example.com/images/producto7.jpg",
      price: 249.99,
      title: "Consola de Videojuegos",
      description:
        "Consola de videojuegos con 1TB de almacenamiento y dos mandos.",
    },
    {
      id: 8,
      image: "https://example.com/images/producto8.jpg",
      price: 39.99,
      title: "Altavoz Bluetooth",
      description: "Altavoz Bluetooth portátil con sonido envolvente.",
    },
    {
      id: 9,
      image: "https://example.com/images/producto9.jpg",
      price: 299.99,
      title: "Monitor 4K",
      description: "Monitor 4K de 27 pulgadas con tecnología HDR.",
    },
    {
      id: 10,
      image: "https://example.com/images/producto10.jpg",
      price: 129.99,
      title: "Router WiFi",
      description: "Router WiFi de alta velocidad con cobertura de 2000 sq ft.",
    },
  ];

  const addToCart = (id) => {
    const ids = productos.map((producto) => producto.producto.id);
    if (ids.includes(id)) {
      const productoNew = productos.map((producto) => {
        if (producto.producto.id == id) {
          producto.cantidad = producto.cantidad + 1;
          producto.totalPrecio = producto.cantidad * producto.producto.price;
        }

        return producto;
      });
      setProductos(productoNew);
    } else {
      const producto = productosElectronicos.filter(
        (producto) => producto.id == id
      );
      setProductos([
        ...productos,
        { cantidad: 1, producto: producto[0], totalPrecio: producto[0].price },
      ]);
    }
  };

  const deleteToCart = (id) => {
    const productoNew = productos.map((producto) => {
      if (producto.producto.id == id && producto.cantidad > 0) {
        producto.cantidad = producto.cantidad - 1;
        producto.totalPrecio = producto.cantidad * producto.producto.price;
      }

      return producto;
    });
    setProductos(productoNew);
  };

  const sacarCart = (id) => {
    const productosNew = productos.filter(producto => producto.producto.id != id);
    setProductos(productosNew);
  }

  useEffect(() => {
    let suma = 0;
    productos.forEach((producto) => {
      suma += producto.totalPrecio;
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
      <NavBar cantidad={cantidad} />
      <Routes>
        <Route
          path="/"
          element={
            <Menu
              productosElectronicos={productosElectronicos}
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
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
