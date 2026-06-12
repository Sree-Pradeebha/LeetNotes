import ComplexityField from "./ComplexityField";

function SolutionCard({
title,
data,
setData,
placeholder,
}) {
return ( <div className="solution-card">

  <div className="card-header">

    <h3>{title}</h3>

    <div className="complexities">

      <ComplexityField
        label="TC"
        value={data.tc}
        customValue={data.customTC}
        onChange={(value) =>
          setData((prev) => ({
            ...prev,
            tc: value,
          }))
        }
        onCustomChange={(value) =>
          setData((prev) => ({
            ...prev,
            customTC: value,
          }))
        }
      />

      <ComplexityField
        label="SC"
        value={data.sc}
        customValue={data.customSC}
        onChange={(value) =>
          setData((prev) => ({
            ...prev,
            sc: value,
          }))
        }
        onCustomChange={(value) =>
          setData((prev) => ({
            ...prev,
            customSC: value,
          }))
        }
      />

    </div>

  </div>

  <textarea
    className="solution-editor"
    placeholder={placeholder}
    spellCheck={false}
    value={data.solution}
    onChange={(e) =>
      setData((prev) => ({
        ...prev,
        solution: e.target.value,
      }))
    }
  />

</div>


);
}

export default SolutionCard;
