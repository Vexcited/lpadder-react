import { Link, useHistory } from 'react-router-dom';
import localforage from 'localforage';

export default function Welcome () {
    const history = useHistory();


    const openFileHandler = (e) => {
        e.preventDefault();

        // Get ZIP file
        let file = e.target.files[0];
        console.log(`Cover opened ! ZIP name:`, file.name);

        localforage.setItem("project", {
            file, name: file.name
        })
        .then(() => {
            console.log(`Cover saved locally ! (used localforage)`);

            // Redirect to "/play" and load the cover
            history.push("/play");
        })

        // Reset file input for new imports...
        e.target.value = null;
    }

    return (
        <div>
            <h1>Welcome to <strong>lpadder</strong> !</ h1>
            <input type="file" accept=".zip" onChange={openFileHandler} />
            <button onClick={console.log}>Start something new</button>
            <Link to="/about">About this project...</Link>
        </div>
    )
}