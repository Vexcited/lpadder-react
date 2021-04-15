import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import localforage from "localforage";
import JSZip from "jszip";
import styles from "../styles/main.module.css";

// images
import launchpadImage from "../images/launchpad.png"

export default function Welcome() {
  const history = useHistory();

  // Check if a project was already loaded locally...
  const [isAlreadyOpened, setAlreadyOpened] = useState(false);
  useEffect(() => {
    localforage
      .getItem("project")
      .then((data) => {
        if (data !== null) {
          setAlreadyOpened(true);
        } else {
          setAlreadyOpened(false);
        }
      })
      .catch(() => setAlreadyOpened(false));
  }, []);

  // When user open a new file
  const openFileHandler = (e) => {
    e.preventDefault();

    // Load the ZIP file
    JSZip.loadAsync(e.target.files[0]).then((zip) => {

      // Grab the /cover.json file and read it...
      zip.file("cover.json").async("string")
      .then((data) => {

        // Store the content of cover.json to localforage
        data = JSON.parse(data)
        localforage.setItem("project", data)
        .then(() => {

          // Reset `samples` in localforage to store new files
          localforage.setItem("samples", [])
          .then(() => {

            // Grab every files of /samples/ folder and add the content to localforage
            zip.folder("samples").forEach((_, sampleFile) => {
              sampleFile
              .async("arraybuffer")
              .then((sampleData) => {

                // Take the current samples and push the new sample
                localforage.getItem("samples")
                .then(samples => {
                  samples.push({
                    fileName: sampleFile.name,
                    data: sampleData,
                  });

                  // Update the "samples" item
                  localforage.setItem("samples", samples)
                  .then(() => {
                    console.log(`[localforage][samples] Added sample content "${sampleFile.name}"`);
                  }); // set the file in localforage
                }); // get current samples localforage
              }); // sample data
            }); // foreach samples

            // Reset file input for new imports...
            e.target.value = null;

            // Redirect to /play
            history.push("/play");
            console.log("[Welcome][openFileHandler] Done ! Redirected to /play");
          }); // reset samples localforage
        }); // store cover.json localforage
      }); // cover.json load
    }); // ZIP load
  }; // Function end

  const startNewProject = () => {
    const emptyProject = { metas: { songAuthor: "", coverAuthor: "", title: ""}, samples: {}, lights: {} };
    localforage.setItem("project", emptyProject)
    .then(() => {
      localforage.setItem("samples", [])
      .then(() => {
        history.push("/play");
        console.log("[Welcome][startNewProject] localforage has been cleared ! Redirected to /play");
      });
    });
  };

  const title = {
    fontFamily: "Arvo",
    fontSize: "5rem",
    margin: "5% 20%",
  };
  const main = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  };
  const left = {
    flex: "2",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
  const right = {
    height: "100vh",
    flex: "3",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "blue",
  };
  const subText = {
    fontFamily: "Roboto",
    margin: "5% 0",
  };
  const link = {
    color: "black",
  };

  return (
    <div style={main}>
      <div style={left}>
        <h1 style={title}>
          Welcome to <br /> lpadder !
        </h1>
        <p style={subText}>
          Play Launchpad covers from your browser !{" "}
          <Link to="/about" className={styles.link}>
            About this project...
          </Link>
        </p>
        {isAlreadyOpened && (
          <Link to="/play">Opened project detected ! Resume it</Link>
        )}

        <input type="file" accept=".zip" onChange={openFileHandler} />
        <button onClick={startNewProject}>Start something new</button>
      </div>
      <div style={right}>
        
        { /* Image height to fix: <img src={launchpadImage} alt="launchpad" /> */ }
      </div>
    </div>
  );
}

//todo: img path
