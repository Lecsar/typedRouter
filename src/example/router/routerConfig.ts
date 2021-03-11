import {createTypedRouterConfig} from '../../helpers';
import {privateRouterConfig} from '../pages/private/routerConfig';
import {publicRouterConfig} from '../pages/public';

const routerConfig = {
  auth: {
    path: '/auth',
  },
  ...publicRouterConfig,
  ...privateRouterConfig,
} as const;

type TAdditionalRouteProps = {
  isPrivate?: boolean;
};

export const {getLink, getRoutePath, getRouteConfigByPath} = createTypedRouterConfig<
  typeof routerConfig,
  TAdditionalRouteProps
>(routerConfig, {isPrivate: true});
