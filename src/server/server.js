const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

// Configuración de la base de datos
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "proyecto",
  password: "alexis123",
  port: 5433,
});

const app = express();
const PORT = 3003;

// Middleware
app.use(bodyParser.json());

// Ruta para el inicio de sesión
app.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND pass = $2",
      [email, pass]
    );

    if (result.rows.length > 0) {
      // Usuario autenticado, genera un token JWT
      const token = jwt.sign({ email: result.rows[0].email }, "secret_key");
      res
        .status(200)
        .json({
          message: "Inicio de sesión exitoso",
          token,
          id: result.rows[0].email,
          rol: result.rows[0].rol,
        });
    } else {
      res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
});

app.post("/registro", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const result1 = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result1.rowCount > 0) {
      // Usuario repetido
      res.status(200).json({
        message: "Registro repetido",
        repetido: true,
      });
    } else {
      const result = await pool.query(
        "INSERT INTO users(email, pass, rol) VALUES ($1, $2, 2)",
        [email, pass]
      );

      if (result.rowCount > 0) {
        // Usuario registrado
        res.status(200).json({
          message: "Registro exitoso",
          repetido: false,
        });
      } else {
        res.status(401).json({ message: "Error al registrar" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
});

app.post("/addproducto", async (req, res) => {
  //Recibe datos
  const { img, precio, titulo, descripcion } = req.body;
  try {
    //Guardar el producto en la base de datos
    const result = await pool.query(
      "INSERT INTO productos(img, precio, titulo, descripcion) VALUES ($1, $2, $3, $4)",
      [img, Number(precio), titulo, descripcion]
    );

    //Seleccionar todos los productos para su posterior muestreo
    const result1 = await pool.query("SELECT * FROM productos");

    if (result.rowCount > 0) {
      //Retornar el estado de la peticion y los datos
      res.status(200).json({
        message: "Registro exitoso",
        datos: result1.rows,
      });
    } else {
      res.status(401).json({ message: "Error al registrar productos" });
    }
    //Esta se ejecuta solo si ocurrio un error
  } catch (error) {
    console.error("Error al registrar productos:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

app.post("/consultaproductos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM productos");

    res.status(200).json({
      message: "Consulta exitoso",
      datos: result.rows,
    });
  } catch (error) {
    console.error("Error al consultar productos:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
