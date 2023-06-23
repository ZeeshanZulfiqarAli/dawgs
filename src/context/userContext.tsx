import { createContext, useContext, useReducer } from 'react';

const CoreContext = createContext<any>(null);

const CoreDispatchContext = createContext<any>(null);

export function CoreProvider({ children }) {
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

function coreReducer(coreStore, action) {
  switch (action.type) {
    case 'TEST': {
      return {
        ...action.payload,
        isLoggedIn: true,
        inProgress: false,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialStore = { isLoggedIn: false, inProgress: true };
