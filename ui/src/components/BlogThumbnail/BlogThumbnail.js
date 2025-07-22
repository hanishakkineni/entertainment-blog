import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./thumbnail.css";
import user from "../../assets/icons/user.svg";

const BlogPost = ({ blog }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${blog._id}`);
  };

  return (
    <article className="blog-post" onClick={handleClick}>
      <div
        className="post-wrapper"
        style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}
      >
        <div className="post-content-wrapper" style={{ flex: 1 }}>
          <div className="post-meta">
            <div className="author">
              <img
                src={blog.author.avatar || user}
                alt={blog.author.username}
                className="author-image"
              />
              <div className="author-details">
                <div className="author-name-container">
                  <span className="author-name">{blog.author.username}</span>
                </div>
              </div>
            </div>
          </div>
          <h1 className="post-title">{blog.title}</h1>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <div className="post-details">
            <span className="post-date">
              {new Date(blog.created_at).toLocaleDateString()}
            </span>
            <span>&bull;</span>
            <span className="post-category">{blog.category}</span>
          </div>
        </div>

        <div
          className="post-thumbnail"
          style={{
            flexShrink: 0,
            marginTop: "40px",
            width: "200px",
            height: "134px",
            borderRadius: "7px",
            overflow: "hidden",
          }}
        >
          <img
            src={"http://localhost:3001" + blog.thumbnail}
            alt={blog.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </article>
  );
};

BlogPost.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

const Blog = ({ blogs }) => {
  return (
    <div className="blog-container">
      <main className="blog-main">
        {blogs.map((blog) => (
          <BlogPost key={blog._id} blog={blog} />
        ))}
      </main>
    </div>
  );
};

Blog.propTypes = {
  blogs: PropTypes.arrayOf(BlogPost.propTypes.blog).isRequired,
};

export default Blog;
