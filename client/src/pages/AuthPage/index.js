import React from 'react';
import {useHttp} from '../../hooks/http.hook';
import {useMessage} from '../../hooks/message.hook';
import 'materialize-css';
import './style.css';

const AuthPage = () => {
  const {loading, request, error, clearError} = useHttp();
  const message = useMessage();

  const [form, setForm] = React.useState({
    email: '',
    password: ''
  });

  React.useEffect( () => {
    console.log('effect', error);
    message(error);
  }, [error, message])

  const changeHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const registerHandle = async () => {
    try{
      const data = request('/api/auth/register', 'POST', {...form});
      console.log(data);
    } catch(e) {

    }
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
                  />
                <label htmlFor="password">Password</label>
              </div>
              </div>
            </div>
            <div className="card-action">
              <button 
                className="btn yellow darken-4 signInButton"
                disabled={loading}
              >Войти</button>
              <button 
                className="btn grey lighten-1 black-text"
                onClick={registerHandle}
                disabled={loading}
              >Регистрация</button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default AuthPage;
