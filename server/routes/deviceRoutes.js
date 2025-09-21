const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middleware/authMiddleware');
const Device = require('../models/device');


router.post('/devices', authMiddleware, async (req, res) => {
  const { name, location, sn, description } = req.body;

  if (!name || !location || !sn) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
  }

  if (!/^\d{12}$/.test(sn)) {
    return res.status(400).json({ error: 'SN deve conter exatamente 12 dígitos numéricos' });
  }

  try {
    const newDevice = new Device({
      uuid: uuidv4(),
      name,
      location,
      sn,
      description,
      user_id: req.user.id
    });

    await newDevice.save();
    res.status(201).json(newDevice);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar dispositivo', details: err.message });
  }
});

router.get('/devices', authMiddleware, async (req, res) => {
  try {
    const devices = await Device.find({ user_id: req.user.id });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar dispositivos' });
  }
});

router.put('/devices/:id', async (req, res) => {
  const { name, location, sn, description } = req.body;

  try {
    const updatedDevice = await Device.findOneAndUpdate(
      { uuid: req.params.id},
      { name, location, sn, description },
      { new: true }
    );

    if (!updatedDevice) {
      return res.status(404).json({ error: 'Dispositivo não encontrado ou acesso negado' });
    }

    res.json(updatedDevice);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar dispositivo' });
  }
});


router.delete('/devices/:id', authMiddleware, async (req, res) => {
  try {
    const result = await Device.findOneAndDelete({ uuid: req.params.id});

    if (!result) {
      return res.status(404).json({ error: 'Dispositivo não encontrado ou acesso negado' });
    }

    res.json({ message: 'Dispositivo removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover dispositivo' });
  }
});

module.exports = router;
