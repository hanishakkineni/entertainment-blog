import React, { useState } from "react";

const Test = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    setLoading(true);
    setError("");
    setUserData(null);

    try {
      const response = await fetch(`http://localhost:3001/profile/${username}`);

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "User not found"
            : "An error occurred while fetching user data"
        );
      }

      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>User Profile Search</h1>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </div>
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search User"}
      </button>

      {error && <p>{error}</p>}

      {userData && (
        <div>
          <h3>User Details</h3>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Age: {userData.age}</p>
          {userData.image && (
            <div>
              <img
                src={userData.image}
                alt={`${userData.username}'s profile`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Test;
