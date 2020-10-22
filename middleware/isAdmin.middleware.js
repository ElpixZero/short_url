const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = async (req, res, next) => {
	try {
		console.log('req.user', req.user)
		const user = await User.findById(req.user.userId)
		console.log('user', user)
		if (!user.isAdmin) {
			throw new Error()
		}

		req.user = user
		next()
	} catch (e) {
		console.log('error', e)
		res.status(401).json({ message: 'Нет авторизации' })
	}
}
