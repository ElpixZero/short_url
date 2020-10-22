const { Router } = require('express')
const Crypt = require('../models/Crypt')
const cliAuth = require('../middleware/cli.auth.middleware')
const router = Router()

router.post('/crypt', cliAuth, async (req, res) => {
	try {
		const crypt = new Crypt({
			date: new Date(),
			author: req.user._id,
		})

		await crypt.save()

		console.log(req.user._id, crypt.author)

		res
			.status(201)
			.json({ sault: req.user.sault, cryptString: req.user.cryptString })
	} catch (e) {
		console.log(e)
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова.',
		})
	}
})

module.exports = router
