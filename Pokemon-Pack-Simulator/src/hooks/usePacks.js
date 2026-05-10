// src/hooks/usePacks.js
import { useState, useCallback, useEffect } from "react";
import { fetchSetCards, openPack } from "../data/cards";

const STORAGE_KEY = "pokemon-collection";

function loadCollection() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? []; }
  catch { return []; }
}

export function usePacks(setId) {
  const [allCards, setAllCards]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [currentCards, setCurrentCards] = useState([]);
  const [collection, setCollection]     = useState(loadCollection);
  const [isOpening, setIsOpening]       = useState(false);

  // Re-fetch whenever the selected set changes
  useEffect(() => {
    if (!setId) return;
    setLoading(true);
    setCurrentCards([]);
    fetchSetCards(setId)
      .then(cards => { setAllCards(cards); setLoading(false); })
      .catch(err   => { setError(err.message); setLoading(false); });
  }, [setId]);

  const handleOpenPack = useCallback(() => {
    if (isOpening || allCards.length === 0) return;
    setIsOpening(true);

    const newCards = openPack(allCards, 9);
    setCurrentCards(newCards);

    setCollection(prev => {
      const updated = [...prev, ...newCards];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    setTimeout(() => setIsOpening(false), newCards.length * 400 + 600);
  }, [isOpening, allCards]);

  const clearCollection = useCallback(() => {
    setCollection([]);
    setCurrentCards([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { currentCards, collection, isOpening, loading, error, handleOpenPack, clearCollection };
}