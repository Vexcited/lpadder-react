import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import localforage from 'localforage';
import JSZip from 'jszip';

export default function Welcome () {
    const history = useHistory();

    // Check if a project was already loaded locally...
    const [isAlreadyOpened, setAlreadyOpened] = useState(false);
    useEffect(() => {
        localforage.getItem("project")
        .then(data => {
            if (data !== null) {
                setAlreadyOpened(true)
            }
            else {
                setAlreadyOpened(false)
            }
        })
        .catch(() => setAlreadyOpened(false));
    }, [])

    // When user open a new file
    const openFileHandler = (e) => {
        e.preventDefault();
    
        JSZip.loadAsync(e.target.files[0])
        .then (zip => {
            zip.file("cover.json").async("string")
            .then (data => {
                let cover = JSON.parse(data);
                console.log("openFileHandler: ", cover);
    
                // Fetching cover samples and lights
                let samples = cover.samples;
                let lights = cover.lights;
                
                // Store the cover for edit and play
                localforage.setItem("project", {
                    samples, lights 
                })
                .then(() => {
                    // Reset file input for new imports...
                    e.target.value = null;
                    history.push("/play");
                })      
            })
        })
    }

    const startNewProject = () => {
        const emptyProject = { samples: {}, lights: {} };
        localforage.setItem("project", emptyProject).then(() => {
            // To create a new project we need to have the project item
            console.log("startNewProject: localforage has been cleared.");
            history.push("/play");
        })
    };

    return (
        <div>
            <h1>Welcome to <strong>lpadder</strong> !</ h1>
            {isAlreadyOpened && 
                <Link to="/play">Opened project detected ! Resume it</Link>
            }
            
            <input type="file" accept=".zip" onChange={openFileHandler} />
            <button onClick={startNewProject}>Start something new</button>
            <Link to="/about">About this project...</Link>
        </div>
    );
}