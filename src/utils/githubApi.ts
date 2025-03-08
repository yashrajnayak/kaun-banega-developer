
// Base URL for GitHub API
const API_BASE_URL = 'https://api.github.com';

// GitHub user interface
export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
  html_url: string;
}

/**
 * Check if a GitHub username exists
 * @param username The GitHub username to validate
 * @returns Promise resolving to the GitHub user data or null if not found
 */
export const validateGitHubUsername = async (username: string): Promise<GitHubUser | null> => {
  if (!username || username.trim() === '') {
    return null;
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/users/${username}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null; // User not found
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return await response.json() as GitHubUser;
  } catch (error) {
    console.error('Error validating GitHub username:', error);
    return null;
  }
};

/**
 * Cache GitHub user data in localStorage
 * @param user The GitHub user data to cache
 */
export const cacheGitHubUser = (user: GitHubUser): void => {
  try {
    localStorage.setItem('githubUser', JSON.stringify(user));
  } catch (error) {
    console.error('Error caching GitHub user data:', error);
  }
};

/**
 * Get cached GitHub user data from localStorage
 * @returns The cached GitHub user data or null if not found
 */
export const getCachedGitHubUser = (): GitHubUser | null => {
  try {
    const userData = localStorage.getItem('githubUser');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error retrieving cached GitHub user data:', error);
    return null;
  }
};
