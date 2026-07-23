import { useState, useEffect } from "react";
import { getNotes } from "../api/note";
import "./Notes.css";
import NoteRow from "../components/NoteRow";
import { FiFilter } from "react-icons/fi";



function Notes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [revisionFilter, setRevisionFilter] = useState("all");
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [sortBy, setSortBy] = useState("questionNumber");
  const [showFilters, setShowFilters] = useState(false);
  const [topicFilter, setTopicFilter] = useState("all"); 
  const [notes, setNotes] = useState([]);

  const allTopics = [
      ...new Set(
        notes.flatMap(
          (note) => note.topics
        )
      ),
    ];

  const filteredNotes = notes.filter(
      (note) => {
    
        const matchesSearch =
          note.questionName
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );
    
        const matchesDifficulty =
          difficultyFilter === "all" ||
          note.difficulty ===
            difficultyFilter;
    
        const matchesTopic =
          topicFilter === "all" ||
          note.topics.includes(
            topicFilter
          );

        const matchesStatus =
          statusFilter === "all" ||
          note.status === statusFilter;

        const matchesRevision =
          revisionFilter === "all" ||
          note.revisionImportance ===
              revisionFilter;
    
        const matchesStarred =
          !showStarredOnly ||
          note.isStarred;
    
        return (
          matchesSearch &&
          matchesDifficulty &&
          matchesStatus &&
          matchesRevision &&
          matchesTopic &&
          matchesStarred
        );
      }
    );

  const sortedNotes = [...filteredNotes].sort(
    (a, b) => {
  
      if (sortBy === "recentlyAdded") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
  
      if (sortBy === "recentlyUpdated") {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
  
      return Number(a.questionNumber)
        - Number(b.questionNumber);
    }
  );

  

  useEffect(() => {

    const fetchNotes = async () => {

        try {

            const data = await getNotes();

            // Convert MongoDB's _id to id
            setNotes(
                data.map(note => ({
                    ...note,
                    id: note._id,
                }))
            );

        } catch (err) {

            console.error("Failed to fetch notes:", err);

        }

    };

    fetchNotes();

}, []);
  

  return (
    <div className="notes-page">

      <h1 className="notes-title">Notes</h1>
      <div className="search-row">
        <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) =>
                setSearchTerm(e.target.value)
            }
            className="notes-search"
        />

            <button
            className="filter-icon-btn"
            onClick={() =>
                setShowFilters(!showFilters)
            }
            >
            <FiFilter />
            </button>
      </div>
      <div
        className={`filters-panel ${
            showFilters ? "open" : ""
        }`}
        >
            <select
            value={difficultyFilter}
            onChange={(e) =>
                setDifficultyFilter(e.target.value)
            }
            >
            <option value="all">
                All Difficulties
            </option>

            <option value="Easy">Easy</option>

            <option value="Medium">Medium</option>

            <option value="Hard">Hard</option>
            </select>


            <select
            value={topicFilter}
            onChange={(e) =>
                setTopicFilter(e.target.value)
            }
            >
            <option value="all">
                All Topics
            </option>

            {allTopics.map((topic) => (
                <option
                key={topic}
                value={topic}
                >
                {topic}
                </option>
            ))}
            </select>

            <select
                value={sortBy}
                onChange={(e) =>
                    setSortBy(e.target.value)
                }
                >

                <option value="questionNumber">
                    Question Number
                </option>

                <option value="recentlyUpdated">
                    Recently Updated
                </option>

                <option value="recentlyAdded">
                    Recently Added
                </option>

            </select>


            <select
              value={statusFilter}
              onChange={(e) =>
                  setStatusFilter(e.target.value)
              }
            >

              <option value="all">
                  All Status
              </option>

              <option value="complete">
                  Complete
              </option>

              <option value="incomplete">
                  Incomplete
              </option>

            </select>

            <select
              value={revisionFilter}
              onChange={(e) =>
                  setRevisionFilter(e.target.value)
              }
            >

              <option value="all">
                  Revision Importance
              </option>

              <option value="Low">
                  Low
              </option>

              <option value="Medium">
                  Medium
              </option>

              <option value="High">
                  High
              </option>

            </select>

         
            <label>
            <input
                type="checkbox"
                checked={showStarredOnly}
                onChange={(e) =>
                setShowStarredOnly(
                    e.target.checked
                )
                }
            />

            Starred only
            </label>
        
            {
            (difficultyFilter !== "all" ||
            statusFilter !== "all" ||
            revisionFilter !== "all" ||
            topicFilter !== "all" ||
            showStarredOnly ||
            sortBy !== "questionNumber") && (

            <button
            className="clear-filters-btn"
            onClick={() => {
                setDifficultyFilter("all");
                setStatusFilter("all");
                setRevisionFilter("all"); 
                setTopicFilter("all");
                setShowStarredOnly(false);
                setSortBy("questionNumber");
            }}
            >
            Clear Filters
            </button>

            )}
        
      </div>



      <div className="notes-list">

      {sortedNotes.map((note) => (
        <NoteRow
            key={note._id}
            note={note}
        />
      ))}

        </div>

    </div>
  );
}

export default Notes;