const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const ChangeLog = require('../models/changeLog');

// Create a new project
router.post('/projects', async (req, res) => {
  const { name, client, startDate, endDate, description } = req.body;
  try {
    const project = await Project.create({ name, client, startDate, endDate, description });
    await ChangeLog.create({
      entityId: project.id,
      entityType: 'Project',
      change: `Project created with name: ${name}`,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update an existing project
router.put('/projects/:id', async (req, res) => {
  const { id } = req.params;
  const { name, client, startDate, endDate, description } = req.body;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const changes = [];
    if (project.name !== name) changes.push(`name: ${project.name} -> ${name}`);
    if (project.client !== client) changes.push(`client: ${project.client} -> ${client}`);
    if (project.startDate !== startDate) changes.push(`startDate: ${project.startDate} -> ${startDate}`);
    if (project.endDate !== endDate) changes.push(`endDate: ${project.endDate} -> ${endDate}`);
    if (project.description !== description) changes.push(`description: ${project.description} -> ${description}`);

    project.name = name;
    project.client = client;
    project.startDate = startDate;
    project.endDate = endDate;
    project.description = description;
    await project.save();

    await ChangeLog.create({
      entityId: project.id,
      entityType: 'Project',
      change: `Project updated: ${changes.join(', ')}`,
    });

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

module.exports = router;
