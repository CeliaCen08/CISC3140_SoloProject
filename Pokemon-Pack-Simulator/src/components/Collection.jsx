// src/components/Collection.jsx
import { Card } from "./Card";

export function Collection({ cards, onClear }) {
  if (cards.length === 0) {
    return (
      <section className="collection">
        <h2 className="collection__title">My Collection <span className="collection__count">(0)</span></h2>
        <p className="collection__empty">Open a pack to start collecting!</p>
      </section>
    );
  }
  const safeCards = cards.filter(Boolean);
  // Count duplicates
  const counts = safeCards.reduce((acc, c) => {
    acc[c.id] = (acc[c.id] ?? 0) + 1;
    return acc;
  }, {});

  // Deduplicated list for display
  const unique = safeCards.filter((c, i, arr) => arr.findIndex(x => x.id === c.id) === i);

  return (
    <section className="collection">
      <div className="collection__header">
        <h2 className="collection__title">
          My Collection <span className="collection__count">({safeCards.length} cards)</span>
        </h2>
        <button className="clear-btn" onClick={onClear}>Clear</button>
      </div>

      <div className="collection__grid">
        {unique.map(card => (
          <div key={card.id} className="collection__card-wrap">
            <Card card={card} />
            {counts[card.id] > 1 && (
              <div className="collection__dupe-badge">×{counts[card.id]}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
