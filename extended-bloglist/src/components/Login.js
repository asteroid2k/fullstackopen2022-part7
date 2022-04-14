import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';
import { login } from '../reducers/authReducer';
import { notify } from '../reducers/notificationReducer';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { default: username, reset: usernameReset } = useField('text');
  const { default: password, reset: passwordReset } = useField('password');

  const clearForm = () => {
    usernameReset();
    passwordReset();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login({ username: username.value, password: password.value }));
    dispatch(notify(`Logged in as ${username.value}`));
    clearForm();
    navigate('/');
  };

  return (
    <form
      className="form"
      style={{ maxWidth: '400px', marginBlock: '30px' }}
      id="login-form"
      onSubmit={handleSubmit}
    >
      <div className="f-g">
        <label htmlFor="username">Username</label>
        <input id="username" {...username} />
      </div>
      <div className="f-g">
        <label htmlFor="password">Password</label>
        <input id="password" {...password} />
      </div>
      <button className="cat" id="login-btn" type="submit">
        Login
      </button>
    </form>
  );
};
export default Login;
