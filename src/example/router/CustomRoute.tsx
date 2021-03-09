import {ReactNode} from 'react';
import {Route as BaseRoute, RouteProps} from 'react-router-dom';
import {PrivateRoute} from './PrivateRoute';
import {getRouteConfigByPath} from './routerConfig';

/**
 * "path" нельзя заменить на дженерик или ключ из полученного конфига, т.к. Switch из react-router-dom использует этот проп,
 * чтобы мапить url из адресной строки на "path" роута. Есть 2 решения:
 * 1) использовать проп "path" только в связке с функцией "getRoutePath"
 * 2) Форкать код компонента Switch и кастомизировать его поведение (по сути "getRoutePath") будет у него под копотом
 */
interface IProps extends RouteProps {
  path: string;
  children?: ReactNode;
}

export const Route = ({path, children, ...props}: IProps) => {
  const {isPrivate} = getRouteConfigByPath(path);

  return isPrivate ? <PrivateRoute {...props}>{children}</PrivateRoute> : <BaseRoute {...props}>{children}</BaseRoute>;
};
