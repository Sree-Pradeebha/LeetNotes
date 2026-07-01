
import "./MetadataBar.css";

function MetadataBar({
  difficulty,
  setDifficulty,

  status,
  setStatus,

  topicSearch,
  setTopicSearch,
  
  selectedTopics,

  toggleTopic,

  filteredTopics,
}) {
  return (
    <div className="metadata-bar">
  
      {/* Difficulty */}
  
      <select
        value={difficulty}
        onChange={(e) =>
          setDifficulty(e.target.value)
        }
      >
        <option value="">
          Difficulty
        </option>
  
        <option value="Easy">
          Easy
        </option>
  
        <option value="Medium">
          Medium
        </option>
  
        <option value="Hard">
          Hard
        </option>
      </select>
  
  
      {/* Status */}
  
      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >
        <option value="incomplete">
          Incomplete
        </option>
  
        <option value="complete">
          Complete
        </option>
      </select>
  
      <div className="topic-search-wrapper">
      {/* Topics */}
  
        <div className="topics-section">

          <input
              type="text"
              placeholder="Search topics..."
              value={topicSearch}
              onChange={(e) =>
                  setTopicSearch(e.target.value)
              }
          />

          <div className="selected-topics">

              {selectedTopics.map((topic) => (

                  <div
                      key={topic}
                      className="topic-chip"
                  >
                      {topic}

                      <button
                          type="button"
                          onClick={() =>
                              toggleTopic(topic)
                          }
                      >
                          ×
                      </button>

                  </div>

              ))}

          </div>

          {topicSearch && (

              <div className="topic-dropdown">

                  {filteredTopics.map((topic) => (

                      <div
                          key={topic}
                          className="dropdown-item"
                          onClick={() => {

                              toggleTopic(topic);

                              setTopicSearch("");

                          }}
                      >
                          {topic}
                      </div>

                  ))}

              </div>

          )}

        </div>
      </div>
    </div>
  );
}

export default MetadataBar;