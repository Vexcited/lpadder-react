import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Howl, Howler} from 'howler';
import localforage from 'localforage';
import useDynamicRefs from 'use-dynamic-refs';
import styles from '../styles/Play.module.css';

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
            history.push(`${process.env.PUBLIC_URL}/`);
        })
    }, []);

    // Change pads size
    const onSizePadsChange = (e) => {
        console.log(e.target.value);
        document.documentElement.style.setProperty("--VirtualLaunchpad-padSize", `${e.target.value}px`)
    }

    return (
        <div>
            <h1>Play !</h1>
            <VirtualLaunchpad />
            <input type="range" onInput={onSizePadsChange} min="1" max="127" />
        </div>
    );
}

function VirtualLaunchpad () {
	const [getRef, setRef] =  useDynamicRefs();
	
	// Handle virtual clicks
	const handleClick = (note, color) => {
		console.log("VirtualLaunchpad: " + note + " has been played !");

		const element = getRef(note).current;
		const initialColor = "#e6e6ee";
		
		// Light the DOM !
		element.style.backgroundColor = color;
		setTimeout(() => element.style.backgroundColor = initialColor, 250)
	}
	
	// Generate the Virtual Launchpad to DOM
	var rows = [];
	for (var i = 8; i >= 1; i--) {
		let row = []
		for (var j = 1; j <= 8; j++){
			let note = i + '' + j;

			row.push(
				<div className={styles.padSquare}
					key={j}
					data-note={note}
					ref={setRef(note)}
					onClick={(e) => handleClick(e.currentTarget.dataset.note, "#fff")}
				></div>
			);
		}

		rows.push(
		 	<div className={styles.padRow} key={i}>
				{row}
			</div>
		);
	}
	
	return <div className={styles.padRowsContainer}>{rows}</div>;
}