import { COMPLEXITIES } from "../data/options";

function ComplexityField({
  label,
  placeholder,
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
            placeholder={placeholder}
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
            {placeholder}
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