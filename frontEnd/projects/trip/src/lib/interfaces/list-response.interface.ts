export interface ListResponseInterface {
  count?: number;
  next?: string;
  previous?: string;
  results?: Trip[];
}

export interface Trip {
  id?: number;
  title?: string;
  description?: string;
  budget?: number;
  budget_left?: number;
  created?: Date | number | string;
  owner?: any;
  travelers?: any[];
}
