import { Link } from "react-router-dom";

export default function About () {
    return (
        <div>
            <h1>lpadder.</h1>
            <p>
                Why it's so ugly ? Because this project is still beta !
                I'm just trying to play something, make everything works, then
                work on the design... Do you see ?
            </p>

            <Link to="/">Go back</Link>
        </div>
    );
}