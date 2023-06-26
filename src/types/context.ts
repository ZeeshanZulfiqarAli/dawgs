// interface action

import { FetchStatus } from '@tanstack/react-query';
import { IImage, Order } from './dogs';

export interface ICoreStore {
  dogs: {
    data: IImage[];
    fetchStatus?: FetchStatus;
    pagination: {
      page: number;
      count: number | null;
    };
    order: Order;
  };
}
