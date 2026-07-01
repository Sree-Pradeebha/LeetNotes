import "./Dashboard.css";

function Dashboard() {

    const notes =
        JSON.parse(
            localStorage.getItem("notes")
        ) || [];

    const totalQuestions = notes.length;

    const easyCount = notes.filter(
        note => note.difficulty === "Easy"
    ).length;

    const mediumCount = notes.filter(
        note => note.difficulty === "Medium"
    ).length;

    const hardCount = notes.filter(
        note => note.difficulty === "Hard"
    ).length;

    const starredCount = notes.filter(
        note => note.isStarred
    ).length;

    const completedCount = notes.filter(
        note => note.status === "complete"
    ).length;

    const completionPercentage =
        totalQuestions === 0
            ? 0
            : Math.round(
                completedCount * 100 /
                totalQuestions
              );

    const topicFrequency = {};

    notes.forEach(note => {

        note.topics?.forEach(topic => {

            topicFrequency[topic] =
                (topicFrequency[topic] || 0) + 1;

        });

    });

    const topTopics = Object.entries(
        topicFrequency
    )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

    return (

        <div className="dashboard-container">

            <h1>Dashboard</h1>

            <div className="stats-grid">

                <div className="stat-card">
                    <h2>{totalQuestions}</h2>
                    <p>Total Questions</p>
                </div>

                <div className="stat-card">
                    <h2>{easyCount}</h2>
                    <p>Easy</p>
                </div>

                <div className="stat-card">
                    <h2>{mediumCount}</h2>
                    <p>Medium</p>
                </div>

                <div className="stat-card">
                    <h2>{hardCount}</h2>
                    <p>Hard</p>
                </div>

                <div className="stat-card">
                    <h2>{starredCount}</h2>
                    <p>Starred</p>
                </div>

                <div className="stat-card">
                    <h2>{completionPercentage}%</h2>
                    <p>Completion</p>
                </div>

            </div>

            <div className="topics-card">

                <h2>Top Topics</h2>

                {
                    topTopics.length === 0

                    ?

                    <p>No topics yet.</p>

                    :

                    topTopics.map(
                        ([topic, count]) => (

                            <div
                                key={topic}
                                className="topic-row"
                            >

                                <span>{topic}</span>

                                <span>{count}</span>

                            </div>

                        )
                    )
                }

            </div>

        </div>

    );

}

export default Dashboard;