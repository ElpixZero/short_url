const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = async (req, res, next) => {
	if (req.method === 'OPTION') {
		return next()
	}

	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })

		if (!user) {
			throw new Error()
		}

		const isMatch = await bcrypt.compare(password, user.password)

		if (!isMatch) {
			throw new Error()
		}

		req.user = user
		next()
	} catch (e) {
		res.status(401).json({ message: 'Нет аутентификации' })
	}
}
