function Dashboard() {
    return (
      <>
        <div style={{ marginBottom: "40px" }}>
          <h1
            className="page-title"
            style={{
              fontSize: "36px",
              marginBottom: "12px",
            }}
          >
            LeetNotes
          </h1>
  
          <p
            style={{
              color: "#6b7280",
              fontSize: "16px",
            }}
          >
            DSA Knowledge Manager
          </p>
        </div>
  
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "30px",
            minHeight: "400px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ color: "#6b7280" }}>
            Analytics Coming Soon...
          </h2>
        </div>
      </>
    );
  }
  
  export default Dashboard;