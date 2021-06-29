// Framework for API
const express = require('express');

// Security Framework
const helmet = require('helmet');

// Initializes App
const app = express();

// Initializing Helmet
app.use(helmet());
app.use(express.json());

const routes = require('./api/routes/porkRoutes');
routes(app);

app.listen(process.env.PORT, () => {console.log(`Listening on port: ${PORT}`)})