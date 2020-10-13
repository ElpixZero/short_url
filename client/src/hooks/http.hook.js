import { useState, useCallback } from 'react'
import { useAuth } from './auth.hook'

export const useHttp = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const { logout } = useAuth()

	const request = useCallback(
		async (url, method = 'GET', body = null, headers = {}) => {
			setLoading(true)

			try {
				if (body) {
					body = JSON.stringify(body)
					headers['Content-Type'] = 'application/json'
				}

				const response = await fetch(url, { method, body, headers })
				const data = await response.json()
				if (!response.ok) {
					console.log(response)
					if (response.status === 401) {
						logout()
					}
					throw new Error(data.message || 'Что-то пошло не так')
				}

				return data
			} catch (e) {
				setError(e.message)
			} finally {
				setLoading(false)
			}
		},
		[logout]
	)

	const clearError = useCallback(() => setError(null), [])

	return {
		loading,
		request,
		error,
		clearError,
	}
}
