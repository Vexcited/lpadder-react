import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import localforage from 'localforage';

import { Howl, Howler } from 'howler';

import VirtualLaunchpad from "../components/VirtualLaunchpad";

export default function Play () {
    const [ project, setProject ] = useState({ metas: { title: "", songAuthor: "", coverAuthor: "" }});
    const [ howlSamples, setHowlSamples ] = useState({});

    const [ numberVLaunchpad, setNumberVLaunchpad ] = useState(0)

    const history = useHistory();

    // Getting the samples
    useEffect (() => {
        localforage.getItem("project")
        .then (data => {
            setProject(data);

            if (data.samples) {
                setNumberVLaunchpad(data.samples.length);

                var samples = {}

                for (let launchpadKey in data.samples) {

                    // Create a new virtual launchpad for every key
                    console.log(`[data.samples] Called VirtualLaunchpad for Launchpad "${launchpadKey}"`)

                    
                    for (let pages of data.samples[launchpadKey]) {
                        Object.keys(pages).forEach((note, page) => {

                            // Check if multi-sample or not
                            if (Array.isArray(pages[note])) {
                                pages[note].forEach ((mutlisample, mutlisampleKey) => {
                                    if (Object.keys(samples[mutlisample["audio"]]).length === 0) {
                                        samples[mutlisample["audio"]] = {}
                                    }
                                    samples[mutlisample["audio"]][`${launchpadKey}-${page}-${note}+${mutlisampleKey}`] = [mutlisample["start"], mutlisample["end"]]
                                })
                            }
                            else {
                                if (Object.keys(samples[pages[note]["audio"]]).length === 0) {
                                    samples[pages[note]["audio"]] = {}
                                }
                                samples[pages[note]["audio"]][`${launchpadKey}-${page}-${note}`] = [pages[note]["start"], pages[note]["end"]]
                            }
                        });
                    }
                }

                console.log(samples)
            }
            else {
                console.error("Error in the JSON file: `(root).samples` is missing.")
            }
        })
/* TODO: after editor (samples loading logic)
            // Number of launchpad used
            for (let launchpads of project.samples) {

                // Getting pages
                for (let pages of launchpads) {

                    // Every samples in `pages`
                    for (let sample in pages) {
                        if (pages.hasOwnProperty(sample)) {

                            // Check if multi-sample or not
                            if (Array.isArray(pages[sample])) {
                                // TODO MULTISAMPLE
                                console.log("is an array")
                            }
                            else {
                                console.log("is an object")
                            }
                        }
                    }
                }
*/
        .catch (e => {
            console.error(`No file opened ! Redirecting to <Welcome />...\n[Logs]`, e);
            history.push("/");
        })
    }, []);

    return (
        <div>
            <h1>{project.metas.title}</h1>

            {Array(numberVLaunchpad).fill(0).map((_, key) => <VirtualLaunchpad key={key} launchpadKey={key} />)}

            <Link to="/editor">Go to editor</Link>
        </div>
    );
}