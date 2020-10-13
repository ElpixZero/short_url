import React, { useContext } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import 'materialize-css'
import './style.css'
import { AuthContext } from '../../context/AuthContext'

const AuthPage = () => {
	const auth = useContext(AuthContext)
	const { loading, request, error, clearError } = useHttp()
	const message = useMessage()

	const [form, setForm] = React.useState({
		email: '',
		password: '',
	})

	React.useEffect(() => {
		message(error)
		clearError()
	}, [error, message, clearError])

	React.useEffect(() => {
		window.M.updateTextFields()
	}, [])

	const changeHandler = (event) => {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		})
	}

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', { ...form })
			message(data.message)
		} catch (e) {}
	}

	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', { ...form })
			auth.login(data.token, data.userId)
		} catch (e) {}
	}

	return (
		<div className="row">
			<div className=" col s6 offset-s3">
				<h1>Сократи ссылку</h1>
				<div className="card blue darken-1">
					<div className="card-content white-text">
						<span className="card-title">Авторизация</span>
						<div>
							<div className="input-field">
								<input
									placeholder="Введите email"
									id="email"
									name="email"
									type="text"
									className="yellowInput"
									onChange={changeHandler}
									value={form.email}
								/>
								<label htmlFor="email">Email</label>
							</div>
							<div className="input-field">
								<input
									placeholder="Введите пароль"
									id="password"
									name="password"
									type="text"
									className="yellowInput"
									onChange={changeHandler}
									value={form.password}
								/>
								<label htmlFor="password">Password</label>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button
							className="btn yellow darken-4 signInButton"
							disabled={loading}
							onClick={loginHandler}
						>
							Войти
						</button>
						<button
							className="btn grey lighten-1 black-text"
							onClick={registerHandler}
							disabled={loading}
						>
							Регистрация
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AuthPage
