// backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Rotas
const userRoutes = require('./src/routes/userRoutes');
const activityRoutes = require('./src/routes/activityRoutes');
const noteRoutes = require('./src/routes/noteRoutes');
const financeRoutes = require('./src/routes/financeRoutes');
// const badgeRoutes = require('./src/routes/badgeRoutes'); // se usar badges

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/finances', financeRoutes);
// app.use('/api/badges', badgeRoutes); // se usar badges

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
