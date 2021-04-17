import styles from "../styles/VirtualLaunchpad.style.js";

import useDynamicRefs from 'use-dynamic-refs';
import launchpad from "launchpad-midi-converter";

export default function VirtualLaunchpad ({ launchpadKey }) {
	const [getRef, setRef] = useDynamicRefs();

    /**
     * Play the sample from Howler
     */
    const playSample = ({ note, launchpad }) => {
        
    }

    const playLight = ({ note, launchpad }) => {
        // TODO: check user settings
        // if show played button is true then
        const initialColor = "#e6e6e6"
        
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
				<div style={styles.square}
					key={pad}
					data-note={pad}
                    data-launchpad={launchpadKey}
					ref={setRef(`${launchpadKey}.${pad}`)}
					onClick={handleClick}
				></div>
			);
        })

        dom.push(
            <div style={styles.row} key={key}>
               {row}
           </div>
        )
    })
	
	return <div style={styles.launchpad}>{dom}</div>;
}