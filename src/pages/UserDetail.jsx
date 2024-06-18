import React from "react";
import { Avatar, Typography, Box } from "@mui/material";

const UserDetail = ({ user }) => {
  const handleRedirect = () => {
    window.open(user.html_url, "_blank");
  };

  return (
    <Box textAlign="center" mt={3}>
      <Avatar
        alt={user.name}
        src={user.avatar_url}
        sx={{ width: 100, height: 100, marginBottom: 2, cursor: "pointer" }}
        onClick={handleRedirect} 
      />
      <Typography
        variant="h5"
        component="div"
        gutterBottom
        style={{ cursor: "pointer" }}
        onClick={handleRedirect} 
      >
        {user.name}
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        {user.login}
      </Typography>
      {user.bio && (
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {user.bio}
        </Typography>
      )}
    </Box>
  );
};

export default UserDetail;
