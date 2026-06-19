import { useState } from "react";
import "./AddNote.css";

import { TOPICS, DIFFICULTIES } from "../data/options";

import SolutionCard from "../components/SolutionCard";

function AddNote() {
const [title, setTitle] = useState("");

const [questionNumber, setQuestionNumber] = useState("");
const [questionName, setQuestionName] = useState("");

const [description, setDescription] = useState("");
const [isStarred, setIsStarred] = useState(false);

const [difficulty, setDifficulty] = useState("");

const [selectedTopics, setSelectedTopics] = useState([]);
const [customTopic, setCustomTopic] = useState("");

const [bruteForce, setBruteForce] = useState({
tc: "",
sc: "",
customTC: "",
customSC: "",
solution: "",
});

const [optimal, setOptimal] = useState({
tc: "",
sc: "",
customTC: "",
customSC: "",
solution: "",
});

const [topicSearch, setTopicSearch] = useState("");

const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

const filteredTopics = TOPICS.filter(
  (topic) =>
    topic.toLowerCase().includes(topicSearch.toLowerCase()) &&
    !selectedTopics.includes(topic)
);
const handleSave = () => {

    const existingNotes =
        JSON.parse(localStorage.getItem("notes")) || [];
    
    const duplicateNote = existingNotes.find(
        (note) => note.questionNumber === questionNumber
    );
    
    if (duplicateNote) {
        alert(
        `Question #${questionNumber} already exists!`
        );
        return;
    }
    
    const note = {
        id: crypto.randomUUID(),
    
        questionNumber,
        questionName,
        description,
    
        isStarred,
    
        difficulty,
    
        topics: selectedTopics,
    
        bruteForce,
        optimal,
        status:
        bruteForce.solution.trim() &&
        optimal.solution.trim()
            ? "complete"
            : "incomplete",
    
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
    
    existingNotes.push(note);
    
    localStorage.setItem(
        "notes",
        JSON.stringify(existingNotes)
    );
    
    alert("Note saved successfully!");
        
  };



return (
    <div className="add-note-page">
  
      <div className="question-header">
  
      <input
        type="number"
        placeholder="Question Number"
        className="question-number"
        value={questionNumber}
        onChange={(e) =>
            setQuestionNumber(e.target.value)
        }
        />
  
        <input
          type="text"
          placeholder="Question Name"
          className="question-name"
          value={questionName}
          onChange={(e) =>
          setQuestionName(e.target.value)
          }
        />
  
        <button
          type="button"
          className={`star-btn ${isStarred ? "active" : ""}`}
          onClick={() => setIsStarred(!isStarred)}
        >
          {isStarred ? "★" : "☆"}
        </button>

        <button
          type="button"
          className="save-btn"
          onClick={handleSave}
        >
        Save
        </button>
  
      </div>
  
      <div className="workspace">
  
        <div className="metadata-panel">
  
          <div className="field-group">
            <label>Description</label>
  
            <textarea
            placeholder="Write a short description..."
            spellCheck={false}
            value={description}
            onChange={(e) =>
                setDescription(e.target.value)
            }
            />
          </div>
  
          <div className="field-group">
            <label>Difficulty</label>
  
            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value)
              }
            >
              <option value="" disabled>
                Choose Difficulty
              </option>
  
              {DIFFICULTIES.map((level) => (
                <option
                  key={level}
                  value={level}
                >
                  {level}
                </option>
              ))}
            </select>
          </div>
  
          <div className="field-group topics-section">

          <label htmlFor="topic-search">
            Topics
            </label>

            <div className="selected-topics">
            {selectedTopics.map((topic) => (
                <div
                key={topic}
                className="selected-topic-chip"
                >
                <span>{topic}</span>

                <button
                    type="button"
                    onClick={() => toggleTopic(topic)}
                >
                    ×
                </button>
                </div>
            ))}
            </div>

            <input
            id="topic-search"
            name="topicSearch"
            type="text"
            placeholder="Search topic..."
            value={topicSearch}
            onChange={(e) => setTopicSearch(e.target.value)}
            className="topic-search"
            />

            {topicSearch && filteredTopics.length > 0 && (
            <div className="topic-dropdown">
                {filteredTopics.map((topic) => (
                <button
                    key={topic}
                    type="button"
                    className="topic-option"
                    onClick={() => {
                    toggleTopic(topic);
                    setTopicSearch("");
                    }}
                >
                    {topic}
                </button>
                ))}
            </div>
            )}

          </div>
  
        </div>
  
        <div className="editor-panel">
  
          <SolutionCard
            title="Brute Force"
            data={bruteForce}
            setData={setBruteForce}
            placeholder="Write brute force solution..."
          />
  
          <SolutionCard
            title="Optimal"
            data={optimal}
            setData={setOptimal}
            placeholder="Write optimal solution..."
          />
  
        </div>
  
      </div>
  
    </div>
  );
}
export default AddNote;
