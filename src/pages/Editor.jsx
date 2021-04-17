import { useEffect, useState } from "react";
import localforage from "localforage";

import { useHistory } from "react-router-dom";

export default function Editor() {

    const history = useHistory();
    const [ project, setProject ] = useState({
        metas: { title: "Untitled", songAuthor: "Nobody", coverAuthor: "Someone" },
        samples: [],
        lights: []
    });

    useEffect (() => {
        localforage.getItem("project")
        .then(setProject)
        .catch(e => {
            console.error("No project opened", e)
            history.push("/")
        })
    }, [])


    const applyChanges = (e) => {
        e.preventDefault()

        localforage.setItem("project", project)
        .then((saved_log) => {
            console.log("Done ! Saved", saved_log)
        })
        .catch(e => {
            console.error("An error as occured !", e)
        })
    }

    const addLaunchpad = (e) => {
        e.preventDefault()

        project.samples.push([])
        setProject({...project})
    }

    return (
        <div>
            <h1>Editing {project.metas.title} by {project.metas.songAuthor}</h1>

            <input
                onInput={(e) => { project.metas.title = e.target.value; setProject({...project}) }}
                placeholder="Cover Title"
                value={project.metas.title}
            />
            <input
                onInput={(e) => { project.metas.songAuthor = e.target.value; setProject({...project}) }}
                placeholder="Song Author"
                value={project.metas.songAuthor}
            />
            <input
                onInput={(e) => { project.metas.coverAuthor = e.target.value; setProject({...project}) }}
                placeholder="Cover Author"
                value={project.metas.coverAuthor}
            />

            <button
                onClick={applyChanges}
            >
                Apply changes !
            </button>


            <span>Number of launchpad: {project.samples.length}</span>

            <button
                onClick={addLaunchpad}
            >
                Add a Launchpad
            </button>
        </div>
    );
}