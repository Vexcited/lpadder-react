import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import styles from '../styles/Play.module.css';

import localforage from 'localforage';
import useDynamicRefs from 'use-dynamic-refs';

import { Howl, Howler } from 'howler';
import launchpad from "launchpad-midi-converter";

export default function Play () {
    const [ project, setProject ] = useState({ metas: { title: "", songAuthor: "", coverAuthor: "" }});
    const [ howlSamples, setHowlSamples ] = useState({});
    const history = useHistory();

    // Getting the samples
    useEffect (() => {
        localforage.getItem("project")
        .then (setProject)
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

    // Change pads size
    const onSizePadsChange = (e) => {
        // console.log(e.target.value);
        document.documentElement.style.setProperty("--VirtualLaunchpad-padSize", `${e.target.value}px`)
    }

    return (
        <div>
            <h1>{project.metas.title}</h1>
            <VirtualLaunchpad launchpadKey={0} />
            <input type="range" onInput={onSizePadsChange} min="1" max="127" />

            <Link to="/editor">Go to editor</Link>
        </div>
    );
}

function VirtualLaunchpad ({ launchpadKey }) {
	const [getRef, setRef] = useDynamicRefs();

    /**
     * Play the sample from Howler
     */
    const playSample = ({ note, launchpad }) => {
        
    }

    const playLight = ({ note, launchpad }) => {
        // TODO: check user settings
        // if show played button is true then
        const initialColor = document.documentElement.style.getPropertyValue("--VirtualLaunchpad-padColor");
        
        let el = getRef(`${launchpad}.${note}`).current
        
        el.style.backgroundColor = "#000";
        setTimeout(() => el.style.backgroundColor = initialColor, 250)
    }
	
	// Handle virtual clicks
	// const handleClick = (note, color) => {
	const handleClick = (evt) => {
        console.log(`[VirtualLaunchpad] Clicked`, evt.target.dataset)
        playSample (evt.target.dataset)
        playLight (evt.target.dataset)
	}
	
	// Generate the Virtual Launchpad to DOM
    let layout = launchpad.layout("programmer");
    let dom = []

    layout.forEach ((rows, key) => {
        let row = [];

        rows.forEach (pad => {
            row.push(
				<div className={styles.padSquare}
					key={pad}
					data-note={pad}
                    data-launchpad={launchpadKey}
					ref={setRef(`${launchpadKey}.${pad}`)}
					onClick={handleClick}
				></div>
			);
        })

        dom.push(
            <div className={styles.padRow} key={key}>
               {row}
           </div>
        )
    })
	
	return <div className={styles.padRowsContainer}>{dom}</div>;
}