// Include packages
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const checkoutUser = require('./checkout_user')

const app = express()
const port = 3000

// Set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// Set middleware
app.use(bodyParser.urlencoded({ extended: true }))

// Set routes to home
app.get('/', (req, res) => {
  const user = req.query.user
  res.render('index', { user })
})

// Set route to login
app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', (req, res) => {
  const account = req.body
  const result = checkoutUser(account)

  if (result.status === 200) {
    res.redirect(`/?user=${result.user}`)
  } else {
    res.status(401).render('login', { account })
  }
})

// Listen to server
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`)
})
