const express = require('express');
const userRoutes = require('./src/routes/users');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
