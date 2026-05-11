// src/components/CardModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { RARITY_CONFIG, CLASSIC_RARITY_CONFIG } from "../data/cards";

const ALL_RARITY = { ...RARITY_CONFIG, ...CLASSIC_RARITY_CONFIG };

function getRarityMeta(rarity) {
  return ALL_RARITY[rarity] ?? { color: "#b07a9e", label: rarity ?? "?" };
}

export function CardModal({ card, onClose }) {
  if (!card) return null;
  const { color, label } = getRarityMeta(card.rarity);
  const image = card.images?.large ?? card.images?.small;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-card"
          initial={{ scale: 0.7, opacity: 0, y: 40 }}
          animate={{ scale: 1,   opacity: 1, y: 0  }}
          exit={{ scale: 0.7, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>✕</button>

          <img src={image} alt={card.name} className="modal-image" />

          <div className="modal-info">
            <h2 className="modal-name">{card.name}</h2>
            <span className="modal-rarity-badge" style={{ background: color }}>
              {label}
            </span>
            <div className="modal-meta">
              {card.types?.length > 0 && (
                <span className="modal-meta__item">Type: <strong>{card.types.join(", ")}</strong></span>
              )}
              {card.set?.name && (
                <span className="modal-meta__item">Set: <strong>{card.set.name}</strong></span>
              )}
              {card.number && card.set?.printedTotal && (
                <span className="modal-meta__item">Number: <strong>{card.number}/{card.set.printedTotal}</strong></span>
              )}
              {card.artist && (
                <span className="modal-meta__item">Artist: <strong>{card.artist}</strong></span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}