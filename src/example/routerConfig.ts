import {createTypedRouterConfig} from '../helpers';

const routerConfig = {
  simple: {
    path: '/simpleRoute',
    children: {
      super: {
        path: '/kek',
      },
    },
  },
  profile: {
    path: '/user/:id/post/:postId',
  },
} as const;

export const {getLink, getRoutePath, getRouteConfigByPath} = createTypedRouterConfig(routerConfig);
