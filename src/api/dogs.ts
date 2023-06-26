import { IBreed, IImage, Order } from '../types/dogs';
import { instance } from './common';

interface ICache {
  [key: string]: string;
}

const cache: ICache = {};

const getBreeds = (q: string) => {
  return instance.get<Array<IBreed>>('breeds/search', { params: { q } });
};

export const getImages = async (
  q: string,
  page: number,
  limit: number,
  order: Order = 'ASC',
) => {
  let breedIdsStr;

  // Check if we've alrady fetched and process breeds for a query
  // We are caching it as its highly unlikely that it would change on server side.
  // Beneficial in pagination
  if (cache[q]) {
    breedIdsStr = cache[q];
  } else {
    const breeds = (await getBreeds(q)).data;

    const breedIds = breeds.map((breed) => breed.id);

    breedIdsStr = breedIds.join(',');
  }

  const res = await instance.get<Array<IImage>>('images/search', {
    params: { size: 'med', page, limit, order, breed_ids: breedIdsStr },
  });

  return {
    imageData: res.data,
    paginationCount: parseInt(res.headers['pagination-count']),
    paginationPage: parseInt(res.headers['pagination-page']),
  };
};
