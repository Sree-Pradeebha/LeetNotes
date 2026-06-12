import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ isOpen, toggleSidebar }) {
  const menuItems = [
    { path: "/", label: "Dashboard", short: "D" },
    { path: "/notes", label: "Notes", short: "N" },
    { path: "/add-note", label: "Add Note", short: "A" },
    { path: "/revision", label: "Revision", short: "R" },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>

      <div className="sidebar-header">
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      {isOpen && (
        <div className="logo">
          LeetNotes
        </div>
      )}
      </div>

      <nav className="nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            {isOpen ? item.label : item.short}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;