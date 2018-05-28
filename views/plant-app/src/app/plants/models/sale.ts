import { Unit } from './unit';

export interface Sale {
  _id: string;
  isQuantity: boolean;
  weight?: number;
  unit?: Unit;
  quantity?: any;
  cost: number;
  plantNumber: number;
}
