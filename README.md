# CISC3140_SoloProject

#Pokémon Pack Opener ꒰ᐢ. .ᐢ꒱₊˚⊹

A browser-based Pokémon pack opening simulator built with Vite + React.
Browse real sets, open packs, and build your collection — all in the browser.

🔗 **Live Demo:** https://cisc-3140-solo-project-a4e8.vercel.app/

## Features
 
- 🗂 Browse every Pokémon TCG set via the PokéTCG API
- 🎴 Open booster packs with an authentic 10-card structure (Commons, Uncommons, Energy, Reverse Holo, and a Hit slot)
- ✨ Weighted rarity system — Double Rare, Illustration Rare, Ultra Rare, Special IR, and Hyper Rare
- 🖱 Click-to-reveal cards one by one
- 🔍 Click any revealed card to inspect it in a modal with full card details
- 💾 Collection persists across sessions via localStorage
- 🌸 Pastel-themed UI with smooth Framer Motion animations

## Tech Stack
 
- [Vite](https://vitejs.dev) + [React](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/) — card animations
- [PokéTCG API](https://pokemontcg.io) — real card data and images
- Deployed on [Vercel](https://vercel.com)
---


## Getting Started
 
### 1. Clone the repo
```bash
git clone https://github.com/CeliaCen08/CISC3140_SoloProject.git
cd Pokemon-Pack-Simulator
```
 
### 2. Install dependencies
```bash
npm install
```
 
### 3. Set up your API key
Create a `.env` file in the project root:
```
VITE_POKETCG_API_KEY=your-api-key-here
```
Get a free key at [pokemontcg.io](https://pokemontcg.io).
 
### 4. Run the dev server
```bash
npm run dev
```
 
Open `http://localhost:5173` in your browser.
 
---

## Project Structure

```
pokemon-pack-opener/
├── public/
│   └── packs/              # Pack artwork images (add your own)
├── src/
│   ├── components/
│   │   ├── PackOpener.jsx  # Main pack opening flow
│   │   ├── Card.jsx        # Individual card with flip animation
│   │   └── Collection.jsx  # Grid of all opened cards
│   ├── data/
│   │   └── cards.js        # Card definitions + rarity weights
│   ├── hooks/
│   │   └── usePacks.js     # Logic: open pack, generate cards
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
```

---

## How It Works

1. **Card Data** (`src/data/cards.js`) — defines cards with name, type, rarity, and image URL (uses the PokéAPI sprites)
2. **Pack Logic** (`src/hooks/usePacks.js`) — weighted random draw: Common 60%, Uncommon 30%, Rare 9%, Holo 1%
3. **Pack Opener** (`src/components/PackOpener.jsx`) — shows the pack, triggers opening, reveals cards one by one
4. **Card Component** (`src/components/Card.jsx`) — flip animation on reveal using Framer Motion
5. **Collection** (`src/components/Collection.jsx`) — persists opened cards in localStorage

## Next Steps / Ideas

- [ ] Sound effects on card reveal
- [ ] Shiny/holo foil CSS effect on rare cards
- [ ] Trade duplicates feature


## Course Info
 
**Course:** CISC 3140 — Design & Implementation of Large-Scale Web Applications  
**Author:** Celia Cen 
**Type:** Solo Project
