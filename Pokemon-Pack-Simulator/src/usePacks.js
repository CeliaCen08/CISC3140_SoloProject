// src/hooks/usePacks.js
import { useState, useCallback } from "react";
import { openPack } from "../data/cards";

const STORAGE_KEY = "pokemon-collection";

function loadCollection() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

export function usePacks() {
  const [currentCards, setCurrentCards] = useState([]);   // cards in current opened pack
  const [collection, setCollection]     = useState(loadCollection);
  const [isOpening, setIsOpening]       = useState(false);

  const handleOpenPack = useCallback(() => {
    if (isOpening) return;
    setIsOpening(true);

    const newCards = openPack(5);
    setCurrentCards(newCards);

    // Add to collection and persist
    setCollection(prev => {
      const updated = [...prev, ...newCards];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    // Reset opening state after animations finish
    setTimeout(() => setIsOpening(false), newCards.length * 400 + 600);
  }, [isOpening]);

  const clearCollection = useCallback(() => {
    setCollection([]);
    setCurrentCards([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { currentCards, collection, isOpening, handleOpenPack, clearCollection };
}