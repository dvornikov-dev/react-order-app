import { CartItemModel } from "../components/Cart/types";

export interface IRootState {
  items: CartItemModel[];
  totalAmount: number;
}
