// src/data/cards.js
const API_KEY  = import.meta.env.VITE_POKETCG_API_KEY;
const BASE_URL = "https://api.pokemontcg.io/v2";

// Modern SV-era rarities with your exact probabilities
// Weights are tuned so that across 9 draws you get roughly the right hit rates
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

// Fallback mapping for classic sets (Base, Jungle, Fossil, etc.)
export const CLASSIC_RARITY_CONFIG = {
  "Common":    { weight: 200, color: "#b07a9e", label: "Common" },
  "Uncommon":  { weight: 100, color: "#7ec8a0", label: "Uncommon" },
  "Rare":      { weight: 40,  color: "#78aee8", label: "Rare" },
  "Rare Holo": { weight: 8,   color: "#a78bfa", label: "Holo Rare" },
};

function pickRarityConfig(allCards) {
  const hasModern = allCards.some(c =>
    ["Double Rare", "Illustration Rare", "Ultra Rare", "Special Illustration Rare", "Hyper Rare"]
      .includes(c.rarity)
  );
  return hasModern ? RARITY_CONFIG : CLASSIC_RARITY_CONFIG;
}

function weightedDraw(allCards, config) {
  const totalWeight = Object.values(config).reduce((a, b) => a + b.weight, 0);
  let roll = Math.random() * totalWeight;
  let targetRarity = Object.keys(config)[0];

  for (const [rarity, { weight }] of Object.entries(config)) {
    roll -= weight;
    if (roll <= 0) { targetRarity = rarity; break; }
  }

  const pool = allCards.filter(c => c.rarity === targetRarity);
  const fallback = allCards.filter(c => c.rarity === "Common");
  const source = pool.length > 0 ? pool : fallback;
  return source[Math.floor(Math.random() * source.length)];
}

export function openPack(allCards, count = 9) {
  const config = pickRarityConfig(allCards);
  return Array.from({ length: count }, () => weightedDraw(allCards, config));
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