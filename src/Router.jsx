import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Play from './pages/Play';

export default function Router () {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/play" component={Play} />
        <Route path="/*" render={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  )
}