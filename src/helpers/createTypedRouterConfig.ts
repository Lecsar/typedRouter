import {generatePath} from 'react-router';

import {TGetAllPathNames, TFilterComplexPaths, KEY_CONFIG_SEPARATOR, IBaseRoute} from '../types/router';
import {UnionToIntersection} from '../types/service';

import {joinTwoPathsInRouter} from './joinTwoPathsInRouter';

export const createTypedRouterConfig = <
  Config extends Record<string, IBaseRoute>,
  AdditionalRouteProps extends Record<string, any>
>(
  config: Config,
  additionalRouteProps: Record<keyof AdditionalRouteProps, true>
) => {
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

  const additionalRoutePropKeys = Object.keys(additionalRouteProps) as Array<keyof typeof additionalRouteProps>;

  const getFlatRouterConfig = (
    config: Record<string, IBaseRoute>,
    keyAcc = '',
    pathAcc = '',
    result = {} as Record<TAllConfigKeysToRoute, {path: string} & AdditionalRouteProps>
  ) => {
    for (const key in config) {
      const currentConfig = config[key] as IBaseRoute & AdditionalRouteProps;
      const accumulatedPath = joinTwoPathsInRouter(pathAcc, currentConfig.path);
      const accumulatedConfigKey = `${keyAcc}${key}` as TAllConfigKeysToRoute;

      result[accumulatedConfigKey] = {} as {path: string} & AdditionalRouteProps;

      additionalRoutePropKeys.forEach((propKey) => {
        if (propKey === 'children') {
          throw new Error('Additional route properties can not have propery with name `children`');
        }

        result[accumulatedConfigKey][propKey] = currentConfig[propKey];
      });

      result[accumulatedConfigKey].path = accumulatedPath;

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

  /** Получить конфиг роута по пути */
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
