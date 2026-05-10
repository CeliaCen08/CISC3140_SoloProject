// src/App.jsx
import { useState } from "react";
import { PackOpener } from "./components/PackOpener";
import { Collection } from "./components/Collection";
import { usePacks } from "./hooks/usePacks";
import "./App.css";

export default function App() {
  const { currentCards, collection, isOpening, handleOpenPack, clearCollection } = usePacks();
  const [view, setView] = useState("opener"); // "opener" | "collection"

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span className="app-title__ball">⬤</span> Poképack
        </h1>
        <nav className="app-nav">
          <button
            className={`nav-btn ${view === "opener" ? "nav-btn--active" : ""}`}
            onClick={() => setView("opener")}
          >
            Open Packs
          </button>
          <button
            className={`nav-btn ${view === "collection" ? "nav-btn--active" : ""}`}
            onClick={() => setView("collection")}
          >
            Collection ({collection.length})
          </button>
        </nav>
      </header>

      <main className="app-main">
        {view === "opener" ? (
          <PackOpener
            currentCards={currentCards}
            isOpening={isOpening}
            onOpen={handleOpenPack}
          />
        ) : (
          <Collection cards={collection} onClear={clearCollection} />
        )}
      </main>
    </div>
  );
}
