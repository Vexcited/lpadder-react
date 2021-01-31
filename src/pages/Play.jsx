import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import localforage from 'localforage'; 
const JSZip = require("jszip");

export default function Play () {
    const [ samples, setSamples ] = useState({});
    const history = useHistory();

    useEffect (() => {
        localforage.getItem("project")
        .then (project => {
            let file = project.file;

            JSZip.loadAsync(file)
            .then (zip => {
                zip.file("cover.json").async("string")
                .then (_coverData => {
                    let coverData = JSON.parse(_coverData);
                    console.log(coverData);
                })
            })
        })
        .catch (e => {
            console.error(`No file opened ! Redirected to <Welcome />...\n[Logs]`, e);
            history.push("/");
        })
    });

    return (
        <div>
            <h1>Play !</h1>
        </div>
    );
}