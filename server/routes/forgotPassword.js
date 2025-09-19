const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

function generateRandomPassword(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}


router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'Usuário não encontrado' });
  }

  const newPassword = generateRandomPassword();
  const passwordHash = await bcrypt.hash(newPassword, 10);
  user.passwordHash = passwordHash;
  await user.save();


  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Sua nova senha de acesso',
    text: `Olá!\n\nSua nova senha de acesso é: ${newPassword}\n\nAtenciosamente,\nEquipe`,
  };


  try {
    //console.log(mailOptions)
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Nova senha enviada por e-mail com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao enviar e-mail' });
  }
});

module.exports = router;
