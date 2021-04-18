import { useState } from "react";

export default function Settings () {

    const [state, setState] = useState({
        launchpadInputs: "null",
        launchpadOutputs: "null",
        showPressedButton: true
    })

    const handleInputChange = (e) => {
        let newValue = e.target.value;

        setState({launchpadInputs: newValue, ...state})
    };

    return (
        <div>
            <h1>Launchpad</h1>
            <span>Input</span>
            <select
                value={state.launchpadInputs}
                onChange={handleInputChange}
            >
                <option value="null">
                    Connect a Launchpad
                </option>
            </select>
        </div>
    );
}