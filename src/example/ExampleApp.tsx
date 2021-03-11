import {BrowserRouter as Router, Route as BaseRoute, Switch, Link} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';

import {Route, getLink, getRoutePath} from './router';
import {StoreProvider} from './store';

import {PublicPages} from './pages/public';
import {PrivatePages} from './pages/private';
import {NotFoundPage} from './pages/NotFoundPage';
import {AuthorizationPage} from './pages/AuthorizationPage';

const queryClient = new QueryClient();

export const ExampleApp = () => {
  return (
    <StoreProvider>
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

            <Route path={getRoutePath('auth')} component={AuthorizationPage} />

            <BaseRoute component={NotFoundPage} />
          </Switch>
        </Router>
      </QueryClientProvider>
    </StoreProvider>
  );
};
