import { ReactNode, createContext, useContext, useReducer } from 'react';
import { ICoreStore } from '../types/context';

const CoreContext = createContext<ICoreStore | null>(null);

const CoreDispatchContext = createContext<any>(null);

interface CoreProviderProps {
  children: ReactNode;
}

export function CoreProvider({ children }: CoreProviderProps) {
  const [core, dispatch] = useReducer(coreReducer, initialStore);

  return (
    <CoreContext.Provider value={core}>
      <CoreDispatchContext.Provider value={dispatch}>
        {children}
      </CoreDispatchContext.Provider>
    </CoreContext.Provider>
  );
}

export function useCore() {
  return useContext(CoreContext);
}

export function useCoreDispatch() {
  return useContext(CoreDispatchContext);
}

function coreReducer(coreStore: ICoreStore, action) {
  console.log(action);
  switch (action.type) {
    case 'APPEND_IMAGES': {
      return {
        ...coreStore,
        images: [...coreStore.images, ...action.payload],
      };
    }
    case 'REPLACE_IMAGES': {
      return {
        images: action.payload,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialStore: ICoreStore = { images: [] };
