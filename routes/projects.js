const router = require('express').Router();
let Project = require('../models/Project.model');

router.route('/').get((req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const status = req.body.status;

    const newProject = new Project({name, description, status});

    newProject.save()
        .then(() => res.json('Project added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
