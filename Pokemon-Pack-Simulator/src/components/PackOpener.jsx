// src/components/PackOpener.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./Card";
import { CardModal } from "./CardModal";
import packGif from "../assets/sylveon_animation.gif";

export function PackOpener({ currentCards, isOpening, onOpen }) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [modalCard, setModalCard]         = useState(null);

  // Reset revealed count whenever a new pack is opened
  const prevLength = currentCards.length;

  function handleOpenPack() {
    setRevealedCount(0);
    onOpen();
  }

  function handleCardClick(card, index) {
    if (index === revealedCount) {
      // Next unrevealed card — reveal it
      setRevealedCount(c => c + 1);
    } else if (index < revealedCount) {
      // Already revealed — open modal
      setModalCard(card);
    }
  }

  const allRevealed = currentCards.length > 0 && revealedCount >= currentCards.length;

  return (
    <section className="pack-opener">
      <h2 className="pack-opener__title">Open a Pack</h2>

      <motion.button
        className={`pack-btn ${isOpening ? "pack-btn--disabled" : ""}`}
        onClick={handleOpenPack}
        disabled={isOpening}
        whileHover={isOpening ? {} : { scale: 1.05, rotate: -1 }}
        whileTap={isOpening  ? {} : { scale: 0.97 }}
      >
        <img src={packGif} alt="open pack" className="pack-btn__gif" />
        <span>{isOpening ? "Opening…" : "Open Pack!"}</span>
      </motion.button>

      {currentCards.length > 0 && (
        <>
          {!allRevealed && (
            <p className="pack-opener__hint">
              Click each card to reveal · {revealedCount}/{currentCards.length} revealed
            </p>
          )}
          {allRevealed && (
            <p className="pack-opener__hint">Click any card to inspect it ✨</p>
          )}

          <AnimatePresence>
            <div className="card-reveal-grid">
              {currentCards.map((card, i) => (
                <Card
                  key={`${card.id}-${i}`}
                  card={card}
                  revealed={i < revealedCount}
                  onClick={() => handleCardClick(card, i)}
                />
              ))}
            </div>
          </AnimatePresence>
        </>
      )}

      <CardModal card={modalCard} onClose={() => setModalCard(null)} />
    </section>
  );
}