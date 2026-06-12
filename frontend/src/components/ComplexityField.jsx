import { COMPLEXITIES } from "../data/options";

function ComplexityField({
    label,
    value,
    customValue,
    onChange,
    onCustomChange,
  }) {
    return (
        <div className="complexity-field">
      
          <label>{label}</label>
      
          {value === "Other" ? (
            <div className="custom-complexity">
      
              <input
                type="text"
                placeholder={`Enter ${label}`}
                value={customValue}
                onChange={(e) =>
                  onCustomChange(e.target.value)
                }
              />
      
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  onCustomChange("");
                }}
              >
                ↺
              </button>
      
            </div>
          ) : (
            <select
              value={value}
              onChange={(e) =>
                onChange(e.target.value)
              }
            >
              <option value="" disabled>
                Choose Complexity
              </option>
      
              {COMPLEXITIES.map((complexity) => (
                <option
                  key={complexity}
                  value={complexity}
                >
                  {complexity}
                </option>
              ))}
            </select>
          )}
      
        </div>
      );
}

export default ComplexityField;