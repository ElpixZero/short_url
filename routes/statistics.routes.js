const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')

const router = Router()

router.get('/get-users', async (req, res) => {
	try {
		const users = await User.find()
		/*
		const transformedUsers = users.map((user) => ({
			email: user.email,
			count: user.crypts,
		}))
*/
		res.status(200).json({ users })
	} catch (e) {
		console.log(e)
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова.',
		})
	}
})

module.exports = router
