import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

export default function Navbar() {
  const classes = {
    title: "test",
    menuButton: "test",
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          lpadder
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
