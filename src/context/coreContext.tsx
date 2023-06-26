import { ReactNode, createContext, useContext, useReducer } from 'react';
import { ICoreStore } from '../types/context';

const initialStore: ICoreStore = {
  dogs: {
    data: [],
    fetchStatus: undefined,
    pagination: { page: 0, count: null },
    order: 'ASC',
  },
};

const CoreContext = createContext<ICoreStore>(initialStore);

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

function coreReducer(coreStore: ICoreStore, action: any) {
  switch (action.type) {
    case 'ADD_IMAGES': {
      return {
        ...coreStore,
        dogs: {
          ...coreStore.dogs,
          data: [...action.payload],
        },
      };
    }
    case 'UPDATE_IMAGE_FETCH_STATUS': {
      return {
        ...coreStore,
        dogs: {
          ...coreStore.dogs,
          fetchStatus: action.payload,
        },
      };
    }
    case 'ADD_IMAGE_PAGINATION': {
      return {
        ...coreStore,
        dogs: {
          ...coreStore.dogs,
          pagination: action.payload,
        },
      };
    }
    case 'INCREMENT_IMAGE_PAGE': {
      return {
        ...coreStore,
        dogs: {
          ...coreStore.dogs,
          pagination: {
            ...coreStore.dogs.pagination,
            page: coreStore.dogs.pagination.page + 1,
          },
        },
      };
    }
    case 'CHANGE_ORDER': {
      return {
        ...coreStore,
        dogs: {
          ...coreStore.dogs,
          data: [...initialStore.dogs.data],
          pagination: {
            ...initialStore.dogs.pagination,
          },
          order: action.payload,
        },
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
