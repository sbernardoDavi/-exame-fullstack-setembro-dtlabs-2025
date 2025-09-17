require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/users');
const connectDB = require('./config/db');


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


//Register
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  if(!email || !password) {
    return res.status(400).json({ error: 'Preencha todos os campos' });
  }

  const existingUser = await User.findOne({ email });
  if(existingUser) {
    return res.status(400).json({ error: 'Usuário já existe' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({ email, passwordHash });
  await newUser.save();

  res.status(201).json({ message: 'Usuário criado com sucesso!' });
});

//Get All
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, { passwordHash: 0 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

//login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if(!user) {
    return res.status(400).json({ error: 'Usuário ou senha inválidos' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if(!isPasswordValid) {
    return res.status(400).json({ error: 'Usuário ou senha inválidos' });
  }

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
