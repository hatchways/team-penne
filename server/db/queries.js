const Pool = require('pg').Pool
require('dotenv').config();

// Put DATABASE_URL in your own .env file.
// DATABASE_URL example: postgres://{username}:{password}@{host}:{port}/{database name}
const databaseConfig = {connectionString: process.env.DATABASE_URL};
const pool = new Pool(databaseConfig);

// Get all the users in the database "user_emails".
const getUsers = (request, response) => {
  pool.query('SELECT * FROM user_emails ORDER BY uid ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Get a single user.
// Requires the user id.
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM user_emails WHERE uid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// Create a new user. 
// Requires the username and corresponding email address (in that order).
// POSSIBLE BUG FIX: createUser currently makes a user and continuously +1 to uid.
  //                 So when the user is deleted, the uid still remains at the previous value, so increments skip numbers.
  //                 e.g. uid1: John, uid2: Phil, uid3: Stephen. 
  //                      >COMMAND: Delete uid2.
  //                      uid1: John, uid3: Stephen
  //                      >COMMAND: Create new user: Bob
  //                      uid1: John, uid3: Stephen, uid4: Bob
const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO user_emails (username, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })

  console.log("New User Created.")
}

// Updates an existing user.
// Requires the existing user id, and BOTH new name and email address (in that order).
// POSSIBLE UPDATE: modify updateUser to accept either name or email address.
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE user_emails SET username = $1, email = $2 WHERE uid = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

// Deletes an existing user.
// Requires the user id.
// POSSIBLE BUG FIX: See createUser(above) comment to see existing bug.
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM user_emails WHERE uid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}