export interface CartProps {
  onCloseCart: () => void;
}

export interface CartItemModel {
  name: string;
  amount: number;
  price: number;
  id: string;
}

export interface ICartItemProps {
  name: string;
  price: number;
  amount: number;
  onAdd: () => void;
  onRemove: () => void;
}
