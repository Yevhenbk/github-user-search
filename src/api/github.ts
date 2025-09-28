const BASE_URL = import.meta.env.VITE_GITHUB_API_BASE_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

async function fetchJSON(url: string) {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export async function searchUsers(q: string) {
  return fetchJSON(`${BASE_URL}/search/users?q=${encodeURIComponent(q)}&per_page=20`);
}

export async function getUser(username: string) {
  return fetchJSON(`${BASE_URL}/users/${username}`);
}

export async function getUserRepos(username: string) {
  return fetchJSON(`${BASE_URL}/users/${username}/repos?per_page=10&sort=updated`);
}