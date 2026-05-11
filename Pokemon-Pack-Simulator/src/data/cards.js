// src/data/cards.js
const API_KEY  = import.meta.env.VITE_POKETCG_API_KEY;
const BASE_URL = "https://api.pokemontcg.io/v2";

export const RARITY_CONFIG = {
  "Common":                    { weight: 200, color: "#b07a9e", label: "Common" },
  "Uncommon":                  { weight: 100, color: "#7ec8a0", label: "Uncommon" },
  "Rare":                      { weight: 60,  color: "#78aee8", label: "Rare" },
  "Double Rare":               { weight: 22,  color: "#a78bfa", label: "Double Rare" },
  "Illustration Rare":         { weight: 11,  color: "#f472b6", label: "Illus. Rare" },
  "Ultra Rare":                { weight: 8,   color: "#60a5fa", label: "Ultra Rare" },
  "Special Illustration Rare": { weight: 2,   color: "#ec4899", label: "Special IR" },
  "Hyper Rare":                { weight: 0.8, color: "#f59e0b", label: "Hyper Rare" },
};

export const CLASSIC_RARITY_CONFIG = {
  "Common":    { weight: 200, color: "#b07a9e", label: "Common" },
  "Uncommon":  { weight: 100, color: "#7ec8a0", label: "Uncommon" },
  "Rare":      { weight: 40,  color: "#78aee8", label: "Rare" },
  "Rare Holo": { weight: 8,   color: "#a78bfa", label: "Holo Rare" },
};

function isModernSet(allCards) {
  return allCards.some(c =>
    ["Double Rare", "Illustration Rare", "Ultra Rare",
     "Special Illustration Rare", "Hyper Rare"].includes(c.rarity)
  );
}

// Pull one random card matching any of the given rarities (tries each in order)
function drawFromRarities(allCards, rarities) {
  for (const rarity of rarities) {
    const pool = allCards.filter(c => c.rarity === rarity);
    if (pool.length > 0) {
      return pool[Math.floor(Math.random() * pool.length)];
    }
  }
  // Last resort fallback — any card
  return allCards[Math.floor(Math.random() * allCards.length)];
}

// Weighted draw across a set of rarities using config weights
function weightedDraw(allCards, config, rarities) {
  const eligible = rarities
    .filter(r => config[r] && allCards.some(c => c.rarity === r))
    .map(r => ({ rarity: r, weight: config[r].weight }));

  if (eligible.length === 0) return drawFromRarities(allCards, rarities);

  const total = eligible.reduce((sum, e) => sum + e.weight, 0);
  let roll = Math.random() * total;

  for (const { rarity, weight } of eligible) {
    roll -= weight;
    if (roll <= 0) return drawFromRarities(allCards, [rarity]);
  }

  return drawFromRarities(allCards, [eligible[0].rarity]);
}

export function openPack(allCards) {
  const modern = isModernSet(allCards);
  const config = modern ? RARITY_CONFIG : CLASSIC_RARITY_CONFIG;

  // Slots 1–4: guaranteed Commons
  const slot1 = drawFromRarities(allCards, ["Common"]);
  const slot2 = drawFromRarities(allCards, ["Common"]);
  const slot3 = drawFromRarities(allCards, ["Common"]);
  const slot4 = drawFromRarities(allCards, ["Common"]);

  // Slots 5–7: guaranteed Uncommons
  const slot5 = drawFromRarities(allCards, ["Uncommon"]);
  const slot6 = drawFromRarities(allCards, ["Uncommon"]);
  const slot7 = drawFromRarities(allCards, ["Uncommon"]);

  // Slot 8: Basic Energy (falls back to Common if set has no Energy cards)
  const slot8 = drawFromRarities(allCards, ["Common"]);

  // Slot 9: Reverse Holo — weighted, skewed toward lower rarities
  // but can occasionally hit something special in modern sets
  const slot9 = modern
    ? weightedDraw(allCards, config, ["Common", "Uncommon", "Rare", "Double Rare", "Illustration Rare"])
    : weightedDraw(allCards, config, ["Common", "Uncommon", "Rare", "Rare Holo"]);

  // Slot 10: The Hit — Rare and above only
  const slot10 = modern
    ? weightedDraw(allCards, config, ["Rare", "Double Rare", "Illustration Rare", "Ultra Rare", "Special Illustration Rare", "Hyper Rare"])
    : weightedDraw(allCards, config, ["Rare", "Rare Holo"]);

  return [slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8, slot9, slot10].filter(Boolean); // remove any nulls
}

export async function fetchSetCards(setId) {
  const res = await fetch(
    `${BASE_URL}/cards?q=set.id:${setId}&pageSize=250`,
    { headers: { "X-Api-Key": API_KEY } }
  );
  if (!res.ok) throw new Error(`PokéTCG API error: ${res.status}`);
  const { data } = await res.json();
  return data;
}

export async function fetchSets() {
  const res = await fetch(`${BASE_URL}/sets?orderBy=releaseDate`, {
    headers: { "X-Api-Key": API_KEY }
  });
  if (!res.ok) throw new Error(`PokéTCG API error: ${res.status}`);
  const { data } = await res.json();
  return data;
}