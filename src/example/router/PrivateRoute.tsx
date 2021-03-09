import {ReactNode} from 'react';
import {RouteProps, Route} from 'react-router';

interface IProps extends RouteProps {
  children?: ReactNode;
}

export const PrivateRoute = ({children, ...props}: IProps) => {
  return <Route {...props}>{children}</Route>;
};
