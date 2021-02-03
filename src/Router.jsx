import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Play from './pages/Play';
import './index.css';

export default function Router () {
  return (
    <BrowserRouter basename="/lpadder-react">
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Welcome} />
        <Route path={`${process.env.PUBLIC_URL}/play`} component={Play} />
        <Route path={`${process.env.PUBLIC_URL}/*`} render={() => <Redirect to={`${process.env.PUBLIC_URL}/`} />} />
      </Switch>
    </BrowserRouter>
  )
}