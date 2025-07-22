import React from "react";
import { Plus, Mail, Calendar } from "lucide-react";

function ProfileHeader({ profile, onEditClick }) {
  return (
    <div className="profile-section">
      <div className="profile-section-container">
        <div className="profile-section-content">
          <div className="profile-picture">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Profile"
                className="profile-image"
              />
            ) : (
              <>
                <Plus className="plus-icon" />
                <span className="add-text">Add profile</span>
              </>
            )}
          </div>
          <div className="profile-info">
            <h1 className="profile-title">{profile.username}</h1>
            <div className="user-details">
              <div className="content">
                <Mail className="info-icon" />
                <span>{profile.email}</span>
              </div>
              <div className="content">
                <Calendar className="info-icon" />
                <span>Joined {profile.created_at}</span>
              </div>
            </div>
          </div>
          <button className="edit-button" onClick={onEditClick}>
            Edit profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
