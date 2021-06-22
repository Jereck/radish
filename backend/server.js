require('./api/models/porkModel')

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 5001

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const routes = require('./api/routes/porkRoutes');
routes(app);

app.listen(PORT, () => {console.log(`Listening on port: ${PORT}`)})