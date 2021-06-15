export interface ListResponseInterface<T> {
  count?: number;
  next?: string;
  previous?: string;
  results?: T[];
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
