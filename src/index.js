import React from 'react';
import ReactDOM from 'react-dom';

// PWA
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

// Router
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Pages
// - Landing and stuff
import Welcome from './pages/Welcome';
import About from './pages/About';
// - App
import Play from './pages/Play';
import Editor from './pages/Editor';
import Settings from './pages/Settings';
// -- Components
import Navbar from './components/Navbar';

function Router () {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={Welcome}></Route>
        <Route exact path="/about" component={About}></Route>

        {/* App */}
        <Route exact path="/play"><Navbar /><Play /></Route>
        <Route exact path="/editor"><Navbar /><Editor /></Route>
        <Route exact path="/settings"><Navbar /><Settings /></Route>

        {/* 404 */}
        <Route path="/*" render={() => <Redirect to="/" />}></Route>
      </Switch>
    </BrowserRouter>
  );
}

// Rendering (w/StrictMode)
ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

// Service Workers
serviceWorkerRegistration.register();

// Analytics
reportWebVitals();
