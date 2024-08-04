const express = require('express');
const router = express.Router();
const ChangeLog = require('../models/changeLog');

// Get change logs
router.get('/changeLogs', async (req, res) => {
  const { entityId, entityType } = req.query;
  try {
    const changeLogs = await ChangeLog.findAll({
      where: { entityId, entityType },
      order: [['timestamp', 'DESC']],
    });
    res.status(200).json(changeLogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch change logs' });
  }
});

module.exports = router;
