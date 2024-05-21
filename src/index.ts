import express from "express";
import bodyParser from "body-parser";


const app = express();
const PORT = 8000;
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json()); // Usar body-parser en lugar de express.json()
app.use(bodyParser.urlencoded({ extended: true }));


const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('login_docker', 'root', '', {
  host: 'db',
  dialect: 'mysql'
});

Probar()

async function Probar(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

const Usuario = sequelize.define('Usuario', {
  // Definir los campos de la tabla Usuario y sus tipos de datos
  User: {
    type: DataTypes.STRING
  },
  Password: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true, // Esto evita que Sequelize pluralice el nombre de la tabla
  timestamps: false // Esto desactiva las columnas createdAt y updatedAt
});


app.post('/usuario', async (req, res) => {
  console.log(req.body);
  
  try {
    // Crear un nuevo usuario utilizando los datos del cuerpo de la solicitud (req.body)
    const nuevoUsuario = await Usuario.create(req.body);
    
    // Enviar una respuesta con el usuario creado
    res.status(201).json(nuevoUsuario.toJSON());
  } catch (error) {
    // Si ocurre un error, enviar una respuesta de error
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

app.get("/login", async function (req, res) {
  try {
    // Obtén los parámetros de la URL
    const { User, Password } = req.query;

    // Construye la consulta basada en los parámetros
    let usuarios;
    if (User && Password) {
      usuarios = await Usuario.findAll({
        where: {
          User: User,
          Password: Password
        }
      });
    } else {
      // Si no se proporcionan parámetros, obtén todos los usuarios
      usuarios = await Usuario.findAll();
    }

    // Envía la respuesta con los datos obtenidos
    res.json(usuarios);
  } catch (error) {
    // Maneja cualquier error que ocurra durante la consulta
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.listen(PORT, async function () {
  console.log(`App runnint on ${PORT}`);
});
