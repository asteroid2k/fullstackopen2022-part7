import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <div className="blog-post">
      <Link to={`/blogs/${blog.id}`}>
        <p className="link blog-headline">
          <span className="title">{blog.title}</span>
          <span className="author">by {blog.author}</span>
        </p>
      </Link>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
