const { Router } = require('express')
const User = require('../models/User')
const cliAuth = require('../middleware/cli.auth.middleware')
const router = Router()

router.post('/crypt', cliAuth, async (req, res) => {
	try {
		console.log(req.user._id)
		const user = await User.findOne(req.user._id)

		user.crypts.push({ date: new Date() })

		await user.save()
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
