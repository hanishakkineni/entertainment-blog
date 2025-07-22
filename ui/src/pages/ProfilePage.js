import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/Profile/ProfileHeader.js";
import ProfileContent from "../components/Profile/ProfileContent.js";
import EditModal from "../components/Profile/EditModal.js";
import "../components/Profile/profile.css";
import Header from "../components/Header/HeaderComponent.js";

function ProfilePage() {

  const navigate = useNavigate();
  useEffect(() => {
  fetch(`http://localhost:3001/profile`, { method: "GET" , credentials: "include"})
    .then((response) => response.json())
    .then((data) => {
      const date = new Date(data.created_at);
      const options = { year: "numeric", month: "long"};
      data.created_at = date.toLocaleDateString("en-US", options);
      setProfile(data);
    }).catch((error) => {
      navigate("/login");
      console.error("Error:", error);
    });
  }, [navigate]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    _id: "",
    username: "",
    about: "",
    email: "",
    avatar: "",
    created_at: ""
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEditClick = () => {
    setEditedProfile(profile);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsModalOpen(false);
  };

  return (
    <div className="app">
      <Header />
      <div style={{height:"64px"}}></div>
      <ProfileHeader
        profile={profile}
        onEditClick={handleEditClick}
      />
      <ProfileContent profile={profile} />
      {isModalOpen && (
        <EditModal
          editedProfile={editedProfile}
          setEditedProfile={setEditedProfile}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default ProfilePage;
