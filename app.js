require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Database
const db = require('./config/database');

// Test database
db.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

const proposalRoutes = require('./api/routes/proposals');
const voteRoutes = require('./api/routes/votes');
const eventRoutes = require('./api/routes/events');
const attenderRoutes = require('./api/routes/attenders');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

// Root route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to the Solon API!' });
});

// Routes which should handle requests
app.use('/proposals', proposalRoutes);
app.use('/votes', voteRoutes);
app.use('/events', eventRoutes);
app.use('/attenders', attenderRoutes);

// Not found errors for undefined routes
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

// Internal server errors
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		message: 'Error',
		error: {
			errorMessage: error.message
		}
	});
});

module.exports = app;
