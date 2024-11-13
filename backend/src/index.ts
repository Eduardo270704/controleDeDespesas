import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/database";
import routes from "./routes";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({}));

// Conectar ao banco de dados
connectDB();

// Middlewares
app.use(bodyParser.json());

// Rotas
app.use(routes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
