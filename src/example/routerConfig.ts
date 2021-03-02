import {createTypedRouterConfig} from '../helpers';

const routerConfig = {
  simple: {
    path: '/simpleRoute',
    children: {
      super: {
        path: '/kek',
        children: {
          littleDinamicRoute: {
            path: '/dinamic/:dinamicId',
          },
        },
      },
    },
  },
  profile: {
    path: '/user/:id/post/:postId',
  },
} as const;

type TAdditionalRouteProps = {
  isPrivate?: boolean;
};

export const {getLink, getRoutePath, getRouteConfigByPath} = createTypedRouterConfig<
  typeof routerConfig,
  TAdditionalRouteProps
>(routerConfig, {isPrivate: true});
