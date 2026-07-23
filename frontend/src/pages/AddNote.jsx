import { useState, useEffect } from "react";
import "./AddNote.css";
import { TOPICS, DIFFICULTIES } from "../data/options";
import SolutionCard from "../components/SolutionCard";
import NoteHeader from "../components/NoteHeader";
import MetadataBar from "../components/MetadataBar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  createNote,
  updateNote,
  getNote,
} from "../api/note";

function AddNote() {
const [title, setTitle] = useState("");

const [questionNumber, setQuestionNumber] = useState("");
const [questionName, setQuestionName] = useState("");

const [description, setDescription] = useState("");
const [personalNotes, setPersonalNotes] = useState("");
const [isStarred, setIsStarred] = useState(false);
const [showMetadata, setShowMetadata] = useState(false);

const [difficulty, setDifficulty] = useState("");
const [status, setStatus] = useState("incomplete");
const [revisionImportance, setRevisionImportance] = useState("Low");

const [selectedTopics, setSelectedTopics] = useState([]);
const [customTopic, setCustomTopic] = useState("");
const { id } = useParams();
const navigate = useNavigate();
const [bruteForce, setBruteForce] = useState({
language: "python",
tc: "",
sc: "",
customTC: "",
customSC: "",
solution: "",
});

const [optimal, setOptimal] = useState({
language: "python",
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
const handleSave = async () => {

  if (
      !questionNumber.trim() ||
      !questionName.trim()
  ) {
      alert("Please enter Question Number and Question Name.");
      return;
  }

  const note = {

      questionNumber,
      questionName,

      description,
      personalNotes,

      isStarred,

      difficulty,
      status,
      revisionImportance,

      topics: selectedTopics,

      bruteForce,
      optimal,

  };

  try {

      if (id) {

          await updateNote(id, note);

          alert("Note updated successfully!");
          navigate("/notes");

      } else {

          await createNote(note);

          alert("Note saved successfully!");
          navigate("/notes");

      }

  } catch (err) {

      alert(
          err.response?.data?.message ||
          "Something went wrong."
      );

  }

};
useEffect(() => {

  if (!id) return;

  const fetchNote = async () => {

      try {

          const note = await getNote(id);

          setQuestionNumber(note.questionNumber);
          setQuestionName(note.questionName);

          setDescription(note.description);

          setPersonalNotes(note.personalNotes);

          setIsStarred(note.isStarred);

          setDifficulty(note.difficulty);

          setRevisionImportance(note.revisionImportance || "Low");

          setSelectedTopics(note.topics);

          setBruteForce(note.bruteForce);

          setOptimal(note.optimal);

          setStatus(note.status);

      } catch (err) {

          console.error(err);

      }

  };

  fetchNote();

}, [id]);



  return (

    <div className="add-note-page">
  
      {/* Fixed Header */}
  
      <div className="question-header">
  
      <NoteHeader
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}

        questionName={questionName}
        setQuestionName={setQuestionName}

        showMetadata={showMetadata}
        setShowMetadata={setShowMetadata}

        isStarred={isStarred}
        setIsStarred={setIsStarred}

        handleSave={handleSave}
      />
  
      </div>
  
  
      {/* Metadata */}
  
      <div className="metadata-wrapper">

        {showMetadata && (
          <MetadataBar
            difficulty={difficulty}
            setDifficulty={setDifficulty}

            status={status}
            setStatus={setStatus}

            revisionImportance={revisionImportance}
            setRevisionImportance={setRevisionImportance}

            topicSearch={topicSearch}
            setTopicSearch={setTopicSearch}

            selectedTopics={selectedTopics}

            toggleTopic={toggleTopic}

            filteredTopics={filteredTopics}
          />
        )}

      </div>
  
  
      {/* Main Workspace */}
  
      <div className="workspace"
      style={{
        height: showMetadata
          ? "calc(100vh - 190px)"
          : "calc(100vh - 130px)",
      }}>
  
  
        {/* LEFT COLUMN */}
  
        <div className="notes-panel">

          
            {/* Description */}
    
            <div className="note-card">
    
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
    
    
            {/* Personal Notes */}
    
            <div className="note-card">
    
              <label>Personal Notes</label>
    
              <textarea
                placeholder="Write observations, edge cases, mistakes, tricks..."
                spellCheck={false}
    
                value={personalNotes}
                onChange={(e) =>
                  setPersonalNotes(e.target.value)
                }
              />
    
            </div>
          
        </div>
  
  
        {/* RIGHT COLUMN */}
  
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
