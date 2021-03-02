import {ExtractRouteParams} from 'react-router';
import {ExcludeKeysFromRecord, UnionToIntersection} from './service';

export interface IBaseRoute {
  path: string;
  children?: Record<string, IRoute>;
}

// в конфиге роута мб любые свойста
export interface IRoute extends IBaseRoute {
  //   для примера
  isPrivate?: boolean;
}

type HasChildren<T> = T extends Record<string, IRoute> ? true : false;
type CheckIsComplexPath<Path extends string> = keyof ExtractRouteParams<Path> extends never ? false : true;
type TDeleteBooleanValueFromConfig<T extends Record<string, number | string | boolean | undefined>> = {
  [key in keyof T]: number | string;
};

export const KEY_CONFIG_SEPARATOR = '.';

type TSeparator = typeof KEY_CONFIG_SEPARATOR;

// получить название полного пути до каждого роута с сохранением адреса до него
export type TGetAllPathNames<
  Config extends {[x: string]: IRoute},
  KeyAcc extends string = '',
  PathAcc extends string = ''
> = {
  [key in keyof Config]: key extends string
    ? HasChildren<Config[key]['children']> extends true
      ? {[k in `${KeyAcc}${key}`]: `${Config[key]['path']}${PathAcc}`} &
          TGetAllPathNames<
            NonNullable<Config[key]['children']>,
            `${KeyAcc}${key}${TSeparator}`,
            `${PathAcc}${Config[key]['path']}`
          >
      : {[k in `${KeyAcc}${key}`]: `${Config[key]['path']}${PathAcc}`}
    : never;
}[keyof Config];

// отфильтровать конфиг только с динамическими путями
export type TFilterComplexPaths<Config extends Record<string, string>> = ExcludeKeysFromRecord<
  {
    [key in keyof Config]: CheckIsComplexPath<Config[key]> extends true
      ? (config: TDeleteBooleanValueFromConfig<ExtractRouteParams<Config[key]>>) => string
      : never;
  },
  never
>;
