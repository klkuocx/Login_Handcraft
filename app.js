// Include packages
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const morgan = require('morgan')
const checkoutUser = require('./checkout_user')

const app = express()
const port = 3000

// Set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// set morgan to log info about our requests for development use.
app.use(morgan('dev'))

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }))

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser())

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'someRandomStuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 6000000
  }
}))

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid')
  }
  next()
})


// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    const account = req.session.user
    const result = checkoutUser(account)
    const user = result.user
    res.redirect(`/dashboard?user=${user}`)
  } else {
    next()
  }
}

// Set routes to home
app.get('/', sessionChecker, (req, res) => {
  res.redirect('/login')
})

// Set route to login
app.get('/login', sessionChecker, (req, res) => {
  res.render('login')
})

app.post('/login', (req, res) => {
  const account = req.body
  const result = checkoutUser(account)

  if (result.status === 200) {
    req.session.user = account
    res.redirect(`/dashboard?user=${result.user}`)
  } else {
    res.status(401).render('login', { account })
  }
})

// route for user's dashboard
app.get('/dashboard', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    const user = req.query.user
    res.render('dashboard', { user })
  } else {
    res.redirect('/login')
  }
})


// route for user logout
app.get('/logout', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid')
    res.redirect('/')
  } else {
    res.redirect('/login')
  }
})

// Listen to server
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`)
})
