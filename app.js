const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))
;(async function start() {
	try {
		const mongoUrl = config.get('mongoUrl')
		const PORT = config.get('port') || 5000

		await mongoose.connect(mongoUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		app.listen(PORT, () => {
			console.log(`App has been started on ${PORT}`)
		})
	} catch (e) {
		console.log(`Servor Error: ${e.message}`)
		process.exit(1)
	}
})()

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))
