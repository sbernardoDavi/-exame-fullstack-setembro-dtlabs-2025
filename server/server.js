require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');


//ENV   
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

//APP
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

//MongoDB
connectDB();

//Rotas
app.use('/api', userRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
