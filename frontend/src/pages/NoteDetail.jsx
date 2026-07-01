import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NoteDetail.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";


function NoteDetail() {
const { id } = useParams();
const navigate = useNavigate();

const notes =
JSON.parse(localStorage.getItem("notes")) || [];

const note = notes.find(
(note) => note.id === id
);

const handleDelete = () => {
const confirmed = window.confirm(
"Delete this note?"
);


if (!confirmed) return;

const updatedNotes = notes.filter(
  (note) =>
    note.id !== id
);

localStorage.setItem(
  "notes",
  JSON.stringify(updatedNotes)
);

navigate("/notes");


};

if (!note) {
return <h1>Note Not Found</h1>;
}

return (
    <div className="note-detail-container">
  
      <div className="note-header">

        <div className="title-row">

        <h1 className="note-title">
            {note.questionNumber}. {note.questionName}
        </h1>

        {note.isStarred && (
            <div className="star-container">
            <span className="star-icon">★</span>
            </div>
        )}

        </div>

        <div className="bottom-row">

        <div className="note-tags">

            <span className="difficulty-tag">
            {note.difficulty}
            </span>

            {note.topics.map((topic) => (
            <span
                key={topic}
                className="topic-tag"
            >
                {topic}
            </span>
            ))}

        </div>

        <div className="note-actions">

            <Link
            className="edit-btn"
            to={`/edit-note/${note.id}`}
            >
            Edit
            </Link>

            <button
            className="delete-btn"
            onClick={handleDelete}
            >
            Delete
            </button>

        </div>

        </div>

      </div>
  
      <section className="note-section">
  
        <h2>Description</h2>
  
        <p>{note.description}</p>
  
      </section>
  
  
      <section className="solution-card">
  
        <h2>Brute Force</h2>
  
        <div className="complexities">
  
          <span>
            TC: {note.bruteForce.tc}
          </span>
  
          <span>
            SC: {note.bruteForce.sc}
          </span>
  
        </div>

        <SyntaxHighlighter
            language={note.bruteForce.language || "python"}
            style={oneLight}
            showLineNumbers={true}
            customStyle={{
                borderRadius: "12px",
                fontSize: "14px",
                padding: "24px",
                maxHeight: "500px",
                overflowY: "auto",
            }}
            >
            {note.bruteForce.solution}
        </SyntaxHighlighter>
  
      </section>
  
  
      <section className="solution-card">
  
        <h2>Optimal</h2>
  
        <div className="complexities">
  
          <span>
            TC: {note.optimal.tc}
          </span>
  
          <span>
            SC: {note.optimal.sc}
          </span>
  
        </div>
  
        <SyntaxHighlighter
            language={note.optimal.language || "python"}
            style={oneLight}
            showLineNumbers={true}
            customStyle={{
                borderRadius: "12px",
                fontSize: "14px",
                padding: "24px",
                maxHeight: "500px",
                overflowY: "auto",
            }}
        >
        {note.optimal.solution}
        </SyntaxHighlighter>
      </section>
  
    </div>
  );
}
export default NoteDetail;
