import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { createBlog } from '../reducers/blogReducer';
import { notify } from '../reducers/notificationReducer';

const AddBlog = ({ toggleRef }) => {
  const dispatch = useDispatch();
  const { default: title, reset: titleReset } = useField('text');
  const { default: author, reset: authorReset } = useField('text');
  const { default: url, reset: urlReset } = useField('text');

  const clearForm = () => {
    titleReset();
    authorReset();
    urlReset();
    toggleRef.current.toggleVisibility();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      })
    );
    clearForm();
    const msg =
      title.value.length > 25 ? title.value.slice(0, 25) : title.value;
    dispatch(notify(`Blog added: ${msg}`));
  };

  return (
    <form
      className="form"
      style={{ maxWidth: '500px', margin: '0.5rem auto' }}
      onSubmit={handleSubmit}
    >
      <div className="f-g">
        <label htmlFor="title">Title</label>
        <input type="text" {...title} />
      </div>
      <div className="f-g">
        <label htmlFor="author">Author</label>
        <input type="text" {...author} />
      </div>
      <div className="f-g">
        <label htmlFor="url">Url</label>
        <input type="text" {...url} />
      </div>
      <button className="cat" id="post-btn" type="submit">
        Post
      </button>
    </form>
  );
};
export default AddBlog;
