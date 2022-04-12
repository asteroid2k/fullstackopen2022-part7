import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = (props) => {
  const { default: content, reset: contentReset } = useField("text");
  const { default: author, reset: authorReset } = useField("text");
  const { default: info, reset: infoReset } = useField("text");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    notify(
      `Anecdote created: ${
        content.value.length > 25 ? content.value.slice(0, 25) : content.value
      }`
    );
    navigate("/");
  };
  const notify = (msg) => {
    clearTimeout(window.notif);
    props.setNotification(msg);
    window.notif = setTimeout(() => props.setNotification(""), 5000);
  };

  const resetForm = (e) => {
    e.preventDefault();
    contentReset();
    authorReset();
    infoReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button onClick={resetForm}>reset</button>
      </form>
    </div>
  );
};
export default CreateNew;
