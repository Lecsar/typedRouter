import {createContext, useContext, useState, ReactNode} from 'react';

export interface IAppData {
  userName?: string;
  setUserName: (userName?: string) => void;
}

export const StoreContext = createContext<IAppData>({
  userName: undefined,
  setUserName: () => {},
});

export function useStore(): IAppData;
export function useStore<T extends unknown>(selector: (data: IAppData) => T): T;

export function useStore<T extends unknown>(selector?: (data: IAppData) => T) {
  const storeData = useContext(StoreContext);
  return selector ? selector(storeData) : storeData;
}

export const StoreProvider = ({children}: {children: ReactNode}) => {
  const [userName, setUserName] = useState<string | undefined>('');

  return <StoreContext.Provider value={{userName, setUserName}}>{children}</StoreContext.Provider>;
};
