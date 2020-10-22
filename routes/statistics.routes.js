const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const Auth = require('../middleware/auth.middleware')
const isAdmin = require('../middleware/isAdmin.middleware')

const router = Router()

router.get('/get-users', Auth, isAdmin, async (req, res) => {
	try {
		const users = await User.find()

		const transformedUsers = users.map((user) => ({
			email: user.email,
			count: user.crypts.length,
		}))

		res.status(200).json(transformedUsers)
	} catch (e) {
		console.log(e)
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова.',
		})
	}
})

module.exports = router
