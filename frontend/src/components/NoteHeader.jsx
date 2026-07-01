import "./NoteHeader.css";

function NoteHeader({
  questionNumber,
  setQuestionNumber,

  questionName,
  setQuestionName,

  showMetadata,
  setShowMetadata,

  isStarred,
  setIsStarred,

  handleSave,
}) {
  return (

    <div className="note-header-card">

      <input
        type="text"
        placeholder="Qn No."
        value={questionNumber}
        onChange={(e) =>
          setQuestionNumber(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Question Name"
        value={questionName}
        onChange={(e) =>
          setQuestionName(e.target.value)
        }
      />

      <button
        className="metadata-btn"
        onClick={() =>
          setShowMetadata(!showMetadata)
        }
      >
        {showMetadata
          ? "▲"
          : "▼"}
      </button>

      <button
        onClick={() =>
          setIsStarred(!isStarred)
        }
      >
        {isStarred ? "★" : "☆"}
      </button>

      <button onClick={handleSave}>
        Save
      </button>

    </div>

  );
}

export default NoteHeader;