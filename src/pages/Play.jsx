import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from '../styles/Play.module.css';

import localforage from 'localforage';
import useDynamicRefs from 'use-dynamic-refs';

import { Howl, Howler } from 'howler';
import launchpad from "launchpad-midi-converter";

export default function Play () {
    const [ samples, setSamples ] = useState({});
    const history = useHistory();

    // Getting the samples
    useEffect (() => {
        localforage.getItem("project")
        .then (project => {
            let pages = project.samples
            let lights = project.lights

            for (var samples in pages) {
                if (pages.hasOwnProperty(samples)) {
                    console.log(samples, pages[samples])
                    pages[samples].forEach(sample => {
                        console.log(sample.pad)
                    });
                }
            }
        })
        .catch (e => {
            console.error(`No file opened ! Redirected to <Welcome />...\n[Logs]`, e);
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
            <h1>Play !</h1>
            <VirtualLaunchpad launchpadKey={0} />
            <input type="range" onInput={onSizePadsChange} min="1" max="127" />
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