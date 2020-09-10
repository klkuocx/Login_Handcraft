// Include packages
const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

// Set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// Set routes
app.get('/', (req, res) => {
  res.redirect('login')
})

app.get('/login', (req, res) => {
  res.render('login')
})

// Listen to server
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`)
})
