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
                console.log("[openFileHandler] Cover parsing...");
    
                // Fetching cover samples and lights
                let { samples, lights, metas } = cover;

                localforage.setItem("samples", [])
                .then(() => {
                    // Store the project for edit and play...
                    localforage.setItem("project", {
                        metas, samples, lights 
                    })
                    .then(() => {

                        // Take every sample in "samples" folder
                        // and store it in localforage as Base64
                        zip.folder("samples").forEach((_, sampleFile) => {
                            sampleFile.async("arraybuffer")
                            .then(sampleData => {
                                localforage.getItem("samples")
                                .then(currentSamples => {
                                    let newData = currentSamples.push({
                                        fileName: sampleFile.name,
                                        data: sampleData
                                    })
                                    localforage.setItem("samples", newData)
                                    .then(() => {
                                        console.log("Done with", sampleFile.name)
                                    })
                                });
                            })
                        })

                            // Reset file input for new imports...
                            e.target.value = null;

                            // Redirecting to /play
                            history.push("/play");
                        });  
                    
                });
            });
        });
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