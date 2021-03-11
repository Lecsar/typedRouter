import {ReactNode} from 'react';
import {RouteProps, Route, Redirect, useLocation} from 'react-router';

import {createRedirectUrl} from 'example/helpers';
import {useStore} from 'example/store';

import {getLink} from './routerConfig';

interface IProps extends RouteProps {
  children?: ReactNode;
}

export const PrivateRoute = ({children, ...props}: IProps) => {
  const userName = useStore().userName;
  const {pathname, search} = useLocation();

  if (userName) {
    return <Route {...props}>{children}</Route>;
  }

  return <Redirect to={`${getLink('auth')}${createRedirectUrl(`${pathname}${search}`)}`} />;
};
