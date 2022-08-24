import { createContext, createRef, FC, ReactNode, useContext, useRef } from 'react';

export const GlobalContext = createContext({
  mintRef: createRef<Element>(),
});

const StateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const mintRef = useRef<HTMLElement>(null);
  return <GlobalContext.Provider value={{ mintRef }}>{children}</GlobalContext.Provider>;
};

export const useGlobalState = () => useContext(GlobalContext);

export default StateProvider;
