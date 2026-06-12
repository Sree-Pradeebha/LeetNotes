import { useState } from "react";
import "./AddNote.css";

import { TOPICS, DIFFICULTIES } from "../data/options";

import SolutionCard from "../components/SolutionCard";

function AddNote() {
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

const toggleTopic = (topic) => {
setSelectedTopics((prev) =>
prev.includes(topic)
? prev.filter((t) => t !== topic)
: [...prev, topic]
);
};

return (
    <div className="add-note-page">
  
      <div className="question-header">
  
        <input
          type="number"
          placeholder="Question Number"
          className="question-number"
        />
  
        <input
          type="text"
          placeholder="Question Name"
          className="question-name"
        />
  
        <button
          type="button"
          className={`star-btn ${isStarred ? "active" : ""}`}
          onClick={() => setIsStarred(!isStarred)}
        >
          {isStarred ? "★" : "☆"}
        </button>
  
      </div>
  
      <div className="workspace">
  
        <div className="metadata-panel">
  
          <div className="field-group">
            <label>Description</label>
  
            <textarea
              placeholder="Write a short description..."
              spellCheck={false}
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
  
          <div className="field-group">
  
            <label>Topics</label>
  
            {selectedTopics.includes("Other") && (
              <input
                type="text"
                placeholder="Enter custom topic"
                value={customTopic}
                onChange={(e) =>
                  setCustomTopic(e.target.value)
                }
                className="custom-topic-input"
              />
            )}
  
            <div className="topics-container">
  
              {TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  className={`topic-chip ${
                    selectedTopics.includes(topic)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    toggleTopic(topic)
                  }
                >
                  {topic}
                </button>
              ))}
  
            </div>
  
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
