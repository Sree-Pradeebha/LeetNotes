import "./TopBar.css";

function TopBar({ isSidebarOpen }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        {!isSidebarOpen && (
          <h2 className="topbar-logo">
            LeetNotes
          </h2>
        )}
      </div>

      <div className="topbar-right">
        <input
          type="text"
          placeholder="Search..."
          className="search-box"
        />

        <div className="profile-avatar">
          SP
        </div>
      </div>
    </header>
  );
}

export default TopBar;