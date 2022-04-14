import { useRef } from 'react';
import AddBlog from './AddBlog';
import Togglable from './Togglable';
import BlogList from './BlogList';

const Home = () => {
  const blogFormRef = useRef();

  return (
    <div>
      <Togglable buttonLabel="New Post" ref={blogFormRef}>
        <AddBlog toggleRef={blogFormRef} />
      </Togglable>
      <br />
      <BlogList />
    </div>
  );
};

export default Home;
