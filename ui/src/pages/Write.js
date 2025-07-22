import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Plus } from "lucide-react";
import "../styles/Write.css";
import logo from "../assets/logo.png";

function Write() {
  const navigate = useNavigate();
  const [thumbnailImage, setThumbnailImage] = useState("");
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    thumbnailFile: null,
  });

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ align: [] }],
      ["clean"],
      [{ background: [] }],
    ],
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setThumbnailImage(imageUrl);
    setFormData((prev) => ({
      ...prev,
      thumbnailFile: file,
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleTitleChange = (e) => {
    const titleText = e.currentTarget.innerText;
    setFormData((prev) => ({
      ...prev,
      title: titleText,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a title for your blog post");
      return;
    }

    const Data = new FormData();
    Data.append("title", formData.title);
    Data.append("content", formData.content);
    Data.append("category", formData.category);
    Data.append("image", formData.thumbnailFile);

    try {
      const response = await fetch("http://localhost:3001/blogs", {
        method: "POST",
        body: Data,
        credentials: "include",
      });

      if (response.ok) {
        alert("Blog post created successfully");
        navigate("/home");
      } else {
        alert("Failed to create blog post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="write-container">
      <div className="editor-toolbar">
        <img src={logo} alt="Logo" className="logo" />
        <button className="publish-button" onClick={handleSubmit}>
          Publish
        </button>
      </div>

      <div className="title-section">
        <div
          contentEditable={true}
          className="title-input"
          onInput={handleTitleChange}
          data-placeholder="Title"
        />
      </div>

      <div className="option-section">
        <div className="category">
          <select
            className="category-select"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select a category</option>
            <option value="Movies">Movies</option>
            <option value="TV-shows">TV-shows</option>
            <option value="Music">Music</option>
            <option value="Celebrity News">Celebrity News</option>
            <option value="Festival">Festival</option>
          </select>
        </div>

        <div>
          <label htmlFor="imageUpload" className="thumbnail-button">
            <Plus size={24} />
            <span>Add your thumbnail</span>
          </label>

          <input
            id="imageUpload"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className="thumbnail-section">
        {thumbnailImage && (
          <div className="thumbnail-wrapper">
            <img
              src={thumbnailImage}
              alt="Thumbnail"
              className="thumbnail-image"
            />
          </div>
        )}
      </div>

      <ReactQuill
        theme="snow"
        value={formData.content}
        onChange={(content) => setFormData({ ...formData, content })}
        modules={modules}
        className="content-section"
        placeholder="Start writing here..."
      />
    </div>
  );
}

export default Write;
