import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';

const SearchUser = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(username);
    setUsername('');
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={6}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter GitHub username"
          value={username}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={3}
      >
        <Button
        sx={{ height: '55px' }}
        fullWidth
          variant="contained"
          color="secondary"
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchUser;
