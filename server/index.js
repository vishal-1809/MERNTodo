const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const UserRoutes = require('./routes/UserRoutes');
const ListRoutes = require('./routes/ListRoutes');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Listening on ${port}...`));

app.use('/api/auth', UserRoutes);
app.use('/api/tasks', ListRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log('error');
    console.log(err.message);
  });