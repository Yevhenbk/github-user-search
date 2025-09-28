import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import UserCard from "./components/UserCard/UserCard";
import { searchUsers, getUser } from "./api/github";
import { useDebounce } from "./hooks/useDebounce";
import "./App.css";

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
  location?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setUsers([]);
      setError(null);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const searchResults = await searchUsers(debouncedQuery);
        
        // Get detailed information for first 6 users
        const detailedUsers = await Promise.all(
          searchResults.items.slice(0, 6).map(async (user: any) => {
            try {
              const detailedUser = await getUser(user.login);
              return detailedUser;
            } catch {
              // If detailed fetch fails, return basic info
              return user;
            }
          })
        );
        
        setUsers(detailedUsers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedQuery]);

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">GitHub User Search</h1>
          <p className="app-subtitle">
            Discover developers and explore their GitHub profiles
          </p>
        </header>

        <div className="search-section">
          <SearchBar 
            value={query} 
            onChange={setQuery}
            placeholder="Search for GitHub users..." 
          />
        </div>

        <main className="main-content">
          {error && (
            <div className="error-message">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="error-icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{error}</p>
            </div>
          )}

          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Searching users...</p>
            </div>
          )}

          {!loading && !error && users.length > 0 && (
            <div className="users-grid">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}

          {!loading && !error && debouncedQuery && users.length === 0 && (
            <div className="no-results">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="no-results-icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3>No users found</h3>
              <p>Try searching with different keywords</p>
            </div>
          )}

          {!debouncedQuery && !loading && (
            <div className="welcome-state">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="welcome-icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3>Start searching</h3>
              <p>Enter a GitHub username or name to find users</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}