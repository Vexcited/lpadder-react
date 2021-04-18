import { AppBar, Tabs, Tab } from "@material-ui/core";
import { useHistory } from "react-router-dom";

// Style
import useStyles from "../styles/Navbar.style";

export default function Navbar () {

  // Navigation
  const history = useHistory();
  const handleChange = (_, newValue) => {
    history.push(`/${newValue}`)
  }
  
  const classes = useStyles();
  return (
    <AppBar 
      position="static"
      className={classes.appBar}
    >
      <Tabs
        value={window.location.pathname.replace("/lpadder-react/", "")}
        onChange={handleChange}
        className={classes.tabs}
        centered
      >
        <Tab value="settings" label="Settings" />
        <Tab value="play" label="Player" />
        <Tab value="editor" label="Editor" />
      </Tabs>
    </AppBar>
  );
}
