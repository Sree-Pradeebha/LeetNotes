import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import AddNote from "./pages/AddNote";
import NoteDetail from "./pages/NoteDetail";
import Revision from "./pages/Revision";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notes" element={<Notes />} />
          <Route
          path="/add-note"
          element={<AddNote />}
          />
          <Route
          path="/edit-note/:id"
          element={<AddNote />}
          />
          <Route
          path="/notes/:id"
          element={<NoteDetail />}
          />
          <Route path="/revision" element={<Revision />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;