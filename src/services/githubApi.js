const BASE_URL = 'https://api.github.com';

export const getUser = async (username) => {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  if (!response.ok) {
    throw new Error(`User '${username}' not found`);
  }
  return response.json();
};

export const getUserRepositories = async (username) => {
  const response = await fetch(`${BASE_URL}/users/${username}/repos`);
  if (!response.ok) {
    throw new Error(`Repositories for user '${username}' not found`);
  }
  return response.json();
};
