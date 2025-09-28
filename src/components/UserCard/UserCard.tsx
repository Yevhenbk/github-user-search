import './UserCard.css';

interface UserCardProps {
  user: {
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
  };
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="user-avatar"
          loading="lazy"
        />
        <div className="user-info">
          <h3 className="user-name">
            {user.name || user.login}
          </h3>
          <p className="user-handle">@{user.login}</p>
          {user.location && (
            <div className="user-location">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="location-icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {user.location}
            </div>
          )}
        </div>
      </div>

      {user.bio && (
        <p className="user-bio">{user.bio}</p>
      )}

      <div className="user-stats">
        {user.public_repos !== undefined && (
          <div className="stat-item">
            <span className="stat-value">{user.public_repos}</span>
            <span className="stat-label">Repositories</span>
          </div>
        )}
        {user.followers !== undefined && (
          <div className="stat-item">
            <span className="stat-value">{user.followers}</span>
            <span className="stat-label">Followers</span>
          </div>
        )}
        {user.following !== undefined && (
          <div className="stat-item">
            <span className="stat-value">{user.following}</span>
            <span className="stat-label">Following</span>
          </div>
        )}
      </div>

      <div className="user-actions">
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="external-icon">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Profile
        </a>
      </div>
    </div>
  );
}