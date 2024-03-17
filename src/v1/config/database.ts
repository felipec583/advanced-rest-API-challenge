import pg from "pg";
import "dotenv/config";
const { Pool } = pg;


// Crear un nuevo grupo de conexiones (pool) para interactuar con la base de datos
const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  allowExitOnIdle: true,
});

// Funcion para checkear coneccion a la db
const connectToDatabase = async () => {
  try {
    const client = await pool.connect();
    const res = await client.query("SELECT NOW()");
    console.log("DB CONNECTED. Current time:", res.rows[0].now);
    client.release(); // Liberar cliente despues de su uso
  } catch (error: any) {
    console.error("Error connecting to the database:", error.message);
    throw error;
  }
};

connectToDatabase();

export default pool;
