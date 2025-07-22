import React, { useEffect, useState } from "react";
import Header from "../components/Header/HeaderComponent";
import Blog from "../components/BlogThumbnail/BlogThumbnail";

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        console.log(data);
      });
  }, []);
  
  return (
    <>
      <Header />
      <div className="blog-container">
        <Blog blogs={blogs} />
      </div>
    </>
  );
}

export default Home;
