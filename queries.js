const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER by uID ASC', (err, results) => {
	if (err) {
	    throw err
	}
	res.status(200).json(results.rows)
    })
}

const getUserByID = (req, res) => {
    const userID = parseInt(request.params.userID)
    pool.query('SELECT * FROM users WHERE uID = $1', [userID], (err, results) => {
	if (err) {
	    throw err
	}
	res.status(200).json(results.rows)
    })
}

const deleteUser = (req, res) => {
    const userID = parseInt(request.params.userID)
    pool.query('DELETE FROM users WHERE uID = $1', [userID], (err, results) => {
	if (err) {
	    throw err
	}
	res.status(200).send(`User deleted with uID: ${userID}`)
    })
}

module.exports = {
    getUsers,
    getUserByID,
    deleteUser,
}
