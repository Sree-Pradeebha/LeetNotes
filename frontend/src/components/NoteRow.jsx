import { Link } from "react-router-dom";

function NoteRow({ note }) {
  return (
    <Link
      to={`/notes/${note.questionNumber}`}
      className="note-row"
    >
      <div className="note-status">
        {note.status === "complete" ? "✓" : "○"}
      </div>

      <div className="note-title">
        {note.questionNumber}. {note.questionName}
      </div>

      <div
        className={`difficulty ${note.difficulty.toLowerCase()}`}
      >
        {note.difficulty}
      </div>

      <div className="note-star">
        {note.isStarred ? "★" : "☆"}
      </div>
    </Link>
  );
}

export default NoteRow;