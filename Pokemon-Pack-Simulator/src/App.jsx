// src/App.jsx
import { useState } from "react";
import { PackOpener }  from "./components/PackOpener";
import { Collection }  from "./components/Collection";
import { SetPicker }   from "./components/SetPicker";
import { usePacks }    from "./hooks/usePacks";
import "./App.css";
import logo from "./assets/love_ball.PNG";

export default function App() {
  const [selectedSet, setSelectedSet] = useState(null); // null = set picker view
  const [view, setView]               = useState("sets"); // "sets" | "opener" | "collection"

  const { currentCards, collection, isOpening, loading, error, handleOpenPack, clearCollection }
    = usePacks(selectedSet?.id);

  function handleSelectSet(set) {
    setSelectedSet(set);
    setView("opener");
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title" onClick={() => setView("sets")} style={{ cursor: "pointer" }}>
        <img src={logo} alt="Pokepack logo" className="app-title__logo" />
        Poképack
        </h1>
        <nav className="app-nav">
          <button className={`nav-btn ${view === "sets"     ? "nav-btn--active" : ""}`} onClick={() => setView("sets")}>Sets</button>
          <button className={`nav-btn ${view === "opener"   ? "nav-btn--active" : ""}`} onClick={() => setView("opener")} disabled={!selectedSet}>
            {selectedSet ? `Open: ${selectedSet.name}` : "Open Packs"}
          </button>
          <button className={`nav-btn ${view === "collection" ? "nav-btn--active" : ""}`} onClick={() => setView("collection")}>
            Collection ({collection.length})
          </button>
        </nav>
      </header>

      <main className="app-main">
        {view === "sets" && (
          <SetPicker onSelectSet={handleSelectSet} />
        )}
        {view === "opener" && (
          loading
            ? <div className="status-screen">Loading {selectedSet?.name} cards…</div>
            : error
              ? <div className="status-screen error">API Error: {error}</div>
              : <PackOpener currentCards={currentCards} isOpening={isOpening} onOpen={handleOpenPack} />
        )}
        {view === "collection" && (
          <Collection cards={collection} onClear={clearCollection} />
        )}
      </main>
    </div>
  );
}