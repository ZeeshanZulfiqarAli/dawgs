import { IBreed, IImage, Order } from '../types/dogs';
import { instance } from './common';

const getBreeds = (q: string) => {
  return instance.get<Array<IBreed>>('breeds/search', { params: { q } });
};

export const getImages = async (
  q: string,
  page: number,
  limit: number,
  order: Order = 'ASC',
) => {
  const breeds = (await getBreeds(q)).data;

  const breedIds = breeds.map((breed) => breed.id);

  const res = await instance.get<Array<IImage>>('images/search', {
    params: { size: 'med', page, limit, order, breed_ids: breedIds.join(',') },
  });

  return {
    imageData: res.data,
    paginationCount: parseInt(res.headers['pagination-count']),
    paginationPage: parseInt(res.headers['pagination-page']),
  };
};
