import { useDispatch } from 'react-redux';
import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogReducer';
import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';
import { useSelector } from 'react-redux';

const BlogDetails = ({ blog }) => {
  const { default: comment, reset: resetComment } = useField('text');
  const user = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLike = () => {
    dispatch(likeBlog(blog.id));
  };
  const handleDelete = () => {
    dispatch(deleteBlog(blog.id));
    navigate('/');
  };
  const handleComment = (event) => {
    event.preventDefault();
    dispatch(commentBlog({ id: blog.id, comment: comment.value }));
    resetComment();
  };
  return (
    <div>
      {blog ? (
        <div className="blog-details">
          <div
            style={{
              marginBottom: '20px',
              display: 'flex',
              gap: '10px',
              flexDirection: 'column',
            }}
          >
            <div className="blog-headline">
              <p className="title">{blog.title}</p>
              <p className="author">by {blog.author}</p>
            </div>
            <a href={blog.url} className="url">
              Read more
            </a>
            <span
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <p className="likes">{blog.likes} likes</p>
              <button
                style={{ fontSize: '0.9rem', paddingInline: '0.5rem' }}
                className="like-btn"
                onClick={handleLike}
              >
                like
              </button>
            </span>
            <p>added by {blog.user.username}</p>
            {user === blog.user.username && (
              <button
                className="delete-btn"
                style={{
                  border: '1px solid red',
                  fontSize: '0.9rem',
                  maxWidth: '80px',
                  marginTop: '20px',
                }}
                onClick={handleDelete}
              >
                Remove
              </button>
            )}
          </div>
          <hr />
          <div style={{ margin: '10px 30px' }}>
            <h4>Comments</h4>
            <ul>
              {blog.comments.map((comment) => (
                <li className="comment" key={comment}>
                  {comment}
                </li>
              ))}
            </ul>
          </div>
          <form
            onSubmit={handleComment}
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <input
              style={{ width: '200px', padding: '5px' }}
              type="text"
              id="comment"
              {...comment}
            />
            <button type="submit">comment</button>
          </form>
        </div>
      ) : (
        <h2>Blog not found</h2>
      )}
    </div>
  );
};

export default BlogDetails;
