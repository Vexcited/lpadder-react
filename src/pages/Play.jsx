import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

// Project
import localforage from "localforage";

// Audio
import { Howl, Howler } from "howler";

// Components
import VirtualLaunchpad from "../components/VirtualLaunchpad";

export default function Play() {
  const history = useHistory();

  const [project, setProject] = useState({
    metas: { title: "", songAuthor: "", coverAuthor: "" },
  });
  const [numberVLaunchpad, setNumberVLaunchpad] = useState(0);

  const [howlSamples, setHowlSamples] = useState({});

	const startToStoreInHowler = (howlerValues) => {
		localforage.getItem("samples")
		.then(audios => {
			for (let audioFileName in howlerValues) {
				if (howlerValues.hasOwnProperty(audioFileName)) {
					let audioData = audios[audioFileName]
					
					let howlerInstance = new Howl({
						src: [audioData],
						sprite: howlerValues[audioFileName],
						onend: function() {
							console.log('Finished with', audioFileName);
						}
					})

					let toStore = {
						...howlSamples
					}
					toStore[audioFileName] = howlerInstance
					setHowlSamples(toStore)

					console.log("Stored", toStore)
				}
			}
		})
	}

  // Getting the samples
  useEffect(() => {
    localforage
      .getItem("project")
      .then((data) => {
        // Save the project in state
        setProject(data);

        // Retreive samples from state
        if (data.samples) {
          // Create the <VirtualLaunchpad />s
          setNumberVLaunchpad(data.samples.length);

          // Samples that will be passed in Howler
          let spritesForHowler = {};

          // For every Launchpads defined in project
          data.samples.forEach((thisLaunchpad_pages, launchpad_key) => {

						// For every defined page_name in thisLaunchpad_pages
            for (let page_name in thisLaunchpad_pages) {
              if (thisLaunchpad_pages.hasOwnProperty(page_name)) {

								for (let note_id in thisLaunchpad_pages[page_name]) {
									if (thisLaunchpad_pages[page_name].hasOwnProperty(note_id)) {
										let current_note_id = thisLaunchpad_pages[page_name][note_id]

										// Multi-sample (so an Array [])
										if (Array.isArray(current_note_id)) {
											// For every samples, ...
											current_note_id.forEach((sample, sample_key) => {
												// Number of the launchpad - Page Number - Note ID + Key of the sample in the array
												// Eg.: 0-Page 1 -11+0 (Launchpad 0 on Page {page_name}, on Note 11 with sample 0 of the array)
												let sampleID = `${launchpad_key}.${page_name}.${note_id}+${sample_key}`;
												let audioFileName = sample["audio"];
		
												// Sprite to be stored in Howler
												let spriteToStore = [
													sample["start"], // Start (in ms)
													sample["end"], // Duration
												];
		
												// Check if the audioFileName has been already defined in `spritesForHowler` or not.
												spritesForHowler[audioFileName] =
													spritesForHowler[audioFileName] || {};
		
												// Store the sample
												spritesForHowler[audioFileName][sampleID] = spriteToStore;
											});
										}
										// Only one sample (so basically an Object {})
										else {
											let sample = current_note_id;
		
											// Number of the launchpad - Page Number - Note ID
											let sampleID = `${launchpad_key}-${page_name}-${note_id}`;
											let audioFileName = sample["audio"];
		
											// Check if the audioFileName has been already defined in `spritesForHowler` or not.
											spritesForHowler[audioFileName] =
												spritesForHowler[audioFileName] || {};
		
											// Sprite to be stored in Howler
											let spriteToStore = [
												sample["start"], // Start (in ms)
												sample["end"], // Duration
											];
		
											// Store the sample
											spritesForHowler[audioFileName][sampleID] = spriteToStore;
										}

									}
								}
              }
            }
          });

					startToStoreInHowler(spritesForHowler)
        }
				else {
          console.error("Error in the JSON file: `(root).samples` is missing.");
        }
      })
      .catch((e) => {
        console.error(
          `Error happened ! Redirecting to <Welcome />...\n[Logs]`,
          e
        );
        history.push("/");
      });
  }, []);

  return (
    <div>
      <h1>{project.metas.title}</h1>

      {Array(numberVLaunchpad)
        .fill(0)
        .map((_, key) => (
          <VirtualLaunchpad key={key} launchpadKey={key} />
        ))}

      <Link to="/editor">Go to editor</Link>
    </div>
  );
}
