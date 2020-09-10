function checkoutUser(client) {
  // Define users data
  const users = [
    {
      firstName: 'Tony',
      email: 'tony@stark.com',
      password: 'iamironman'
    },
    {
      firstName: 'Steve',
      email: 'captain@hotmail.com',
      password: 'icandothisallday'
    },
    {
      firstName: 'Peter',
      email: 'peter@parker.com',
      password: 'enajyram'
    },
    {
      firstName: 'Natasha',
      email: 'natasha@gamil.com',
      password: '*parol#@$!'
    },
    {
      firstName: 'Nick',
      email: 'nick@shield.com',
      password: 'password'
    }
  ]

  // Checkout client
  const result = users.find(user => user.email === client.email && user.password === client.password)

  // Define response
  const response = {
    user: null,
    status: 100
  }

  if (result) {
    response.user = result.firstName
    response.status = 200
  } else {
    response.status = 401
  }

  return response
}

module.exports = checkoutUser
