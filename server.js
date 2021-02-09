const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
//connecting to mongoDB
connectDB();

//middleware to access body data
app.use(express.json({ extended: false }));
app.use(cors());
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the test project' });
});

//defining routes
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
