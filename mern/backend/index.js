const express = require('express')
const app = express()
const port = 5000
const connectDB = require("./db")
connectDB();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Option, Authorization');
  return next();
})

app.use(express.json())

app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/DisplayData"))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON');
    return res.status(400).send({ error: 'Invalid JSON' });
  }
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})