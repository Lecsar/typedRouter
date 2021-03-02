import {generatePath} from 'react-router';

import {TGetAllPathNames, IRoute, TFilterComplexPaths, KEY_CONFIG_SEPARATOR, IBaseRoute} from '../types/router';
import {UnionToIntersection} from '../types/service';

import {joinTwoPathsInRouter} from './joinTwoPathsInRouter';

export const createTypedRouterConfig = <Config extends Record<string, IBaseRoute>>(config: Config) => {
  // конфиг видa: {"path.to.route": accumulated/path}
  type TFlatRouterConfig = UnionToIntersection<TGetAllPathNames<Config>>;
  // конфиг для генерации динамических роутов
  // @ts-expect-error
  type TDynamicPathsRouterConfigRecord = TFilterComplexPaths<TFlatRouterConfig>;

  // названия всех путей в конфиге
  type TAllConfigKeysToRoute = keyof TFlatRouterConfig;
  // названия путей с параметрами в конфиге
  type TComplexConfigPathsToRoute = keyof TDynamicPathsRouterConfigRecord;
  // названия путей без параметров
  type TSimpleConfigPathsToRoute = Exclude<TAllConfigKeysToRoute, TComplexConfigPathsToRoute>;

  const getFlatRouterConfig = (
    config: Record<string, IRoute>,
    keyAcc = '',
    pathAcc = '',
    result = {} as Record<TAllConfigKeysToRoute, {path: string; isPrivate?: boolean}>
  ) => {
    for (const key in config) {
      const currentConfig = config[key];
      const accumulatedPath = joinTwoPathsInRouter(pathAcc, currentConfig.path);
      const accumulatedConfigKey = `${keyAcc}${key}` as TAllConfigKeysToRoute;

      result[accumulatedConfigKey] = {
        path: accumulatedPath,
        isPrivate: currentConfig.isPrivate,
      };

      if (currentConfig.children) {
        getFlatRouterConfig(
          currentConfig.children,
          `${accumulatedConfigKey}${KEY_CONFIG_SEPARATOR}`,
          accumulatedPath,
          result
        );
      }
    }

    return result;
  };

  const flatRouterConfig = getFlatRouterConfig(config);

  /** Получить полный путь до роута по ключу */
  const getRoutePath = (configKey: TAllConfigKeysToRoute) => flatRouterConfig[configKey].path;

  const getRouteConfigByPath = (accumulatedPath: string) => {
    for (const key in flatRouterConfig) {
      const routeConfig = flatRouterConfig[key as TAllConfigKeysToRoute];

      if (routeConfig.path === accumulatedPath) {
        return routeConfig;
      }
    }

    throw new Error('Do not use function `getRouteConfigByPath` without function `getRoutePath`');
  };

  /** Функция для формирование простых (без параметров) ссылок по конфигу роутера  */
  function getLink<Key extends TSimpleConfigPathsToRoute>(configPath: Key): string;

  /**
   * Функция для формирование сложных ссылок по конфигу роутера
   * (в ссылке присутствуют динамические параметры, передаваемые вторым аргуметом)
   */
  function getLink<Key extends keyof TDynamicPathsRouterConfigRecord>(
    configPath: Key,
    params: Parameters<TDynamicPathsRouterConfigRecord[Key]>[0]
  ): string;

  /** Функция для формирование ссылок по конфигу роутера  */
  function getLink(configPath: any, params?: any) {
    const path = getRoutePath(configPath);
    return params ? generatePath(path, params) : path;
  }

  return {getRoutePath, getLink, getRouteConfigByPath};
};
