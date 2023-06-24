import { IBreed, IImage } from '../types/dogs';
import { instance } from './common';

const getBreeds = (q: string) => {
  return instance.get<Array<IBreed>>('breeds/search', { params: { q } });
};

export const getImages = async (q: string, page: number, limit: number) => {
  const breeds = (await getBreeds(q)).data;

  const breedIds = breeds.map((breed) => breed.id);

  return (
    await instance.get<Array<IImage>>('images/search', {
      params: { size: 'small', page, limit, breed_ids: breedIds.join(',') },
    })
  ).data;
};
