import React, { useState, useEffect } from "react";
import Blog from "../BlogThumbnail/BlogThumbnail";

function ProfileContent() {
  const [profile, setProfile] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);

  // Fetch profile data
  useEffect(() => {
    fetch(`http://localhost:3001/profile`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []); // Dependency array is empty to run only once on mount

  // Fetch blogs once profile data is available
  useEffect(() => {
    if (profile && profile._id) {
      fetch(`http://localhost:3001/blogs/${profile._id}`, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUserBlogs(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [profile]); // Run when profile updates

  return (
    <div className="profile-content">
      <div className="about-card">
        <h2 className="section-title">About</h2>
        <p className="about-text">{profile?.about || "Loading..."}</p>
      </div>

      <div className="info-card">
        <h2 className="section-title">Blogs</h2>
        {/* blog container */}
        <div className="blogs-container">
          {userBlogs && userBlogs.length > 0 ? (
            <Blog blogs={userBlogs} />
          ) : (
            <p className="no-blogs-message">No blogs posted</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileContent;
