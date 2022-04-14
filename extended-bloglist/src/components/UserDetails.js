import { Link } from 'react-router-dom';

const UserDetails = ({ user }) => {
  return (
    <div>
      <h2>{user.username}</h2>
      <ul style={{ display: 'flex', flexDirection: 'column' }}>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
