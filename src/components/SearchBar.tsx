export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      placeholder="Search GitHub users..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded w-full"
    />
  );
}
