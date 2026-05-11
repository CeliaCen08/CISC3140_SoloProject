# CISC3140_SoloProject

#꒰ᐢ. .ᐢ꒱₊˚⊹ Pokémon Pack Opener ꒰ᐢ. .ᐢ꒱₊˚⊹

A browser-based Pokémon pack opening simulator built with Vite + React.

## Setup

```bash
npm create vite@latest pokemon-pack-opener -- --template react
cd pokemon-pack-opener
npm install
npm install framer-motion
```

Then replace the `src/` folder with the files provided.

```bash
npm run dev
```

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

- [ ] Fetch live card data from the PokéTCG API (https://pokemontcg.io)
- [ ] Add multiple pack types (Base Set, Jungle, Fossil...)
- [ ] Sound effects on card reveal
- [ ] Shiny/holo foil CSS effect on rare cards
- [ ] Trade duplicates feature
