import { Link } from "react-router-dom";

const BlogList = (props) => {
  // 传输数据需要时间，这里一开始的 blogs 是 null
  const blogs = props.blogs;
  const title = props.title;
  //   更简单的写法，直接解构
  // const BlogList = ({ blogs, title })
  return (
    <div className="blog-list">
      <h2>{title}</h2>
      {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
