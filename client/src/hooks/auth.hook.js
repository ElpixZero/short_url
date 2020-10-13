import { useState, useCallback, useEffect } from 'react'
const USER_DATA_STORAGE_NAME = 'userData'
export const useAuth = () => {
	const [token, setToken] = useState(null)
	const [userId, setUserId] = useState(null)
	const [ready, setReady] = useState(false)

	const login = useCallback((jwtToken, userId) => {
		setToken(jwtToken)
		setUserId(userId)

		localStorage.setItem(
			USER_DATA_STORAGE_NAME,
			JSON.stringify({
				userId: jwtToken,
				token: userId,
			})
		)
	}, [])

	const logout = useCallback(() => {
		setToken(null)
		setUserId(null)
		localStorage.removeItem(USER_DATA_STORAGE_NAME)
	}, [])

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_NAME))
		if (data && data.token) {
			login(data.token, data.userId)
		}
		setReady(true)
	}, [login])

	return {ready, login, logout, token, userId }
}
