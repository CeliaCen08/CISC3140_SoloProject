// src/data/cards.js
// Starter card pool using PokéAPI sprites (free, no key needed)
// Swap these out for PokéTCG API cards later: https://pokemontcg.io

const SPRITE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

export const RARITIES = {
  COMMON:   { label: "Common",   weight: 60, color: "#888" },
  UNCOMMON: { label: "Uncommon", weight: 30, color: "#2ecc71" },
  RARE:     { label: "Rare",     weight: 9,  color: "#3498db" },
  HOLO:     { label: "Holo Rare",weight: 1,  color: "#f39c12" },
};

export const CARDS = [
  // Commons
  { id: 1,   name: "Bulbasaur",   type: "Grass",    rarity: "COMMON",   image: `${SPRITE_BASE}/1.png` },
  { id: 4,   name: "Charmander",  type: "Fire",     rarity: "COMMON",   image: `${SPRITE_BASE}/4.png` },
  { id: 7,   name: "Squirtle",    type: "Water",    rarity: "COMMON",   image: `${SPRITE_BASE}/7.png` },
  { id: 10,  name: "Caterpie",    type: "Bug",      rarity: "COMMON",   image: `${SPRITE_BASE}/10.png` },
  { id: 13,  name: "Weedle",      type: "Bug",      rarity: "COMMON",   image: `${SPRITE_BASE}/13.png` },
  { id: 16,  name: "Pidgey",      type: "Normal",   rarity: "COMMON",   image: `${SPRITE_BASE}/16.png` },
  { id: 19,  name: "Rattata",     type: "Normal",   rarity: "COMMON",   image: `${SPRITE_BASE}/19.png` },
  { id: 23,  name: "Ekans",       type: "Poison",   rarity: "COMMON",   image: `${SPRITE_BASE}/23.png` },
  // Uncommons
  { id: 2,   name: "Ivysaur",     type: "Grass",    rarity: "UNCOMMON", image: `${SPRITE_BASE}/2.png` },
  { id: 5,   name: "Charmeleon",  type: "Fire",     rarity: "UNCOMMON", image: `${SPRITE_BASE}/5.png` },
  { id: 8,   name: "Wartortle",   type: "Water",    rarity: "UNCOMMON", image: `${SPRITE_BASE}/8.png` },
  { id: 25,  name: "Pikachu",     type: "Electric", rarity: "UNCOMMON", image: `${SPRITE_BASE}/25.png` },
  { id: 39,  name: "Jigglypuff",  type: "Normal",   rarity: "UNCOMMON", image: `${SPRITE_BASE}/39.png` },
  { id: 52,  name: "Meowth",      type: "Normal",   rarity: "UNCOMMON", image: `${SPRITE_BASE}/52.png` },
  // Rares
  { id: 3,   name: "Venusaur",    type: "Grass",    rarity: "RARE",     image: `${SPRITE_BASE}/3.png` },
  { id: 6,   name: "Charizard",   type: "Fire",     rarity: "RARE",     image: `${SPRITE_BASE}/6.png` },
  { id: 9,   name: "Blastoise",   type: "Water",    rarity: "RARE",     image: `${SPRITE_BASE}/9.png` },
  { id: 26,  name: "Raichu",      type: "Electric", rarity: "RARE",     image: `${SPRITE_BASE}/26.png` },
  // Holo Rares
  { id: 150, name: "Mewtwo",      type: "Psychic",  rarity: "HOLO",     image: `${SPRITE_BASE}/150.png` },
  { id: 151, name: "Mew",         type: "Psychic",  rarity: "HOLO",     image: `${SPRITE_BASE}/151.png` },
  { id: 143, name: "Snorlax",     type: "Normal",   rarity: "HOLO",     image: `${SPRITE_BASE}/143.png` },
  { id: 149, name: "Dragonite",   type: "Dragon",   rarity: "HOLO",     image: `${SPRITE_BASE}/149.png` },
];

/** Weighted random draw — returns `count` cards per pack */
export function openPack(count = 5) {
  const totalWeight = Object.values(RARITIES).reduce((sum, r) => sum + r.weight, 0);

  return Array.from({ length: count }, () => {
    let roll = Math.random() * totalWeight;
    let rarity = "COMMON";
    for (const [key, val] of Object.entries(RARITIES)) {
      roll -= val.weight;
      if (roll <= 0) { rarity = key; break; }
    }
    const pool = CARDS.filter(c => c.rarity === rarity);
    return pool[Math.floor(Math.random() * pool.length)];
  });
}