import { useEffect } from 'react';
import Notification from './components/Notification';
import { useDispatch } from 'react-redux';
import { initializeAuth, logout } from './reducers/authReducer';
import { useSelector } from 'react-redux';
import Home from './components/Home';
import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import BlogDetails from './components/BlogDetails';
import { initializeBlogs } from './reducers/blogReducer';
import { getUser } from './reducers/userReducer';
import Login from './components/Login';
import Users from './components/Users';
import UserDetails from './components/UserDetails';

const Nav = ({ user, logoff }) => {
  return (
    <nav className="nav">
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
      </div>
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <p>{user.username}</p>
          <button onClick={logoff} className="text-sm">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);
  const loggedIn = auth && 'token' in auth;

  useEffect(() => {
    dispatch(initializeAuth());
  }, []);
  useEffect(() => {
    if (!loggedIn) {
      return;
    }
    dispatch(initializeBlogs());
    dispatch(getUser(auth.username));
  }, [loggedIn]);

  const logoff = () => {
    dispatch(logout());
    navigate('/');
  };

  const blogMatch = useMatch('blogs/:id');
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;
  const userMatch = useMatch('users/:id');
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  return (
    <div>
      <Nav user={auth} logoff={logoff} />
      <Notification />
      <div className="cont">
        <h2 className="chonky">{loggedIn ? 'Blogs' : 'Log In'}</h2>
        <Routes>
          <Route path="/" element={loggedIn ? <Home /> : <Login />} />
          <Route path="blogs/:id" element={<BlogDetails blog={blog} />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserDetails user={user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
