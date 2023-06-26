// interface action

import { FetchStatus } from '@tanstack/react-query';
import { IImage } from './dogs';

export interface ICoreStore {
  dogs: {
    data: IImage[];
    fetchStatus?: FetchStatus;
    pagination: {
      page: number;
      count: number | null;
    };
  };
}
