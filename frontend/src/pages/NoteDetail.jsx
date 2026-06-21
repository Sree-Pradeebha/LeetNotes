import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function NoteDetail() {
const { questionNumber } = useParams();
const navigate = useNavigate();

const notes =
JSON.parse(localStorage.getItem("notes")) || [];

const note = notes.find(
(note) => note.questionNumber === questionNumber
);

const handleDelete = () => {
const confirmed = window.confirm(
"Delete this note?"
);


if (!confirmed) return;

const updatedNotes = notes.filter(
  (note) =>
    note.questionNumber !== questionNumber
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
  <div> 
    <button
     type="button"
     onClick={handleDelete}
    >
    Delete Note
    </button>

    <Link
    to={`/edit-note/${note.questionNumber}`}
    >
    Edit Note
    </Link>

  <h1>
    {note.questionNumber}. {note.questionName}
  </h1>

  <p>{note.description}</p>

  <h3>Difficulty</h3>
  <p>{note.difficulty}</p>

  <h3>Topics</h3>
  <p>{note.topics.join(", ")}</p>

  <h3>Brute Force</h3>

  <p>TC: {note.bruteForce.tc}</p>
  <p>SC: {note.bruteForce.sc}</p>

  <pre>
    {note.bruteForce.solution}
  </pre>

  <h3>Optimal</h3>

  <p>TC: {note.optimal.tc}</p>
  <p>SC: {note.optimal.sc}</p>

  <pre>
    {note.optimal.solution}
  </pre>
</div>

);
}

export default NoteDetail;
