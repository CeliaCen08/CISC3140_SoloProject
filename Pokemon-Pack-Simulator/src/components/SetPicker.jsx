// src/components/SetPicker.jsx
import { useEffect, useState } from "react";
import { fetchSets } from "../data/cards";

export function SetPicker({ onSelectSet }) {
  const [sets, setSets]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [search, setSearch]   = useState("");

  useEffect(() => {
    fetchSets()
      .then(data => { setSets(data); setLoading(false); })
      .catch(err  => { setError(err.message); setLoading(false); });
  }, []);

  const filtered = sets.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="status-screen">Loading sets…</div>;
  if (error)   return <div className="status-screen error">API Error: {error}</div>;

  return (
    <section className="set-picker">
      <h2 className="set-picker__title">Choose a Set</h2>

      <input
        className="set-picker__search"
        type="text"
        placeholder="Search sets…"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="set-picker__grid">
        {filtered.map(set => (
          <button
            key={set.id}
            className="set-card"
            onClick={() => onSelectSet(set)}
          >
            <div className="set-card__logo-wrap">
              {set.images?.logo
                ? <img src={set.images.logo} alt={set.name} className="set-card__logo" />
                : <span className="set-card__name-fallback">{set.name}</span>
              }
            </div>
            <div className="set-card__footer">
              <span className="set-card__name">{set.name}</span>
              <span className="set-card__total">{set.total} cards</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}