import React from "react";

const Profile = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    useNavigate("/auth/login");
  };
  return (
    <div className="profile">
      {user ? (
        <div className="profile-user">
          <p>Welcome, {user.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <h4>No user available, please log in</h4>
      )}
    </div>
  );
};
