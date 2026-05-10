// src/components/Card.jsx
import { motion } from "framer-motion";
import { RARITIES } from "../data/cards";

const TYPE_COLORS = {
  Grass:    "#4CAF50", Fire:     "#F44336", Water:    "#2196F3",
  Electric: "#FFC107", Psychic:  "#9C27B0", Bug:      "#8BC34A",
  Normal:   "#9E9E9E", Poison:   "#673AB7", Dragon:   "#3F51B5",
};

export function Card({ card, revealDelay = 0 }) {
  const rarityInfo  = RARITIES[card.rarity];
  const typeColor   = TYPE_COLORS[card.type] ?? "#888";
  const isHolo      = card.rarity === "HOLO";

  return (
    <motion.div
      initial={{ rotateY: 180, opacity: 0, y: 30 }}
      animate={{ rotateY: 0,   opacity: 1, y: 0  }}
      transition={{ delay: revealDelay, duration: 0.5, type: "spring", stiffness: 120 }}
      style={{ perspective: 1000 }}
    >
      <div
        className={`card ${isHolo ? "card--holo" : ""}`}
        style={{ "--type-color": typeColor, "--rarity-color": rarityInfo.color }}
      >
        <div className="card__inner">
          <div className="card__rarity-badge">{rarityInfo.label}</div>

          <div className="card__image-wrap">
            <img
              src={card.image}
              alt={card.name}
              className="card__image"
              loading="lazy"
            />
          </div>

          <div className="card__footer">
            <span className="card__name">{card.name}</span>
            <span className="card__type">{card.type}</span>
          </div>
        </div>

        {isHolo && <div className="card__holo-shine" />}
      </div>
    </motion.div>
  );
}
