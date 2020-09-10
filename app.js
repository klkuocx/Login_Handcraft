// Include packages
const express = require('express')

const app = express()
const port = 3000

// Set routes
app.get('/', (req, res) => {
  res.send('Login Handcraft is coming soon!!')
})

// Listen to server
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`)
})
