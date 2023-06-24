export interface IBreed {
  id: string;
}

export interface IImage {
  breeds: IBreed[];
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface IAction {
  type: string;
  payload: any;
}
