import localforage from "localforage";

export default function Settings () {

    const handleInputChange = (e) => {
        let input = e.target.value;
        //localforage.setItem("settings")
    };

    return (
        <div>
            <h1>Launchpad</h1>
            <span>Input</span>
            <select onChange={handleInputChange}>
                <option value={null} selected>
                    Connect a Launchpad
                </option>
            </select>
        </div>
    );
}