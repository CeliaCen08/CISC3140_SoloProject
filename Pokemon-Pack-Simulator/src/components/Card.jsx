// src/components/Card.jsx
import { motion } from "framer-motion";
import { RARITY_CONFIG, CLASSIC_RARITY_CONFIG } from "../data/cards";

const ALL_RARITY = { ...RARITY_CONFIG, ...CLASSIC_RARITY_CONFIG };

function getRarityMeta(rarity) {
  return ALL_RARITY[rarity] ?? { color: "#b07a9e", label: rarity ?? "?" };
}

function getCardClass(rarity) {
  if (rarity === "Hyper Rare") return "card--gold";
  if (rarity === "Special Illustration Rare") return "card--sir";
  if (["Ultra Rare", "Illustration Rare", "Double Rare", "Rare Holo"].includes(rarity)) return "card--holo";
  return "";
}

export function Card({ card, revealDelay = 0 }) {
  const { color, label } = getRarityMeta(card.rarity);
  const image = card.images?.small ?? card.images?.large;
  const isShiny = ["Rare Holo","Double Rare","Illustration Rare","Ultra Rare","Special Illustration Rare","Hyper Rare"].includes(card.rarity);

  return (
    <motion.div
      initial={{ rotateY: 180, opacity: 0, y: 30 }}
      animate={{ rotateY: 0,   opacity: 1, y: 0  }}
      transition={{ delay: revealDelay, duration: 0.5, type: "spring", stiffness: 120 }}
      style={{ perspective: 1000 }}
    >
      <div
        className={`card ${getCardClass(card.rarity)}`}
        style={{ "--rarity-color": color }}
      >
        <div className="card__inner">
          <div className="card__rarity-badge">{label}</div>
          <div className="card__image-wrap">
            <img src={image} alt={card.name} className="card__image" loading="lazy" />
          </div>
          <div className="card__footer">
            <span className="card__name">{card.name}</span>
            <span className="card__type">{card.types?.[0] ?? "Colorless"}</span>
          </div>
        </div>
        {isShiny && <div className="card__holo-shine" />}
      </div>
    </motion.div>
  );
}