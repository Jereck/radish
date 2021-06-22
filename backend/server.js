require('./api/models/porkModel')

const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet());
app.use(express.json());

const routes = require('./api/routes/porkRoutes');
routes(app);

app.listen(process.env.PORT, () => {console.log(`Listening on port: ${PORT}`)})