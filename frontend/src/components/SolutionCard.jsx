import ComplexityField from "./ComplexityField";
import { autocompletion } from "@codemirror/autocomplete";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import "./SolutionCard.css";

function SolutionCard({
title,
data,
setData,
placeholder,
}) {

const getLanguageExtension = () => {
    switch (data.language) {
        case "cpp":
        return cpp();
    
        case "java":
        return java();
    
        case "javascript":
        return javascript();
    
        default:
        return python();
    }
    };

return (

    <div className="solution-card">
    
        <div className="solution-header">
    
        <div className="solution-left">
    
            <h3>{title}</h3>
    
            <select
            className="language-select"
            value={data.language}
            onChange={(e) =>
                setData((prev) => ({
                ...prev,
                language: e.target.value,
                }))
            }
            >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            </select>
    
        </div>
    
    
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
    
    
        <CodeMirror
        value={data.solution}
        height="300px"
        extensions={[
            getLanguageExtension(),
            autocompletion({
            activateOnTyping: false
            })
        ]}
        onChange={(value) =>
            setData((prev) => ({
            ...prev,
            solution: value,
            }))
        }
        />
    
    </div>
    
    );
}

export default SolutionCard;
