import React, { useState, useEffect } from "react";
import Header from "../Header/HeaderComponent";
import DOMPurify from "dompurify";
import "./blog.css";

const BlogComponent = () => {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const _id = window.location.pathname.split("/")[2];

  useEffect(() => {
    // Fetching blog post
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/blog/${_id}`, {
          method: "GET",
        });
        const data = await response.json();
        setBlog(data);
        setIsLoading(false);
      } catch (err) {
        setError("Error fetching blog data");
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, [_id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Sanitize blog content using DOMPurify
  const sanitizedContent = DOMPurify.sanitize(blog.content);

  return (
    <>
      <Header />
      <div className="blog-detail-container">
        <div className="blog-detail-header">
          <div className="blog-detail-meta">
            <span className="blog-detail-category">{blog.category}</span>
          </div>
          <h1 className="blog-detail-title">{blog.title}</h1>
          <div className="blog-detail-author">
            <div className="author-info">
              <img src={blog.author.avatar} alt={blog.author.username} />
              <span className="author-name" style={{fontSize: "18px"}}>{blog.author.username}</span>
            </div>
            <span className="post-date">
              Posted on {new Date(blog.created_at).toLocaleDateString()}
            </span>
          </div>
          <div className="comment-button">
            <a className="comment"></a>
          </div>
        </div>

        <div className="blog-detail-thumbnail">
          <img
            src={`http://localhost:3001${blog.thumbnail}`}
            alt={blog.title}
          />
        </div>

        <article className="blog-detail-content">
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
        </article>
      </div>
    </>
  );
};

export default BlogComponent;
