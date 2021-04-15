import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Pages
import Welcome from './pages/Welcome';
import Play from './pages/Play';
import Editor from './pages/Editor';
import About from './pages/About';

// Base Style
import './index.css';

export default function Router () {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={Welcome}></Route>
        <Route exact path="/play" component={Play}></Route>
        <Route exact path="/editor" component={Editor}></Route>
        <Route exact path="/about" component={About}></Route>

        {/* 404 */}
        <Route path="/*" render={() => <Redirect to="/" />}></Route>
      </Switch>
    </BrowserRouter>
  );
}