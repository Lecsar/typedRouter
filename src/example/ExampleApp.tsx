import {BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import {PublicPages} from './pages/public';
import {PrivatePages} from './pages/private';
import {Route, getLink, getRoutePath} from './router';
import {QueryClient, QueryClientProvider} from 'react-query';

// Create a client
const queryClient = new QueryClient();

export const ExampleApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to={getLink('public')}>Public</Link>
            </li>
            <li>
              <Link to={getLink('private')}>Private</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path={getRoutePath('public')} exact>
            <PublicPages />
          </Route>

          <Route path={getRoutePath('private')}>
            <PrivatePages />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};
