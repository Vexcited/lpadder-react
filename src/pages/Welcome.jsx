import { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import localforage from "localforage";
import Forage from "react-localforage";
import JSZip from "jszip";
import "../styles/Welcome.scss";

<<<<<<< HEAD
//import pagesStyles from "../styles/Welcome.style";
=======
// Style
import pagesStyles from "../styles/Welcome.style";
>>>>>>> refs/remotes/origin/main

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { InsertDriveFile, OpenInNew, Add } from "@material-ui/icons";

// images
// import launchpadImage from "../images/launchpad.png"

export default function Welcome() {
  const history = useHistory();

  const importFileInput = useRef(null);

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
<<<<<<< HEAD
      zip
        .file("cover.json")
        .async("string")
        .then((data) => {
          // Store the content of cover.json to localforage
          data = JSON.parse(data);
          localforage.setItem("project", data).then(() => {
            // Reset `samples` in localforage to store new files
            localforage.setItem("samples", []).then(() => {
              // Grab every files of /samples/ folder and add the content to localforage
              zip.folder("samples").forEach((_, sampleFile) => {
                sampleFile.async("arraybuffer").then((sampleData) => {
                  // Take the current samples and push the new sample
                  localforage.getItem("samples").then((samples) => {
                    samples.push({
                      fileName: sampleFile.name,
                      data: sampleData,
                    });

                    // Update the "samples" item
                    localforage.setItem("samples", samples).then(() => {
                      console.log(
                        `[localforage][samples] Added sample content "${sampleFile.name}"`,
                      );
                    }); // set the file in localforage
                  }); // get current samples localforage
                }); // sample data
              }); // foreach samples

              // Reset file input for new imports...
              e.target.value = null;

              // Redirect to /play
              history.push("/play");
              console.log(
                "[Welcome][openFileHandler] Done ! Redirected to /play",
              );
            }); // reset samples localforage
          }); // store cover.json localforage
        }); // cover.json load
=======
      zip.file("cover.json").async("string")
      .then((data) => {

        // Store the content of cover.json to localforage
        data = JSON.parse(data)
        localforage.setItem("project", data)
        .then(() => {

          // Reset `samples` in localforage to store new files
          localforage.setItem("samples", {})
          .then(() => {

            // Grab every files of /samples/ folder and add the content to localforage
            zip.folder("samples").forEach((_, sampleFile) => {
              sampleFile
              .async("arraybuffer")
              .then((sampleData) => {

                // Take the current samples and push the new sample
                localforage.getItem("samples")
                .then(samples => {
                  samples[sampleFile.name.replace("samples/", "")] = sampleData

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
>>>>>>> refs/remotes/origin/main
    }); // ZIP load
  }; // Function end

  const [warningNewProjectModal, setWarningNewProjectModal] = useState(false);
  const startNewProject = () => {
    if (isAlreadyOpened) {
      setWarningNewProjectModal(true);
    } else {
      projectEraseAndCreate();
    }
  };

  const projectEraseAndCreate = () => {
    const emptyProject = {
      metas: {
        title: "Untitled",
        songAuthor: "Nobody",
        coverAuthor: "Someone",
      },
      samples: [],
      lights: [],
    };

<<<<<<< HEAD
    localforage.setItem("project", emptyProject).then(() => {
      localforage.setItem("samples", []).then(() => {
=======
    localforage.setItem("project", emptyProject)
    .then(() => {
      localforage.setItem("samples", {})
      .then(() => {
>>>>>>> refs/remotes/origin/main
        history.push("/play");
        console.log(
          "[Welcome][startNewProject] localforage has been cleared ! Redirected to /play",
        );
      });
    });
  };

  var project;

  localforage.getItem("project").then((data) => {
    project = data;
  });

  return (
    <div className="mainContainer">
      <div className="leftSide">
        <h1 className="title">
          Welcome to <br /> lpadder !
        </h1>
        <p className="subText">
          Play Launchpad covers from your browser !{" "}
          <Link to="/about" className="link">
            About this project...
          </Link>
        </p>
      </div>
      <div className="rightSide">
        <Button
          variant="contained"
          className="newProjectButton"
          onClick={() => startNewProject()}
        >
          New Project
          <Add className="rightIconButton" />
        </Button>

        <input
          ref={importFileInput}
          type="file"
          accept=".zip"
          onChange={openFileHandler}
          style={{ display: "none" }}
        />

        <Button
          variant="outlined"
          className="importProjectButton"
          component="span"
          onClick={() => importFileInput.current.click()}
        >
          Import Project
          <InsertDriveFile className="rightIconButton" />
        </Button>

        {isAlreadyOpened && (
          <div className="opened">
            <hr />
            <p className="openedText">
              <span className="musicName">test</span>{" "}
              <span className="authorName">by petit biscuit</span>
            </p>
            <Button
              variant="contained"
              className="alreadyOpenedProjectButton"
              onClick={() => history.push("/play")}
            >
              Resume it
              <OpenInNew className="rightIconButton" />
            </Button>
          </div>
        )}

        <Dialog
          open={warningNewProjectModal}
          onClose={() => setWarningNewProjectModal(false)}
        >
          <DialogTitle>{"Start a new project ?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              The currently open project will be erased if you start a new
              project, and there's no way back !
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setWarningNewProjectModal(false)} autoFocus>
              No !
            </Button>
            <Button onClick={() => projectEraseAndCreate()}>
              Yep, start a new one
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
