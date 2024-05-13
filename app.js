const express = require('express')
const app = express();

let moviesRouter = require('./routers/moviesRouter')

app.use(express.json())
app.use('/api/v1/movies', moviesRouter)

module.exports = app