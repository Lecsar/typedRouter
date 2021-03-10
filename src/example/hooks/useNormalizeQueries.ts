import {useQueries, UseQueryResult} from 'react-query';

interface IParams<Data> {
  queryKey: string;
  getUrl: (id: string) => string;
  ids: string[];
  propIdName: keyof Data;
}

export const useNormalizeQueries = <Data extends any, Error = unknown>({
  queryKey,
  getUrl,
  ids,
  propIdName,
}: IParams<Data>) => {
  const queries = useQueries(
    ids.map((id) => ({
      queryKey: [queryKey, id],
      queryFn: async () => {
        const response = await fetch(getUrl(id));
        const entities: Data[] = await response.json();
        return entities;
      },
    }))
  ) as UseQueryResult<Data, Error>[];

  const entitiesDictionary = ids.reduce((acc, id) => {
    acc[id] = queries.find(({data}) => data && String(data[propIdName]) === String(id))?.data;
    return acc;
  }, {} as Record<string, Data | undefined>);

  return entitiesDictionary;
};
