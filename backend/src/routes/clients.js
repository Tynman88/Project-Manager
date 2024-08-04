const express = require('express');
const router = express.Router();
const Client = require('../models/client');
const ChangeLog = require('../models/changeLog');

// Create a new client
router.post('/clients', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const client = await Client.create({ name, email, phone });
    await ChangeLog.create({
      entityId: client.id,
      entityType: 'Client',
      change: `Client created with name: ${name}`,
    });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create client' });
  }
});

// Update an existing client
router.put('/clients/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    const changes = [];
    if (client.name !== name) changes.push(`name: ${client.name} -> ${name}`);
    if (client.email !== email) changes.push(`email: ${client.email} -> ${email}`);
    if (client.phone !== phone) changes.push(`phone: ${client.phone} -> ${phone}`);

    client.name = name;
    client.email = email;
    client.phone = phone;
    await client.save();

    await ChangeLog.create({
      entityId: client.id,
      entityType: 'Client',
      change: `Client updated: ${changes.join(', ')}`,
    });

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update client' });
  }
});

module.exports = router;
