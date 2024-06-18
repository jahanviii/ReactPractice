import React from "react";
import { List, ListItem, ListItemText, Divider, Paper } from "@mui/material";

const RepoList = ({ repositories }) => {
  const hasRepositories = repositories && repositories.length > 0;

  return (
    <>
      {hasRepositories && (
        <Paper elevation={3} style={{ marginTop: "10px", padding: "10px" }}>
          <List>
            {repositories.map((repo, index) => (
              <div key={repo.id}>
                <ListItem
                  component="a"
                  href={repo.html_url}
                  target="_blank"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <ListItemText
                    primary={repo.name}
                    secondary={repo.description || "No description"}
                  />
                </ListItem>
                {index !== repositories.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </Paper>
      )}
    </>
  );
};

export default RepoList;
