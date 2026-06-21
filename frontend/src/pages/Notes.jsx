import { useState, useEffect } from "react";
import "./Notes.css";
import NoteRow from "../components/NoteRow";


function Notes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [sortBy, setSortBy] = useState("recentlyUpdated");
  const notes =
    JSON.parse(localStorage.getItem("notes")) || [];

    const filteredNotes = notes.filter((note) => {

        const matchesSearch =
          note.questionName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
      
          note.questionNumber
            .toString()
            .includes(searchTerm);
      
        const matchesDifficulty =
          difficultyFilter === "All" ||
          note.difficulty === difficultyFilter;
      
          const matchesStarred =
          !showStarredOnly ||
          note.isStarred;
        
        return (
          matchesSearch &&
          matchesDifficulty &&
          matchesStarred
        );
      });

    const sortedNotes = [...filteredNotes].sort(
    (a, b) => {
    
        if (sortBy === "recentlyAdded") {
        return b.createdAt - a.createdAt;
        }
    
        return b.updatedAt - a.updatedAt;
    }
    );

  

  return (
    <div className="notes-page">

      <h1>Notes</h1>

      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) =>
            setSearchTerm(e.target.value)
        }
        className="notes-search"
      />


      <div className="difficulty-filters">

      {["All", "Easy", "Medium", "Hard"].map(
      (level) => (
          <button
          key={level}
          className={
              difficultyFilter === level
              ? "filter-btn active"
              : "filter-btn"
          }

          onClick={() =>
              setDifficultyFilter(level)
          }
          >
          {level}
          </button>
      )
      )}

          <button
          className={
              showStarredOnly
              ? "filter-btn active"
              : "filter-btn"
          }

          onClick={() =>
              setShowStarredOnly(
              !showStarredOnly
              )
          }
          >
          ★ Starred
          </button>

      </div>

      <select
        value={sortBy}
        onChange={(e) =>
            setSortBy(e.target.value)
        }
        className="sort-select"
        >

        <option value="recentlyUpdated">
            Recently Updated
        </option>

        <option value="recentlyAdded">
            Recently Added
        </option>

      </select>

      <div className="notes-list">

      {sortedNotes.map((note) => (
        <NoteRow
            key={note.id}
            note={note}
        />
      ))}

        </div>

    </div>
  );
}

export default Notes;