import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import SearchUser from "./pages/SearchUser";
import UserDetail from "./pages/UserDetail";
import RepoList from "./pages/RepoList";
import { getUser, getUserRepositories } from "./services/githubApi";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    setLoading(true);
    try {
      const user = await getUser(username);
      const userRepos = await getUserRepositories(username);
      setUserData(user);
      setRepositories(userRepos);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setUserData(null);
      setRepositories([]);
      setError("User not found. Please check the username.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          marginTop: "20px",
          backgroundColor: "#FAF9F6",
        }}
      >
        <Typography
          variant="h4"
          style={{ marginBottom: "20px", color: "#333" }}
        >
         Find GitHub User
        </Typography>
        <SearchUser onSearch={handleSearch} />
        {loading && <CircularProgress style={{ marginTop: "20px" }} />}
        {error && (
          <Typography
            variant="body1"
            style={{ color: "red", marginTop: "20px" }}
          >
            {error}
          </Typography>
        )}
        <Grid
          container
          spacing={3}
          style={{ marginTop: "20px" }}
          alignItems="flex-start"
        >
          <Grid item xs={12} md={4}>
            {userData && <UserDetail user={userData} />}
          </Grid>
          <Grid item xs={12} md={8}>
            <RepoList repositories={repositories} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;
