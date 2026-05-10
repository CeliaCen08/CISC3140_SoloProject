// src/components/PackOpener.jsx
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./Card";

export function PackOpener({ currentCards, isOpening, onOpen }) {
  return (
    <section className="pack-opener">
      <h2 className="pack-opener__title">Open a Pack</h2>

      <motion.button
        className={`pack-btn ${isOpening ? "pack-btn--disabled" : ""}`}
        onClick={onOpen}
        disabled={isOpening}
        whileHover={isOpening ? {} : { scale: 1.05, rotate: -1 }}
        whileTap={isOpening  ? {} : { scale: 0.97 }}
      >
        <span className="pack-btn__emoji">🎴</span>
        <span>{isOpening ? "Opening…" : "Open Pack!"}</span>
      </motion.button>

      <AnimatePresence>
        {currentCards.length > 0 && (
          <motion.div
            className="card-reveal-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {currentCards.map((card, i) => (
              <Card key={`${card.id}-${i}`} card={card} revealDelay={i * 0.2} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
