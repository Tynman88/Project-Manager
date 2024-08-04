const express = require('express');
const sequelize = require('./config/database'); // Import the Sequelize instance
const Project = require('./models/project'); // Import your model
const projectRoutes = require('./routes/projects'); // Import your routes

const app = express();
app.use(express.json());

app.use('/api', projectRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }) // Sync the database
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database', err);
  });
