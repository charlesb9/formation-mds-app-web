const express = require('express')
const app = express()
const port = 3000

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/user', require('./routes/user.route'));

app.use('/auth', require('./routes/auth.route'));