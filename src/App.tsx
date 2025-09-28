import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import { searchUsers } from "./api/github";

export default function App() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!q) return;
    searchUsers(q)
      .then((data) => setResults(data.items))
      .catch((err) => setError(err.message));
  }, [q]);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">GitHub User Search</h1>
      <SearchBar value={q} onChange={setQ} />
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {results.map((u) => (
          <li key={u.id}>
            <img src={u.avatar_url} width={36} height={36} alt="avatar" />
            <a href={u.html_url} target="_blank" rel="noreferrer">{u.login}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}