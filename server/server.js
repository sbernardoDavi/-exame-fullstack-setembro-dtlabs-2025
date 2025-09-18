require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const deviceRoutes = require('./routes/deviceRoutes');


//ENV   
const PORT = process.env.PORT;

//APP
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

//MongoDB
connectDB();

//Rotas
app.use('/api', userRoutes);
app.use('/api/devices', deviceRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
