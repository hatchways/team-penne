const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Welcome to Database testing. Testing can be done via another terminal. Check SETUP.md for details.'})

})

// examples of data retrieval from the database for testing
app.get('/user_emails', db.getUsers)
app.get('/user_emails/:id', db.getUserById)
app.post('/user_emails', db.createUser)
app.put('/user_emails/:id', db.updateUser)
app.delete('/user_emails/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})