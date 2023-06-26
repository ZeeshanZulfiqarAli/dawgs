export interface IBreed {
  id: string;
  name: string;
  bred_for: string;
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  country_code: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  reference_image_id: string;
}

export interface IImage {
  breeds: IBreed[];
  id: string;
  url: string;
  width: number;
  height: number;
}

export type Order = 'ASC' | 'DESC' | 'RANDOM';

export interface IAction {
  type: string;
  payload: any;
}
